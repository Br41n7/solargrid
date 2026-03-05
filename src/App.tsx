/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Projects from './pages/public/Projects';
import Careers from './pages/public/Careers';
import Contact from './pages/public/Contact';
import RequestQuote from './pages/public/RequestQuote';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProjects from './pages/admin/Projects';
import AdminClients from './pages/admin/Clients';
import AdminInvoices from './pages/admin/Invoices';
import AdminStaff from './pages/admin/Staff';
import AdminQuotes from './pages/admin/Quotes';
import AdminDocuments from './pages/admin/Documents';
import AdminLogs from './pages/admin/Logs';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<><Navbar /><Footer /></>}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-quote" element={<RequestQuote />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
        
        <Route path="/admin" element={user ? <AdminLayout user={user} onLogout={handleLogout} /> : <Navigate to="/admin/login" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="invoices" element={<AdminInvoices />} />
          <Route path="staff" element={<AdminStaff />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="logs" element={<AdminLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}

