import React, { useState, useEffect } from 'react';
import { Menu, Bell, Settings, ChevronDown, ChevronRight, Home, Grid, Lamp, Shield, MapPin, Users, BarChart2, LogOut, Zap, Sun, Moon, Cloud, Plus, Minus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Sidebar } from "@/components/Sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import AnimatedTemperatureControl from '@/components/RuchirComponents/AnimatedTemperatureControl';
import SecurityDevices from '@/components/RuchirComponents/SecurityDevices';
import { User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Badge } from '@/components/ui/badge';

export default function SmartHomeDashboard() {

  const [selectedRoom, setSelectedRoom] = useState("living-room");
  const [deviceStates, setDeviceStates] = useState({
    'living-room': {
      Refrigerator: false,
      Temperature: true,
      'Air Conditioner': true,
      Lights: false,
    },
    bedroom: {
      Refrigerator: true,
      Temperature: false,
      'Air Conditioner': false,
      Lights: true,
    },
    kitchen: {
      Refrigerator: false,
      Temperature: true,
      'Air Conditioner': true,
      Lights: false,
    },
  });

  const handleSwitchChange = (device) => {
    setDeviceStates((prevStates) => ({
      ...prevStates,
      [selectedRoom]: {
        ...prevStates[selectedRoom],
        [device]: !prevStates[selectedRoom][device],
      },
    }));
  };

  const [activeTab, setActiveTab] = useState('home');
  const [temperature, setTemperature] = useState(25);
  const [isLivingRoomTempOn, setIsLivingRoomTempOn] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Temperature reached 25°C" },
    { id: 2, message: "Front door unlocked" },
    { id: 3, message: "New device connected" },
  ]);
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('month');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const generateData = () => {
      const periods = { day: 24, week: 7, month: 30, year: 12 };
      return Array.from({ length: periods[period] }, (_, i) => ({
        name: `${period === 'day' ? `${i + 1}h` :
          period === 'week' ? `Day ${i + 1}` :
            period === 'month' ? `${i + 1}` : `M${i + 1}`}`,
        consumption: Math.floor(Math.random() * 100) + 20
      }));
    };
    setData(generateData());
  }, [period]);

  const totalConsumption = data.reduce((sum, item) => sum + item.consumption, 0);
  const spendingPercentage = Math.min(Math.round((totalConsumption / (data.length * 100)) * 100), 100);

  const handleTempChange = (value) => {
    setTemperature(value[0]);
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const addNotification = () => {
    const newNotif = { id: Date.now(), message: `New notification at ${new Date().toLocaleTimeString()}` };
    setNotifications([newNotif, ...notifications]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-y-auto">
      <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6 md:hidden cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
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


        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">Hello, Shreena!</h2>
                <p className="text-blue-100">Welcome Home! The air quality is good & fresh.</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
                    <Sun className="w-5 h-5" />
                    +25°C
                  </span>
                  <span className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
                    <Cloud className="w-5 h-5" />
                    Partly Cloudy
                  </span>
                </div>
              </div>
              <Sun className="w-16 h-16 text-yellow-300" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Shreena's Home Card */}
          <Card className="col-span-ful lg:col-span-2 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Shreena's Home</h3>
                <Select defaultValue="living-room" onValueChange={setSelectedRoom}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(deviceStates[selectedRoom]).map((device, index) => (
                  <Card key={index} className="bg-white dark:bg-gray-800 shadow transition-all duration-300 ease-in-out hover:shadow-md">
                    <CardContent className="p-4 flex flex-col items-center">
                      {device === 'Refrigerator' && <Zap className="w-8 h-8 text-yellow-500 mb-2" />}
                      {device === 'Temperature' && <Sun className="w-8 h-8 text-orange-500 mb-2" />}
                      {device === 'Air Conditioner' && <Cloud className="w-8 h-8 text-blue-500 mb-2" />}
                      {device === 'Lights' && <Lamp className="w-8 h-8 text-purple-500 mb-2" />}
                      <span className="text-sm font-medium mb-2">{device}</span>
                      <Switch
                        checked={deviceStates[selectedRoom][device]}
                        onCheckedChange={() => handleSwitchChange(device)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Temperature Control Card */}
          <AnimatedTemperatureControl />

          <SecurityDevices />

          {/* Members Section */}
          <Card className="shadow-lg flex h-full transition-all duration-300 ease-in-out hover:shadow-xl p-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Members</h3>
                <ChevronRight className="w-6 h-6" />
              </div>
              <div className="flex space-x-4">
                {[
                  { name: 'Scarlett', role: 'Admin', color: 'bg-purple-500' },
                  { name: 'Nariya', role: 'Full Access', color: 'bg-orange-500' },
                  { name: 'Dad', role: 'Full Access', color: 'bg-blue-500' },
                  { name: 'Mom', role: 'Full Access', color: 'bg-green-500' },
                ].map((member, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-white`}>
                      {member.name[0]}
                    </div>
                    <span className="text-sm">{member.name}</span>
                    <span className="text-xs text-gray-500">{member.role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


          {/* Power Consumed Card */}
          <Card className="col-span-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl font-semibold">Power Consumed</h3>
                <div className="flex items-center gap-2">
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      interval={'preserveStartEnd'}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="consumption"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Electricity Consumed</span>
                  <span className="text-blue-500 font-semibold text-sm sm:text-base">{spendingPercentage}% Spending</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${spendingPercentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}