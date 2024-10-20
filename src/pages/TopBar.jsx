// components/TopBar.js
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Bell, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from './Sidebar';

const TopBar = ({ setIsSidebarOpen, notifications, clearNotification, addNotification }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
        <div className="relative w-full max-w-md">
          <Input type="text" placeholder="Search" className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out" />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out" aria-label="Settings">
          <Settings className="w-6 h-6" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out" aria-label="Notifications">
              <Bell className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-white dark:bg-gray-800 shadow-xl rounded-lg border-0">
            <ScrollArea className="h-[300px] w-full rounded-md p-4">
              <h3 className="font-medium mb-2 text-lg">Notifications</h3>
              {notifications.map((notif) => (
                <div key={notif.id} className="flex justify-between items-center mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm">{notif.message}</span>
                  <Button size="sm" variant="ghost" onClick={() => clearNotification(notif.id)}>Clear</Button>
                </div>
              ))}
              <Button className="w-full mt-2" onClick={addNotification}>Add Test Notification</Button>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <Avatar className="border-2 border-white dark:border-gray-800 shadow-md">
          <AvatarImage src="https://avatar.iran.liara.run/public" alt="Shreena" />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        <span className="hidden md:inline font-medium">Shreena</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </header>
  );
}

export default TopBar;
