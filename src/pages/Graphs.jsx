import React, { useState,useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Battery, Lightbulb, Thermometer } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';

import { Bell, ChevronDown, Menu, Settings, Camera, Eye, Lock, Tv, Speaker, Fan, Coffee, Wifi, Plug } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {   CardDescription, CardFooter,  } from "@/components/ui/card";

const EnergyConsumptionDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Comprehensive weekly data with hourly readings
    const hourlyData = useMemo(() => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = [];

        days.forEach(day => {
            // Create a natural consumption pattern
            for (let hour = 0; hour < 24; hour++) {
                // Base consumption varies by time of day
                let baseConsumption =
                    (hour >= 7 && hour <= 9) ? 8 + Math.random() * 18 : // Morning peak
                        (hour >= 18 && hour <= 21) ? 9 + Math.random() * 31 : // Evening peak
                            (hour >= 23 || hour <= 5) ? 2 + Math.random() * 27 : // Night low
                                5 + Math.random() * 2; // Regular hours

                data.push({
                    day,
                    hour: `${hour}:00`,
                    consumption: baseConsumption,
                    peak: baseConsumption * (1.2 + Math.random() * 0.1),
                    average: baseConsumption * (0.9 + Math.random() * 0.1)
                });
            }
        });
        return data;
    }, []);

    // Weekly aggregated data for main chart
    const weeklyData = useMemo(() => {
        return hourlyData.reduce((acc, curr) => {
            const existingDay = acc.find(d => d.day === curr.day);
            if (existingDay) {
                existingDay.consumption += curr.consumption;
                existingDay.peak = Math.max(existingDay.peak, curr.peak);
                existingDay.average = (existingDay.average + curr.consumption) / 2;
            } else {
                acc.push({
                    day: curr.day,
                    consumption: curr.consumption,
                    peak: curr.peak,
                    average: curr.consumption
                });
            }
            return acc;
        }, []);
    }, [hourlyData]);

    // Comprehensive device data
    const deviceData = [
        {
            name: 'HVAC System',
            consumption: 450,
            percentage: 35,
            peakHours: '14:00-17:00',
            efficiency: 92,
            status: 'active'
        },
        {
            name: 'Refrigerator',
            consumption: 200,
            percentage: 15,
            peakHours: '13:00-16:00',
            efficiency: 88,
            status: 'active'
        },
        {
            name: 'Water Heater',
            consumption: 180,
            percentage: 14,
            peakHours: '06:00-09:00',
            efficiency: 85,
            status: 'active'
        },
        {
            name: 'Washing Machine',
            consumption: 150,
            percentage: 12,
            peakHours: '10:00-12:00',
            efficiency: 90,
            status: 'standby'
        },
        {
            name: 'Dishwasher',
            consumption: 130,
            percentage: 10,
            peakHours: '19:00-21:00',
            efficiency: 87,
            status: 'active'
        },
        
    ];

    // Calculate real-time stats
    const calculateStats = () => {
        const totalConsumption = deviceData.reduce((sum, device) => sum + device.consumption, 0);
        const activeDevices = deviceData.filter(device => device.status === 'active').length;
        const avgEfficiency = deviceData.reduce((sum, device) => sum + device.efficiency, 0) / deviceData.length;
        const currentPeakUsage = Math.max(...weeklyData.map(day => day.peak));

        // Calculate changes based on previous period
        const previousTotal = totalConsumption * 0.95; // Simulated previous period
        const previousPeak = currentPeakUsage * 0.92;
        const previousEfficiency = avgEfficiency * 0.95;

        return {
            totalConsumption: {
                current: totalConsumption,
                change: ((totalConsumption - previousTotal) / previousTotal * 100).toFixed(2)
            },
            peakUsage: {
                current: currentPeakUsage,
                change: ((currentPeakUsage - previousPeak) / previousPeak * 100).toFixed(2)
            },
            activeDevices: {
                current: activeDevices,
                change: activeDevices - 6 // Simulated previous active devices
            },
            efficiency: {
                current: avgEfficiency,
                change: ((avgEfficiency - previousEfficiency) / previousEfficiency * 100).toFixed(2)
            }
        };
    };

    const stats = calculateStats();

    // Stats cards data with real calculations
    const statsData = [
        {
            title: "Total Consumption",
            value: `${stats.totalConsumption.current.toFixed(1)} kWh`,
            change: `${stats.totalConsumption.change}%`,
            icon: <Activity className="h-4 w-4 text-blue-500" />,
            description: "Daily aggregate across all devices"
        },
        {
            title: "Peak Usage",
            value: `${stats.peakUsage.current.toFixed(1)} kWh`,
            change: `${stats.peakUsage.change}%`,
            icon: <Battery className="h-4 w-4 text-orange-500" />,
            description: "Highest consumption period"
        },
        {
            title: "Active Devices",
            value: stats.activeDevices.current,
            change: `${stats.activeDevices.change > 0 ? '+' : ''}${stats.activeDevices.change}`,
            icon: <Lightbulb className="h-4 w-4 text-yellow-500" />,
            description: "Currently operating devices"
        },
        {
            title: "Efficiency Score",
            value: `${stats.efficiency.current.toFixed(1)}%`,
            change: `${stats.efficiency.change}%`,
            icon: <Thermometer className="h-4 w-4 text-green-500" />,
            description: "Overall system performance"
        }
    ];

    // Colors for charts
    const COLORS = ['#0ea5e9', '#f97316', '#8b5cf6', '#10b981', '#ef4444', '#06b6d4', '#8b5cf6'];

    const StatCard = ({ title, value, change, icon, description }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex flex-col space-y-1">
                    <p className={`text-xs ${parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {change.startsWith('-') ? '' : '+'}{change} from last week
                    </p>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </CardContent>
        </Card>
    );

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border rounded shadow-lg">
                    <p className="font-bold">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toFixed(2)} kWh
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-auto">
            <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6 md:hidden cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
            <h1 className="text-2xl font-bold text-gray-800">Energy Consumption Dashboard</h1>
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

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statsData.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Main Charts */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="p-4">
                        <CardHeader>
                            <CardTitle>Weekly Consumption Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="consumption"
                                        stroke="#0ea5e9"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Consumption"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="peak"
                                        stroke="#f97316"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Peak"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="average"
                                        stroke="#8b5cf6"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Average"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="p-4">
                        <CardHeader>
                            <CardTitle>Device Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={deviceData}
                                        dataKey="consumption"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                                    >
                                        {deviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Device Breakdown */}
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Device-wise Consumption</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={deviceData}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="consumption" name="Energy Consumption (kWh)">
                                    {deviceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default EnergyConsumptionDashboard;