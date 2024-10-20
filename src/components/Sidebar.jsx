import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X, Home, Smartphone, ShieldCheck, Users, PieChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Smartphone, label: 'Devices', path: '/devices' },
  { icon: ShieldCheck, label: 'Security', path: '/security' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: PieChart, label: 'Analytics', path: '/analytics' },
];

export function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();

  const SidebarContent = ({ isMobile = false }) => (
    <div className={`flex flex-col h-full ${isMobile ? 'px-4 py-8' : 'items-center py-8'}`}>
      <div className={`flex-grow space-y-6 ${isMobile ? '' : 'w-full'}`}>
        {sidebarItems.map(({ icon: Icon, label, path }) => (
          <Link
            to={path}
            key={label}
            className={`flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out
              ${location.pathname === path
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }
              ${isMobile ? 'space-x-4' : 'flex-col space-y-1 justify-center'}
            `}
          >
            <Icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
            <span className={`${isMobile ? 'text-sm' : 'text-xs'}`}>{label}</span>
          </Link>
        ))}
      </div>
      <button
        className={`flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out
          text-blue-100 hover:bg-blue-700 hover:text-white
          ${isMobile ? 'space-x-4' : 'flex-col space-y-1 justify-center w-full'}
        `}
      >
        <LogOut className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
        <span className={`${isMobile ? 'text-sm' : 'text-xs'}`}>Logout</span>
      </button>
    </div>
  );

  return (
    <>
      <div className="hidden md:flex bg-blue-600 text-white h-screen w-20 sticky top-0">
        <SidebarContent />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 bg-blue-600 text-white z-50 md:hidden shadow-lg"
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent isMobile />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}