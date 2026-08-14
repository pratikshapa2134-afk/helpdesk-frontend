import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);

      if (data.user.role === 'Super Admin') navigate('/admin-dashboard');
      else if (data.user.role === 'Support Agent') navigate('/agent-dashboard');
      else navigate('/customer-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
  <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-8 text-white">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-200 mt-2">Sign in to your HelpDesk account</p>
        </div>

        {error && (
          <div className="bg-red-500/30 border border-red-500 text-red-200 p-3 rounded-xl mb-6 text-sm text-center backdrop-blur-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition" 
              placeholder="name@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-300">
          Don't have an account? <Link to="/register" className="text-cyan-300 font-semibold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}