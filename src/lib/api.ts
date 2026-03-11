import { useAuthStore } from "./store/useAuthStore";
import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// request interceptor- setting the bearer token
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//Response interceptor - Refreshing the tokens
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processingQueue = (token: string | null, error?: null | Error) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token);
    }
  });
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        //queue the request when the refreshing is still in progress
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject }),
        ).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      const response = await apiClient.post("/api/auth/refresh-token");
      const accessToken = await response.data.access_token;
      useAuthStore.getState().setAccessToken(accessToken);
      processingQueue(accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (error) {
      processingQueue(null, error as Error);
      useAuthStore.getState().setAccessToken(null);

      //TODO explain the function of this promise
      throw Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 1. Extract the message safely
    const apiMessage =
      (error.response?.data as any)?.message ||
      error.message ||
      "Request failed";

    // 2. Create a proper Error instance
    const enhancedError = new Error(apiMessage);

    // 3. Attach metadata to the Error object instead of replacing it
    // This preserves the Stack Trace while giving you the data you need
    (enhancedError as any).status = error.response?.status;
    (enhancedError as any).data = error.response?.data;
    (enhancedError as any).isAxiosError = true;

    // 4. Use Promise.reject instead of throw for interceptors
    return Promise.reject(enhancedError);
  },
);

const api = {
  async post<T>(path: string, body?: unknown): Promise<T> {
    const response = await apiClient.post<T>(path, body);
    return response.data;
  },

  async get<T>(path: string): Promise<T> {
    const response = await apiClient.get<T>(path);
    return response.data;
  },

  async patch<T>(path: string, body: unknown): Promise<T> {
    const response = await apiClient.patch<T>(path, body);
    return response.data;
  },

  async put<T>(path: string, body: unknown): Promise<T> {
    const response = await apiClient.put<T>(path, body);
    return response.data;
  },

  async delete<T>(path: string): Promise<T> {
    const response = await apiClient.delete<T>(path);
    return response.data;
  },
};

export default api;
