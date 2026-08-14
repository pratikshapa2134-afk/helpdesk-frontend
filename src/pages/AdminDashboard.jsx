import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const fetchAllTickets = async () => {
    try {
      const { data } = await API.get('/tickets');
      setTickets(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">All System Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-gray-500 text-center">No tickets available.</p>
        ) : (
          tickets.map((t) => (
            <div key={t._id} className="border-b py-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-indigo-600">{t.ticketId}: {t.subject}</p>
                <p className="text-sm text-gray-600">Customer: {t.customer?.name} | Priority: {t.priority}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                {t.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}