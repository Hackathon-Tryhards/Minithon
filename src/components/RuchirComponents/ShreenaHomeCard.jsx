import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch"; // Ensure you have a Switch component

const ShreenaHomeCard = () => {
  // State for managing toggle switches for each room
  const [rooms, setRooms] = useState({
    'living-room': {
      refrigeratorOn: true,
      temperatureOn: true,
      acOn: false,
      lightsOn: false,
    },
    'bedroom': {
      refrigeratorOn: false,
      temperatureOn: false,
      acOn: false,
      lightsOn: false,
    },
    'kitchen': {
      refrigeratorOn: false,
      temperatureOn: false,
      acOn: false,
      lightsOn: false,
    },
  });

  const [selectedRoom, setSelectedRoom] = useState('living-room');

  const handleToggle = (device) => {
    setRooms((prev) => ({
      ...prev,
      [selectedRoom]: {
        ...prev[selectedRoom],
        [device]: !prev[selectedRoom][device],
      },
    }));
  };

  const currentRoom = rooms[selectedRoom];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 relative">
              <h3 className="text-xl font-semibold">Shreena's Home</h3>
              <div className="flex items-center gap-4">
                <span>35%</span>
                <span>15°C</span>
                <Select defaultValue={selectedRoom} onValueChange={setSelectedRoom} className="w-full max-w-[180px]">
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent className="overflow-hidden">
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className={currentRoom.refrigeratorOn ? 'bg-blue-200' : ''}>
                <CardContent className="p-4 flex flex-col items-center">
                  <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12a2 2 0 100 4h14a2 2 0 100-4"></path>
                  </svg>
                  <span>Refrigerator</span>
                  <Switch checked={currentRoom.refrigeratorOn} onCheckedChange={() => handleToggle('refrigeratorOn')} />
                </CardContent>
              </Card>
              <Card className={currentRoom.temperatureOn ? 'bg-blue-200' : ''}>
                <CardContent className="p-4 flex flex-col items-center">
                  <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span>Temperature</span>
                  <Switch checked={currentRoom.temperatureOn} onCheckedChange={() => handleToggle('temperatureOn')} />
                </CardContent>
              </Card>
              <Card className={currentRoom.acOn ? 'bg-blue-200' : ''}>
                <CardContent className="p-4 flex flex-col items-center">
                  <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Air Conditioner</span>
                  <Switch checked={currentRoom.acOn} onCheckedChange={() => handleToggle('acOn')} />
                </CardContent>
              </Card>
              <Card className={currentRoom.lightsOn ? 'bg-blue-200' : ''}>
                <CardContent className="p-4 flex flex-col items-center">
                  <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  <span>Lights</span>
                  <Switch checked={currentRoom.lightsOn} onCheckedChange={() => handleToggle('lightsOn')} />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShreenaHomeCard;
