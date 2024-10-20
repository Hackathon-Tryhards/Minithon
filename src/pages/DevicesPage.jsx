import { useState } from 'react';
import { Bell, ChevronDown, Menu, Settings, Camera, Thermometer, Eye, Lock, Tv, Speaker, Fan, Coffee, Lightbulb, Wifi, Plug } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sidebar } from "@/components/Sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialDevices = [
  { id: 1, name: 'Front Door Camera', type: 'camera', status: 'Online', icon: Camera, battery: 80, location: 'Outdoor' },
  { id: 2, name: 'Living Room Thermostat', type: 'thermostat', status: 'Online', icon: Thermometer, temperature: 72, location: 'Living Room' },
  { id: 3, name: 'Backyard Motion Sensor', type: 'sensor', status: 'Offline', icon: Eye, lastDetection: '2 days ago', location: 'Outdoor' },
  { id: 4, name: 'Kitchen Smart Lock', type: 'lock', status: 'Online', icon: Lock, lastUnlocked: '1 hour ago', location: 'Kitchen' },
  { id: 5, name: 'Living Room TV', type: 'tv', status: 'Online', icon: Tv, lastUsed: '30 minutes ago', location: 'Living Room' },
  { id: 6, name: 'Bedroom Speaker', type: 'speaker', status: 'Online', icon: Speaker, volume: 50, location: 'Bedroom' },
  { id: 7, name: 'Bathroom Fan', type: 'fan', status: 'Offline', icon: Fan, speed: 0, location: 'Bathroom' },
  { id: 8, name: 'Kitchen Coffee Maker', type: 'coffee_maker', status: 'Online', icon: Coffee, lastBrew: 'Today 7:00 AM', location: 'Kitchen' },
  { id: 9, name: 'Dining Room Lights', type: 'light', status: 'Online', icon: Lightbulb, brightness: 70, location: 'Dining Room' },
  { id: 10, name: 'Home Office Wi-Fi Router', type: 'router', status: 'Online', icon: Wifi, connectedDevices: 8, location: 'Home Office' },
  { id: 11, name: 'Garage Door Opener', type: 'garage_door', status: 'Online', icon: Lock, lastOpened: 'Today 8:30 AM', location: 'Garage' },
  { id: 12, name: 'Basement Dehumidifier', type: 'dehumidifier', status: 'Online', icon: Plug, humidity: 50, location: 'Basement' },
  { id: 13, name: 'Master Bedroom AC', type: 'ac', status: 'Online', icon: Thermometer, temperature: 68, location: 'Master Bedroom' },
  { id: 14, name: 'Patio Lights', type: 'light', status: 'Offline', icon: Lightbulb, brightness: 0, location: 'Outdoor' },
];

const locations = [...new Set(initialDevices.map(device => device.location))].sort();

export default function DevicesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [devices, setDevices] = useState(initialDevices);

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === 'All' || device.location === selectedLocation)
  );

  const handleToggle = (id) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, status: device.status === 'Online' ? 'Offline' : 'Online' } : device
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6 md:hidden cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
            <h1 className="text-2xl font-bold text-gray-800">Smart Devices</h1>
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

        <div className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                  <device.icon className="w-6 h-6 text-gray-500" />
                </div>
                <CardDescription>
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${device.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {device.status}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Location: {device.location}</p>
                  {device.type === 'camera' && (
                    <div className="space-y-2">
                      <Label>Battery</Label>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${device.battery}%` }}></div>
                      </div>
                      <p className="text-sm text-gray-600">{device.battery}%</p>
                    </div>
                  )}
                  {device.type === 'thermostat' && (
                    <div className="space-y-2">
                      <Label>Temperature</Label>
                      <div className="flex items-center">
                        <Thermometer className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-2xl font-bold">{device.temperature}°F</span>
                      </div>
                    </div>
                  )}
                  {device.type === 'sensor' && (
                    <div className="space-y-2">
                      <Label>Last Detection</Label>
                      <p className="text-sm text-gray-600">{device.lastDetection}</p>
                    </div>
                  )}
                  {device.type === 'lock' && (
                    <div className="space-y-2">
                      <Label>Last Unlocked</Label>
                      <p className="text-sm text-gray-600">{device.lastUnlocked}</p>
                    </div>
                  )}
                  {device.type === 'tv' && (
                    <div className="space-y-2">
                      <Label>Last Used</Label>
                      <p className="text-sm text-gray-600">{device.lastUsed}</p>
                    </div>
                  )}
                  {device.type === 'speaker' && (
                    <div className="space-y-2">
                      <Label>Volume</Label>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${device.volume}%` }}></div>
                      </div>
                      <p className="text-sm text-gray-600">{device.volume}%</p>
                    </div>
                  )}
                  {device.type === 'fan' && (
                    <div className="space-y-2">
                      <Label>Speed</Label>
                      <p className="text-sm text-gray-600">{device.speed}</p>
                    </div>
                  )}
                  {device.type === 'coffee_maker' && (
                    <div className="space-y-2">
                      <Label>Last Brew</Label>
                      <p className="text-sm text-gray-600">{device.lastBrew}</p>
                    </div>
                  )}
                  {device.type === 'light' && (
                    <div className="space-y-2">
                      <Label>Brightness</Label>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${device.brightness}%` }}></div>
                      </div>
                      <p className="text-sm text-gray-600">{device.brightness}%</p>
                    </div>
                  )}
                  {device.type === 'router' && (
                    <div className="space-y-2">
                      <Label>Connected Devices</Label>
                      <p className="text-sm text-gray-600">{device.connectedDevices}</p>
                    </div>
                  )}
                  {device.type === 'garage_door' && (
                    <div className="space-y-2">
                      <Label>Last Opened</Label>
                      <p className="text-sm text-gray-600">{device.lastOpened}</p>
                    </div>
                  )}
                  {device.type === 'dehumidifier' && (
                    <div className="space-y-2">
                      <Label>Humidity</Label>
                      <p className="text-sm text-gray-600">{device.humidity}%</p>
                    </div>
                  )}
                  {device.type === 'ac' && (
                    <div className="space-y-2">
                      <Label>Temperature</Label>
                      <div className="flex items-center">
                        <Thermometer className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-2xl font-bold">{device.temperature}°F</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <Label htmlFor={`device-${device.id}-toggle`}>
                    {device.status === 'Online' ? 'Turn Off' : 'Turn On'}
                  </Label>
                  <Switch
                    id={`device-${device.id}-toggle`}
                    checked={device.status === 'Online'}
                    onCheckedChange={() => handleToggle(device.id)}
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
