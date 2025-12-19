// frontend/src/api/http.ts
import axios from 'axios';

const getApiUrl = () => {
  const prodUrl = import.meta.env.VITE_API_URL;
  if (prodUrl) {
    return prodUrl;
  }
  return 'http://localhost:3000';
};

export const http = axios.create({
  baseURL: getApiUrl(),
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("HTTP error:", error);
    throw error;
  }
);