// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from '@/pages/LandingPage';
import DashRuchir from './pages/DashRuchir';
import UsersPage from '@/pages/UsersPage';
import Dashboard from '@/pages/Dashboard';
import SecurityPage from '@/pages/SecurityPage';
import Graphs from '@/pages/Graphs'
import Animate from '@/pages/Animate'
import DevicesPage from '@/pages/DevicesPage';


const App = () => {
  return (
    <div>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<Animate />} />
        <Route path="/dashboard" element={<DashRuchir />} />
        <Route path="/analytics" element={<Graphs />} />

        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/security" element={<SecurityPage />} />
      </Routes>
    </div>
  );
};

export default App;
