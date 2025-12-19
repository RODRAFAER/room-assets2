import axios from "axios";

const getApiUrl = () => {

  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL;
  }
  return '/api';
};

export const http = axios.create({
  baseURL: getApiUrl(),
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.response.use(
  (r) => r,
  (err) => { console.error("HTTP error:", err); throw err; }
);