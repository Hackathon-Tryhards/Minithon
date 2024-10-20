import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Bell, ChevronDown, Menu, Settings, Info, CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import frontDoorVideo from '@/assets/front-door.mp4';
import backYardVideo from '@/assets/back-yard.mp4';
import garageVideo from '@/assets/garage.mp4';
import livingRoomVideo from '@/assets/living-room.mp4';

const securityCameras = [
  { id: 1, name: 'Front Door', status: 'Online', videoSrc: frontDoorVideo },
  { id: 2, name: 'Back Yard', status: 'Online', videoSrc: backYardVideo },
  { id: 3, name: 'Garage', status: 'Offline', videoSrc: garageVideo },
  { id: 4, name: 'Living Room', status: 'Online', videoSrc: livingRoomVideo },
];


const notificationTypes = [
  { type: 'alert', icon: <XCircle className="w-4 h-4 text-red-600" />, color: 'bg-red-50' },
  { type: 'info', icon: <Info className="w-4 h-4 text-blue-600" />, color: 'bg-blue-50' },
  { type: 'normal', icon: <CheckCircle className="w-4 h-4 text-green-600" />, color: 'bg-green-50' },
];

const initialNotifications = [
  {
    id: 1,
    date: '2023-05-15',
    time: '14:30',
    message: 'Motion detected at Front Door',
    type: 'alert',
    icon: notificationTypes.find(nt => nt.type === 'alert').icon,
    color: notificationTypes.find(nt => nt.type === 'alert').color,
  },
  {
    id: 2,
    date: '2023-05-15',
    time: '12:45',
    message: 'Garage door opened',
    type: 'info',
    icon: notificationTypes.find(nt => nt.type === 'info').icon,
    color: notificationTypes.find(nt => nt.type === 'info').color,
  },
  {
    id: 3,
    date: '2023-05-14',
    time: '23:15',
    message: 'All systems normal',
    type: 'normal',
    icon: notificationTypes.find(nt => nt.type === 'normal').icon,
    color: notificationTypes.find(nt => nt.type === 'normal').color,
  },
  {
    id: 4,
    date: '2023-05-14',
    time: '18:20',
    message: 'Back Yard camera went offline',
    type: 'alert',
    icon: notificationTypes.find(nt => nt.type === 'alert').icon,
    color: notificationTypes.find(nt => nt.type === 'alert').color,
  },
  {
    id: 5,
    date: '2023-05-13',
    time: '09:10',
    message: 'System update completed',
    type: 'info',
    icon: notificationTypes.find(nt => nt.type === 'info').icon,
    color: notificationTypes.find(nt => nt.type === 'info').color,
  },
];

const messageTemplates = {
  alert: [
    'Motion detected at Front Door',
    'Unauthorized access attempt detected',
    'Intruder alert in Living Room',
  ],
  info: [
    'Garage door opened',
    'System update completed',
    'Battery level low on device',
  ],
  normal: [
    'All systems normal',
    'Device connected successfully',
    'Camera feed restored',
  ],
};


function getRandomNotification() {
  const randomIndex = Math.floor(Math.random() * notificationTypes.length);
  const { type, icon, color } = notificationTypes[randomIndex];

  // Get a random message from the corresponding type
  const messages = messageTemplates[type];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return {
    id: Date.now() + randomIndex, // unique id
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString().slice(0, 5),
    message: randomMessage,
    type,
    icon,
    color,
  };
}


export default function SecurityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [getRandomNotification(), ...prev]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6 md:hidden cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
            <h1 className="text-2xl font-bold text-gray-800">Security</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <Avatar>
              <AvatarImage src="https://avatar.iran.liara.run/public" alt="Profile" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span className="font-semibold hidden md:inline">Scarlett</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Security Camera Feeds */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Security Cameras</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {securityCameras.map((camera) => (
                <Card key={camera.id}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{camera.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                      {camera.status === 'Online' ? (
                        <video className="w-full h-full object-cover rounded-md" autoPlay loop muted playsInline>
                          <source src={camera.videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <span className="text-gray-500">Camera Offline</span>
                      )}
                    </div>
                    <p className={`mt-2 text-sm ${camera.status === 'Online' ? 'text-green-500' : 'text-red-500'}`}>
                      {camera.status}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Notification List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Security Alerts</h2>
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-250px)]">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 transition-transform transform ${notification.color}`}
                    >
                      <div className="flex items-center">
                        {notification.icon}
                        <p className="ml-2 text-sm text-gray-500">{notification.date} {notification.time}</p>
                      </div>
                      <p className={`mt-1 ${notification.type === 'alert' ? 'text-red-700' : notification.type === 'info' ? 'text-blue-700' : 'text-green-700'}`}>
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
