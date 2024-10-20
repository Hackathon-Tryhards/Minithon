import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export function UserCard({ member, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4 relative"
    >
      <Avatar className="w-16 h-16">
        <AvatarImage src={member.imageUrl} alt={member.name} />
        <AvatarFallback>{member.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold text-lg">{member.name}</h3>
        <p className="text-gray-600">@{member.username}</p>
        <p className="text-sm text-gray-500">{member.email}</p>
        <p className="text-xs text-blue-600 mt-1">{member.access === 'admin' ? 'Admin' : 'User'}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={() => onDelete(member.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
    