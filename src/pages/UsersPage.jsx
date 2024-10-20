import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/Sidebar';
import { UserCard } from '@/components/UsersPage/UserCard';
import { SearchBar } from '@/components/UsersPage/SearchBar';
import { AddUserDialog } from '@/components/UsersPage/AddUserDialog';
import { Navbar } from '@/components/UsersPage/Navbar';

const initialMembers = [
  { id: 1, name: 'Scarlett', username: 'scarlett', email: 'scarlett@example.com', imageUrl: 'https://avatar.iran.liara.run/public', access: 'admin' },
  { id: 2, name: 'Nariya', username: 'nariya', email: 'nariya@example.com', imageUrl: 'https://avatar.iran.liara.run/public', access: 'user' },
  { id: 3, name: 'Riya', username: 'riya', email: 'riya@example.com', imageUrl: 'https://avatar.iran.liara.run/public', access: 'user' },
  { id: 4, name: 'Dad', username: 'dad', email: 'dad@example.com', imageUrl: 'https://avatar.iran.liara.run/public', access: 'admin' },
  { id: 5, name: 'Mom', username: 'mom', email: 'mom@example.com', imageUrl: 'https://avatar.iran.liara.run/public', access: 'user' },
];

export default function UsersPage() {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMember, setNewMember] = useState({ name: '', username: '', email: '', imageUrl: '', access: 'user' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMember = () => {
    setMembers([...members, { ...newMember, id: members.length + 1 }]); // add new member
    setNewMember({ name: '', username: '', email: '', imageUrl: '', access: 'user' }); // reset form
  };

  const deleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <AddUserDialog newMember={newMember} setNewMember={setNewMember} addMember={addMember} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredMembers.map((member) => (
                <UserCard key={member.id} member={member} onDelete={deleteMember} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
