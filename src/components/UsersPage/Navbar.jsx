import { Settings, Bell, ChevronDown, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar({ onMenuClick }) {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        <Menu className="w-6 h-6 md:hidden cursor-pointer" onClick={onMenuClick} />
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
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
  );
}
