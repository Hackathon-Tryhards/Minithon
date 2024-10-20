// components/Sidebar.js
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Grid, Lamp, Shield, MapPin, Users, BarChart2, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, className = "" }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg p-4 flex flex-col justify-between transition-all duration-300 ease-in-out ${className}`}>
      <div className="flex flex-col gap-6">
        {[{ icon: Home, label: 'Home', value: 'home' },
          { icon: Grid, label: 'Devices', value: 'devices' },
          { icon: Lamp, label: 'Scenes', value: 'scenes' },
          { icon: Shield, label: 'Security', value: 'security' },
          { icon: MapPin, label: 'Locations', value: 'locations' },
          { icon: Users, label: 'Members', value: 'members' },
          { icon: BarChart2, label: 'Analytics', value: 'analytics' },
        ].map(({ icon: Icon, label, value }) => (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            className={`justify-start ${activeTab === value ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab(value)}
          >
            <Icon className="w-5 h-5 mr-2" />
            {label}
          </Button>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="justify-start hover:bg-gray-100 dark:hover:bg-gray-700">
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
