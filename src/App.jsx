import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* लॉगिन आणि रजिस्ट्रेशन पेज */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* डॅशबोर्ड पेज */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        
        {/* जर कोणतीही लिंक सापडली नाही तर युजरला लॉगिन पेजवर पाठवा */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;