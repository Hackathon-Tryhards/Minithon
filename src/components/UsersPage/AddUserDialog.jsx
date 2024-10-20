import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AddUserDialog({ newMember, setNewMember, addMember }) {
  const handleReset = () => {
    setNewMember({ name: '', username: '', email: '', access: '', imageUrl: '' });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto transition duration-300 ease-in-out">
          <Plus className="w-4 h-4 mr-2" /> Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="animate-fade-in rounded-lg p-6 bg-white shadow-md w-full max-w-lg mx-auto ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Add New Member</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Input Fields */}
          {[
            { label: "Name", id: "name", type: "text", value: newMember.name },
            { label: "Username", id: "username", type: "text", value: newMember.username },
            { label: "Email", id: "email", type: "email", value: newMember.email },
          ].map(({ label, id, type, value }) => (
            <div key={id} className="w-full">
              <Label htmlFor={id} className="block text-md text-blue-600 mb-1">
                {label}
              </Label>
              <Input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setNewMember({ ...newMember, [id]: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
              />
            </div>
          ))}

          {/* Access Select Dropdown */}
          <div className="w-full">
            <Label htmlFor="access" className="block text-md text-blue-600 mb-1">
              Access
            </Label>
            <Select
              value={newMember.access}
              onValueChange={(value) => setNewMember({ ...newMember, access: value })}
              className="w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition duration-200"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Photo Upload */}
          <div className="w-full">
            <Label htmlFor="imageUrl" className="block text-md text-blue-600 mb-1">
              Profile Photo
            </Label>
            <Input
              id="imageUrl"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewMember({ ...newMember, imageUrl: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
            />
          </div>

          {/* Profile Photo Preview */}
          {newMember.imageUrl && (
            <div className="flex justify-center mt-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={newMember.imageUrl} alt="Preview" />
                <AvatarFallback>{newMember.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            onClick={handleReset}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300 ease-in-out px-4 py-2 rounded-md"
          >
            Reset
          </Button>
          <Button
            onClick={addMember}
            className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out px-4 py-2 rounded-md"
          >
            Add User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
