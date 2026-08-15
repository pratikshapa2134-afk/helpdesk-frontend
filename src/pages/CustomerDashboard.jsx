import { useState } from 'react';
import API from '../services/api'; // he import imp aahe
import toast from 'react-hot-toast';

const CustomerDashboard = () => {
  const [form, setForm] = useState({subject:'', category:'Technical', priority:'Medium', description:''});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // localhost nahi, API use kela
      await API.post('/tickets', form); 
      toast.success('Ticket Created Successfully!');
      setForm({subject:'', category:'Technical', priority:'Medium', description:''});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.subject} onChange={(e)=>setForm({...form, subject:e.target.value})} placeholder="Subject" required/>
      <select value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})}>
        <option>Technical</option><option>Billing</option><option>Account</option>
      </select>
      <select value={form.priority} onChange={(e)=>setForm({...form, priority:e.target.value})}>
        <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
      </select>
      <textarea value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} placeholder="Description" required/>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit Ticket</button>
    </form>
  );
}
export default CustomerDashboard;