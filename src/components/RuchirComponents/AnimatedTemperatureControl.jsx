import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Zap, Minus, Plus, Snowflake, Sun } from 'lucide-react';

const AnimatedTemperatureControl = () => {
  const [temperature, setTemperature] = useState(20);
  const [isLivingRoomTempOn, setIsLivingRoomTempOn] = useState(true);
  const [animationColor, setAnimationColor] = useState('#3B82F6');

  useEffect(() => {
    if (temperature < 10) {
      setAnimationColor('#3B82F6'); // Cold blue
    } else if (temperature < 20) {
      setAnimationColor('#10B981'); // Cool green
    } else if (temperature < 30) {
      setAnimationColor('#F59E0B'); // Warm yellow
    } else {
      setAnimationColor('#EF4444'); // Hot red
    }
  }, [temperature]);

  const handleTempChange = (value) => {
    setTemperature(value[0]);
  };

  // Calculate the progress for the circular bar
  const calculateProgress = () => {
    const minTemp = 5;
    const maxTemp = 35;
    const progress = ((temperature - minTemp) / (maxTemp - minTemp)) * 100;
    return progress;
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl overflow-hidden">
      <CardContent className={`p-4 sm:p-6`}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            Living Room Temperature
          </h3>
          <Switch
            checked={isLivingRoomTempOn}
            onCheckedChange={setIsLivingRoomTempOn}
          />
        </div>
        <div className={`flex items-center justify-center mb-4 sm:mb-6 relative ${!isLivingRoomTempOn ? 'opacity-50' : ''}`}>
          <div className="w-36 h-36 sm:w-48 sm:h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="transition-all duration-500 ease-in-out"
                strokeWidth="10"
                strokeDasharray={Math.PI * 80}
                strokeDashoffset={Math.PI * 80 * (1 - calculateProgress() / 100)}
                strokeLinecap="round"
                stroke={animationColor}
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl sm:text-4xl font-bold" style={{ color: animationColor }}>{temperature}°C</span>
            </div>
            <div 
              className="absolute inset-0 flex items-center justify-center opacity-10 transition-opacity duration-500"
              style={{ opacity: isLivingRoomTempOn ? 0.1 : 0 }}
            >
              {temperature < 20 ? (
                <Snowflake className="w-16 h-16 sm:w-24 sm:h-24" style={{ color: animationColor }} />
              ) : (
                <Sun className="w-16 h-16 sm:w-24 sm:h-24" style={{ color: animationColor }} />
              )}
            </div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">35°C</div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xs sm:text-sm text-gray-500">5°C</div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleTempChange([Math.max(5, temperature - 1)])}
            disabled={!isLivingRoomTempOn || temperature <= 5}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Slider
            value={[temperature]}
            min={5}
            max={35}
            step={1}
            onValueChange={handleTempChange}
            disabled={!isLivingRoomTempOn}
            className="w-3/5 sm:w-3/4"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleTempChange([Math.min(35, temperature + 1)])}
            disabled={!isLivingRoomTempOn || temperature >= 35}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
        <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {isLivingRoomTempOn ? (
            temperature < 20 ? 
              "It's a bit chilly. Consider turning up the heat." :
              temperature > 25 ?
                "It's getting warm. You might want to cool it down." :
                "The temperature is just right. Enjoy your comfort!"
          ) : (
            "Temperature control is currently off."
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedTemperatureControl;