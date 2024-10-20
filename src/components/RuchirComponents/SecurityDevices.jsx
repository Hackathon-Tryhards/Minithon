import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const SecurityDevices = () => {
  const [deviceStates, setDeviceStates] = useState({
    'Lawn ': true,
    'Park': false,
  });

  const handleSwitchChange = (device) => {
    setDeviceStates((prevStates) => ({
      ...prevStates,
      [device]: !prevStates[device],
    }));
  };

  return (
    <Card className="shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      {/* My Devices Section */}
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Security Cameras</h3>
        </div>
        {/* Devices Grid */}
        <div className="grid grid-cols-2 gap-4 ">
          {Object.keys(deviceStates).map((device, index) => (
            <div 
              key={index} 
              className={`p-5  rounded-lg flex justify-between items-center ${deviceStates[device] ? 'bg-blue-400' : 'bg-gray-300'}`}
            >
              <span className="text-black">{device}</span>
              <Switch 
                checked={deviceStates[device]} 
                onCheckedChange={() => handleSwitchChange(device)} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityDevices;
