import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomerDashboard() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [priority, setPriority] = useState('Medium');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tickets', 
        { subject, description, category, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubject('');
      setDescription('');
      setCategory('Technical');
      setPriority('Medium');
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 space-y-4">
        <h2 className="text-lg font-semibold">Create New Support Ticket</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            placeholder="Enter ticket subject" 
            className="w-full mt-1 p-2 border rounded"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Describe your issue in detail" 
            className="w-full mt-1 p-2 border rounded"
            required 
          />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit Ticket
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">My Tickets History</h2>
      <div className="space-y-4">
        {tickets.length === 0 ? (
          <p className="text-gray-500 bg-white p-4 rounded shadow">No tickets found.</p>
        ) : (
          tickets.map((t) => (
            <div key={t._id} className="bg-white p-4 rounded shadow space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-600">{t.subject}</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  {t.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{t.description}</p>
              <div className="text-xs text-gray-400 space-x-2 pt-2">
                <span>Category: {t.category}</span>
                <span>•</span>
                <span>Priority: {t.priority}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}