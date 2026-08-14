import axios from 'axios';

const API = axios.create({
  baseURL: 'https://helpdesk-backend-wjne.onrender.com/api', // तुमच्या डिप्लॉय केलेल्या बॅकएंडची लिंक
});

// रिक्वेस्ट पाठवण्यापूर्वी लोकल स्टोरेजमधील टोकन हेडर्समध्ये जोडणे
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;