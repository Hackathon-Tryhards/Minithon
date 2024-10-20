import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

const MembersCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Members</h3>
          <ChevronRight className="w-6 h-6" />
        </div>
        <div className="flex -space-x-4">
          {['Shreena', 'Ruchir', 'Brother', 'Dad', 'Mom'].map((member, index) => (
            <Avatar key={index}>
              <AvatarImage src="https://avatar.iran.liara.run/public" alt={member} />
              <AvatarFallback >{member[0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MembersCard;
