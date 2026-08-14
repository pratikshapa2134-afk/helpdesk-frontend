import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AgentDashboard() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const fetchAssignedTickets = async () => {
    try {
      const { data } = await API.get('/tickets');
      setTickets(data);
    } catch (err) {
      console.error('Error fetching agent tickets:', err);
    }
  };

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Support Agent Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Assigned Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-gray-500 text-center">No assigned tickets found.</p>
        ) : (
          tickets.map((t) => (
            <div key={t._id} className="border-b py-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-purple-600">{t.ticketId}: {t.subject}</p>
                <p className="text-sm text-gray-600">Priority: {t.priority} | Status: {t.status}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                {t.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}