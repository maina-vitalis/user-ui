# Authentication System Review

## Architecture Overview

```
RootLayout
  └── RefreshToken (wrapper component — runs on every page load)
        └── App
Auth flow:
  SignupForm → register() → OTP page → verifyOtp() → sign-in page
  LoginForm  → login()   → stores accessToken in Zustand (persisted)
  api.ts     → attaches accessToken as Bearer on every request
```

---

## 🐛 Bug #1 — CRITICAL: `accessToken` persisted to `localStorage` (Security Vulnerability)

**File:** [src/lib/store/useAuthStore.ts](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/lib/store/useAuthStore.ts), line 22

**The Problem:**
```typescript
partialize: (state) => ({ accessToken: state.accessToken }),
```
The access token is stored in `localStorage` via Zustand `persist`. Access tokens should **never** be persisted to `localStorage` because:
- They are vulnerable to **XSS attacks** — any injected script can steal `localStorage`.
- Access tokens are designed to be **short-lived and in-memory only**.
- The refresh token (httpOnly cookie) is the correct long-term credential — it handles re-authentication.

**The Fix:**
Remove `accessToken` from the persisted state entirely. The [RefreshToken](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/refresh-token.tsx#7-39) component already calls the refresh endpoint on every page load to re-hydrate it.

```typescript
// useAuthStore.ts
partialize: (state) => ({}),  // persist nothing
// OR just remove the partialize key to persist nothing meaningful
```
Or more carefully, don't persist access token at all — the whole point of the refresh token cookie is that it silently restores the session.

```typescript
persist(
  (set) => ({
    accessToken: null,
    isInitialized: false,
    setAccessToken: (token) => set({ accessToken: token }),
    setIsInitialized: (value) => set({ isInitialized: value }),
  }),
  {
    name: 'auth-storage',
    partialize: () => ({}), // ← persist nothing sensitive
  }
),
```

---

## 🐛 Bug #2 — CRITICAL: [RefreshToken](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/refresh-token.tsx#7-39) component has an infinite re-render risk

**File:** [src/features/auth/components/refresh-token.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/refresh-token.tsx), lines 12 and 35

**The Problem:**
```typescript
const { accessToken, setIsInitialized, setAccessToken } = useAuthStore();

useEffect(() => {
  // ...
}, [accessToken, setIsInitialized, setAccessToken]); // ← accessToken in deps!
```

The `useEffect` dependency array includes `accessToken`. Here's the cascade:
1. App loads → `accessToken` is null (or persisted value from store).
2. `useEffect` runs → calls [refreshToken()](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/api/auth-api.ts#36-41) → [setAccessToken(newToken)](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/lib/store/useAuthStore.ts#17-18).
3. `accessToken` **changes** in the store → the component re-renders.
4. `useEffect` re-runs because `accessToken` changed. The `hasRun` ref stops the infinite loop, BUT...
5. Problem: the `hasRun` ref correctly prevents the duplicate call, but `accessToken` should **not** be a dependency here at all. The intent is to run once on mount.

Furthermore: if you fix Bug #1 (stop persisting the token), then `accessToken` will always be `null` on mount. The current logic is:
```typescript
if (accessToken) {      // ← this will always be false if token not persisted
  await refreshToken(); // ← so this never runs after fixing Bug #1!
}
```
The refresh call is **guarded by the presence of a persisted token**, which is circular — if you stop persisting the token (correct fix for Bug #1), then [RefreshToken](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/refresh-token.tsx#7-39) never actually refreshes.

**The Fix:**
Always attempt a refresh on mount, regardless of `accessToken` state. The httpOnly cookie carries the refresh token — the server will validate it. Remove `accessToken` from the dependency array and clean up the logic:

```typescript
export default function RefreshToken({ children }: { readonly children: React.ReactNode }) {
  const { setIsInitialized, setAccessToken } = useAuthStore(); // ← don't read accessToken here
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const restoreToken = async () => {
      try {
        await refreshToken(); // always attempt — server checks the httpOnly cookie
      } catch {
        // No valid cookie → user is not logged in. That's fine.
        setAccessToken(null);
      } finally {
        setIsInitialized(true); // always mark initialized regardless of outcome
      }
    };

    restoreToken();
  }, []); // ← empty deps: run exactly once on mount

  return <>{children}</>;
}
```

> [!IMPORTANT]
> This requires removing the `if (accessToken)` guard. The refresh endpoint should return 401 gracefully when there's no valid cookie — which your error interceptor already handles.

---

## 🐛 Bug #3 — MEDIUM: No `401` auto-retry in the Axios response interceptor

**File:** [src/lib/api.ts](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/lib/api.ts), lines 25–45

**The Problem:**
Your response interceptor catches errors and enhances them, but it **never attempts a token refresh** when a `401 Unauthorized` response is received. This means:
- If the access token expires mid-session, every subsequent API call silently fails.
- The user stays on the page with broken state (data fails to load) instead of being re-authenticated.

**The Fix:**
Add a `401` retry strategy in the response interceptor:

```typescript
import { useAuthStore } from './store/useAuthStore';
import axios, { AxiosError } from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor with 401 auto-refresh
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: unknown) => void; reject: (reason?: unknown) => void }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post('/api/auth/refresh-token');
        const newToken = (response.data as any).accessToken;
        useAuthStore.getState().setAccessToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        useAuthStore.getState().setAccessToken(null);
        // Optionally redirect to login:
        // window.location.href = '/auth/sign-in';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For non-401 errors: enhance and reject
    const apiMessage =
      (error.response?.data as any)?.message || error.message || 'Request failed';
    const enhancedError = new Error(apiMessage);
    (enhancedError as any).status = error.response?.status;
    (enhancedError as any).data = error.response?.data;
    (enhancedError as any).isAxiosError = true;
    return Promise.reject(enhancedError);
  }
);
```

---

## 🐛 Bug #4 — MEDIUM: [login](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/api/auth-api.ts#17-24) and [refreshToken](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/api/auth-api.ts#36-41) import `useAuthStore` at module level

**File:** [src/features/auth/api/auth-api.ts](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/api/auth-api.ts), lines 4, 20, 38

**The Problem:**
```typescript
import { useAuthStore } from "@/lib/store/useAuthStore";

export const login = async (loginData) => {
  const response = await api.post("/api/auth/login", loginData);
  useAuthStore.getState().setAccessToken(response.accessToken); // ← store mutation in API layer
  return response;
};
```
Auth API functions are mutations — they update global state as a **side effect**. This makes the API layer tightly coupled to the store, which:
- Makes testing these functions impossible without mocking the store.
- Is confusing: a caller calls [login()](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/api/auth-api.ts#17-24) expecting a response, not a silent store mutation.

**The Fix:**
Return the token from the API functions and let the **caller** (the mutation's [onSuccess](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/signup-form.tsx#76-86)) update the store:

```typescript
// auth-api.ts — clean, no store import
export const login = async (loginData: LoginFormValues): Promise<AuthResponse> => {
  return api.post<AuthResponse>("/api/auth/login", loginData);
};

export const refreshToken = async (): Promise<AuthResponse> => {
  return api.post<AuthResponse>("/api/auth/refresh-token");
};
```

Then in [login-form.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/login-form.tsx):
```typescript
import { useAuthStore } from "@/lib/store/useAuthStore";

const { setAccessToken } = useAuthStore();

const mutation = useMutation({
  mutationFn: login,
  onSuccess: (data) => {
    setAccessToken(data.accessToken); // ← caller updates state
    toast.success("Login successful");
    router.push("/");
  },
});
```

And in [refresh-token.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/refresh-token.tsx):
```typescript
const restoreToken = async () => {
  try {
    const data = await refreshToken();
    setAccessToken(data.accessToken); // ← caller updates state
  } catch {
    setAccessToken(null);
  } finally {
    setIsInitialized(true);
  }
};
```

---

## 🐛 Bug #5 — MEDIUM: App renders before auth is initialized (missing guard)

**File:** [src/app/layout.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/app/layout.tsx)

**The Problem:**
[RefreshToken](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/refresh-token.tsx#7-39) sets `isInitialized = true` after the token refresh attempt completes. But the app renders `children` **immediately** before initialization is done, meaning:
- Protected pages flash as unauthenticated before the token arrives.
- Components that depend on `accessToken` see `null` on first render.

**The Fix:**
Gate rendering behind `isInitialized`:

```typescript
// refresh-token.tsx
export default function RefreshToken({ children }: { readonly children: React.ReactNode }) {
  const { isInitialized, setIsInitialized, setAccessToken } = useAuthStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const restoreToken = async () => {
      try {
        const data = await refreshToken();
        setAccessToken(data.accessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setIsInitialized(true);
      }
    };
    restoreToken();
  }, []);

  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">
      {/* A spinner or skeleton */}
    </div>;
  }

  return <>{children}</>;
}
```

---

## 🐛 Bug #6 — LOW: OTP [handleResendOtp](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/otp-verification-form.tsx#88-95) doesn't call the API

**File:** [src/features/auth/components/otp-verification-form.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/otp-verification-form.tsx), lines 88–94

**The Problem:**
```typescript
const handleResendOtp = () => {
  setTimeLeft(OTP_EXPIRY_TIME);
  setCanResend(false);
  toast.success("OTP Resent", {
    description: "A new OTP has been sent to your email.",
  });
};
```
The resend button just resets the timer and shows a success toast, but **never actually calls any API endpoint** to resend the OTP. The user sees a success message but receives no new OTP email.

**The Fix:**
Add a resend OTP API call:

```typescript
// In auth-api.ts
export const resendOtp = async (email: string) => {
  return api.post("/api/auth/resend-otp", { email });
};

// In otp-verification-form.tsx
const resendMutation = useMutation({
  mutationFn: () => resendOtp(email),
  onSuccess: () => {
    setTimeLeft(OTP_EXPIRY_TIME);
    setCanResend(false);
    toast.success("OTP Resent", { description: "A new OTP has been sent to your email." });
  },
  onError: (error: any) => {
    toast.error("Failed to resend OTP", { description: error.message });
  },
});

const handleResendOtp = () => {
  resendMutation.mutate();
};
```

---

## 🐛 Bug #7 — LOW: After OTP verification, redirect is to `/` instead of `/auth/sign-in`

**File:** [src/features/auth/components/otp-verification-form.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/otp-verification-form.tsx), line 58

**The Problem:**
```typescript
onSuccess: () => {
  toast.success("Email verified successfully!");
  setTimeout(() => {
    router.push("/");  // ← lands on home page, user still not logged in
  }, 1500);
},
```
After email verification the user is sent to the home page — but they haven't logged in yet. Their access token is null. They will see the unauthenticated version of the app and need to manually navigate to sign-in.

**The Fix:**
```typescript
router.push("/auth/sign-in"); // ← correct landing after verification
```

---

## Summary Table

| # | Severity | File | Issue | Fix |
|---|----------|------|-------|-----|
| 1 | 🔴 Critical | [useAuthStore.ts](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/lib/store/useAuthStore.ts) | Access token persisted to localStorage (XSS risk) | Stop persisting it |
| 2 | 🔴 Critical | [refresh-token.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/refresh-token.tsx) | Refresh only runs if token exists in store; wrong deps | Always run refresh on mount, remove `accessToken` dep |
| 3 | 🟠 Medium | [api.ts](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/lib/api.ts) | No 401 auto-retry / silent session re-establishment | Add 401 interceptor with refresh queue |
| 4 | 🟠 Medium | [auth-api.ts](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/api/auth-api.ts) | API layer mutates global store (tight coupling) | Return data; let callers update store |
| 5 | 🟠 Medium | [refresh-token.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/refresh-token.tsx) | App renders before auth is initialized | Gate `children` behind `isInitialized` |
| 6 | 🟡 Low | [otp-verification-form.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/otp-verification-form.tsx) | Resend OTP doesn't call any API | Add `resendOtp` API call |
| 7 | 🟡 Low | [otp-verification-form.tsx](file:///c:/Users/vitalis/Documents/projs/shop/user-ui/src/features/auth/components/otp-verification-form.tsx) | After OTP, redirects to `/` (user not logged in) | Redirect to `/auth/sign-in` |
