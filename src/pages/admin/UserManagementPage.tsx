import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  Users, Search, Filter, ShieldCheck, ShieldAlert, CheckCircle2, 
  XCircle, Ban, Unlock, MoreVertical, Mail, Building2, User 
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  studentId: string;
  department: string;
  status: 'ACTIVE' | 'SUSPENDED';
  joinedDate: string;
  avatar: string;
}

const initialUsers: ManagedUser[] = [
  {
    id: 'usr-1',
    name: 'Ahsan Habib',
    email: 'ahsan.habib@baust.edu.bd',
    role: 'student',
    studentId: '0802420105101028',
    department: 'Computer Science & Engineering',
    status: 'ACTIVE',
    joinedDate: 'Jan 15, 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'usr-2',
    name: 'Tanzil Ahmed Chowdhury',
    email: 'tanzil.chowdhury@alumni.baust.edu.bd',
    role: 'alumni',
    studentId: '0802420105101029',
    department: 'Computer Science & Engineering',
    status: 'ACTIVE',
    joinedDate: 'Jan 10, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'usr-3',
    name: 'Lt. Col. (Retd.) M. A. Hye',
    email: 'admin.desk@baust.edu.bd',
    role: 'admin',
    studentId: '0802420105101030',
    department: 'University Administration',
    status: 'ACTIVE',
    joinedDate: 'Dec 01, 2025',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'usr-4',
    name: 'Mahir Faisal',
    email: 'mahir.faisal@alumni.baust.edu.bd',
    role: 'alumni',
    studentId: '160101012',
    department: 'Electrical & Electronic Engineering',
    status: 'ACTIVE',
    joinedDate: 'Feb 02, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'usr-5',
    name: 'Sabrina Rahman',
    email: 'sabrina.rahman@student.baust.edu.bd',
    role: 'student',
    studentId: '190201055',
    department: 'Civil Engineering',
    status: 'SUSPENDED',
    joinedDate: 'Feb 14, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'usr-6',
    name: 'Engr. Kazi Nabil',
    email: 'kazi.nabil@alumni.baust.edu.bd',
    role: 'alumni',
    studentId: '150101004',
    department: 'Textile Engineering',
    status: 'ACTIVE',
    joinedDate: 'Jan 22, 2026',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80'
  }
];

export const UserManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const [users, setUsers] = useState<ManagedUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);

  const handleToggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        showToast({
          title: `User ${nextStatus === 'ACTIVE' ? 'Activated' : 'Suspended'}`,
          message: `${u.name} status updated to ${nextStatus}.`,
          type: nextStatus === 'ACTIVE' ? 'success' : 'warning'
        });
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.studentId.includes(searchQuery) ||
                          u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2A4A] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0F2A4A]" />
            User & Institutional Access Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Oversee all registered students, alumni mentors, and university administration staff.
          </p>
        </div>
        <Badge variant="primary">{users.length} Total Registered Accounts</Badge>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
            >
              <option value="ALL">All Roles</option>
              <option value="student">Students</option>
              <option value="alumni">Alumni</option>
              <option value="admin">Administrators</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Student ID / Reg</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-800">{u.name}</div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0F2A4A]">
                    {u.studentId}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={u.role === 'admin' ? 'danger' : u.role === 'alumni' ? 'primary' : 'neutral'}
                      size="sm"
                    >
                      {u.role.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {u.department}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {u.joinedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={u.status === 'ACTIVE' ? 'success' : 'danger'} size="sm">
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(u)}
                        className="text-xs px-2.5"
                      >
                        Details
                      </Button>
                      {u.role !== 'admin' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(u.id)}
                          className={`text-xs px-2.5 ${
                            u.status === 'ACTIVE'
                              ? 'text-rose-600 border-rose-200 hover:bg-rose-50'
                              : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? (
                            <>
                              <Ban className="w-3.5 h-3.5 mr-1" /> Block
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3.5 h-3.5 mr-1" /> Unblock
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title={`User Record: ${selectedUser.name}`}
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selectedUser.name}</h3>
                <p className="text-xs text-slate-500">{selectedUser.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="primary" size="sm">{selectedUser.role.toUpperCase()}</Badge>
                  <Badge variant={selectedUser.status === 'ACTIVE' ? 'success' : 'danger'} size="sm">
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-500 font-medium">Student / Employee ID</span>
                <span className="font-mono font-bold text-slate-800">{selectedUser.studentId}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-500 font-medium">Department / Faculty</span>
                <span className="font-semibold text-slate-800">{selectedUser.department}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-500 font-medium">Platform Registration Date</span>
                <span className="font-semibold text-slate-800">{selectedUser.joinedDate}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
