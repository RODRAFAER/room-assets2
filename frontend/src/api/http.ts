import axios from 'axios';

const getApiUrl = () => {
  const prodUrl = import.meta.env.VITE_API_URL;
  if (prodUrl) {
    return `${prodUrl}/api`;
  }

  return '/api';
};

export const http = axios.create({
  baseURL: getApiUrl(),
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  (r) => r,
  (err) => { console.error("HTTP error:", err); throw err; }
);