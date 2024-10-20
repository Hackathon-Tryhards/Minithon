import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const PowerConsumedCard = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    // Simulate fetching data based on the selected period
    const generateData = () => {
      const periods = { day: 10, week: 3, month: 30, year: 12 };
      return Array.from({ length: periods[period] }, (_, i) => ({
        name: `${period === 'day' ? `Hour ${i + 1}` : 
               period === 'week' ? `Day ${i + 1}` :
               period === 'month' ? `Day ${i + 1}` : `Month ${i + 1}`}`,
        consumption: Math.floor(Math.random() * 100) + 20
      }));
    };
    setData(generateData());
  }, [period]);

  const totalConsumption = data.reduce((sum, item) => sum + item.consumption, 0);
  const spendingPercentage = Math.min(Math.round((totalConsumption / (data.length * 100)) * 100), 100);

  return (
    <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
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
        <div className="w-full h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                interval={'preserveStartEnd'}
                tickFormatter={(value) => value.split(' ')[1]}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}
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
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base">Electricity Consumed</span>
            <span className="text-blue-500 font-semibold text-sm sm:text-base">{spendingPercentage}% Spending</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${spendingPercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerConsumedCard;