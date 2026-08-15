import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Token automatically add करेल
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Error handling
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    toast.error(
      error.response?.data?.message || "Network Error"
    );

    return Promise.reject(error);
  }
);

export default API;