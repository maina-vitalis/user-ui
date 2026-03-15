import { useAuthStore } from "./store/useAuthStore";
import axios, { AxiosError } from "axios";

type NestExceptionResponse = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
};

export type ApiClientError = Error & {
  status?: number;
  data?: NestExceptionResponse;
  isAxiosError?: boolean;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Request failed",
) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: NestExceptionResponse }).data;
    const rawMessage = data?.message;

    if (Array.isArray(rawMessage) && rawMessage.length > 0) {
      return rawMessage.join(", ");
    }

    if (typeof rawMessage === "string" && rawMessage.trim().length > 0) {
      return rawMessage;
    }

    if (typeof data?.error === "string" && data.error.trim().length > 0) {
      return data.error;
    }
  }

  return fallback;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
          return apiClient(originalRequest);
        });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        await apiClient.post("/api/auth/refresh-token");
        processingQueue(null);
        return apiClient(originalRequest);
      } catch (error) {
        processingQueue(null, error as Error);

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const responseData = error.response?.data as
      | NestExceptionResponse
      | undefined;
    const rawMessage = responseData?.message;

    let apiMessage = "Request failed";
    if (Array.isArray(rawMessage)) {
      apiMessage = rawMessage.join(", ");
    } else if (typeof rawMessage === "string") {
      apiMessage = rawMessage;
    } else if (responseData?.error) {
      apiMessage = responseData.error;
    } else if (error.message) {
      apiMessage = error.message;
    }

    // 2. Create a proper Error instance
    const enhancedError = new Error(apiMessage) as ApiClientError;

    // 3. Attach metadata to the Error object instead of replacing it
    // This preserves the Stack Trace while giving you the data you need
    enhancedError.status = responseData?.statusCode ?? error.response?.status;
    enhancedError.data = responseData;
    enhancedError.isAxiosError = true;

    // 4. Use Promise.reject instead of throw for interceptors
    return Promise.reject(enhancedError);
  },
);

const api = {
  async post<T>(path: string, body?: unknown): Promise<T> {
    const response = await apiClient.post(path, body);
    console.log(response.data, "Api post");
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
