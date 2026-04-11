import axios from "axios";

// Create a custom instance
export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // ALWAYS send the HttpOnly JWT cookie
});

// A helper to grab the CSRF cookie
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

// The Interceptor: Runs automatically before EVERY request
api.interceptors.request.use(
  (config) => {
    // We only need the CSRF token for state-mutating requests
    if (config.method !== "get") {
      const csrfToken = getCookie("csrf_access_token");
      if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
