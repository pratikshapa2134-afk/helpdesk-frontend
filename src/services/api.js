import axios from 'axios';
import toast from 'react-hot-toast';

// Render cha backend URL
const API = axios.create({ 
  baseURL: 'https://helpdesk-backend-wjne.onrender.com/api',
  timeout: 10000
});

// Token auto add karayala
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Error handle karayala
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    toast.error(error.response?.data?.message || 'Network Error');
    return Promise.reject(error);
  }
);

export default API;