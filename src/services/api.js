import axios from 'axios';

const API = axios.create({
  // Your deployed Render backend URL
  baseURL: 'https://helpdesk-backend-wjne.onrender.com/api', 
});

// Attach the token from local storage to request headers before sending
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;