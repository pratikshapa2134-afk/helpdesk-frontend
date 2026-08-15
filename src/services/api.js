import axios from 'axios';

const API = axios.create({ 
  baseURL: 'https://helpdesk-backend-wjne.onrender.com/api'  // localhost nahi
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;