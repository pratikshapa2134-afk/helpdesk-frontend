import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  // सर्व तिकिटे सर्व्हरवरून फेच करणे
  const fetchTickets = async () => {
    try {
      const { data } = await API.get('/tickets');
      setTickets(data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // नवीन तिकीट तयार करणे
  const createTicket = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tickets', { 
        subject, 
        description, 
        category: category || '650f1a2b3c4d5e6f7a8b9c0d' // डिफिकल्ट कॅटेगरी आयडी किंवा सेलेक्टेड व्हॅल्यू
      });
      setSubject('');
      setDescription('');
      setCategory('');
      fetchTickets(); // लिस्ट रिफ्रेश करणे
    } catch (err) {
      console.error('Error creating ticket:', err);
    }
  };

  // लॉग आउट हँडलर
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* नवीन तिकीट तयार करण्याचा फॉर्म */}
        <form onSubmit={createTicket} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Support Ticket</h2>
          
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2">Subject</label>
            <input 
              type="text" 
              placeholder="Enter ticket subject" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2">Description</label>
            <textarea 
              placeholder="Describe your issue in detail" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded font-semibold hover:bg-green-700 transition">
            Submit Ticket
          </button>
        </form>

        {/* तिकिटांची यादी दाखवणे */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">My Tickets History</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center">No tickets found.</p>
          ) : (
            tickets.map((t) => (
              <div key={t._id} className="border-b py-4 flex justify-between items-center last:border-none">
                <div>
                  <p className="font-bold text-blue-600">{t.ticketId}: {t.subject}</p>
                  <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                  {t.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}