import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border rounded" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <select 
            className="w-full p-2 border rounded" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Customer">Customer</option>
            <option value="Support Agent">Support Agent</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded font-semibold hover:bg-green-700 transition">
          Register
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}