import React, { useState, useEffect } from 'react';
import { Users, Search, Shield, UserCheck, Trash2, Edit, AlertCircle } from 'lucide-react';
import { api } from '../../services/api.js';
import { useData } from '../../context/DataContext.js';
import { User } from '../../types.js';

export const AdminUsersPage: React.FC = () => {
  const { showToast } = useData();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
    try {
      await api.updateAdminUser(userId, { role });
      setUsers(users.map((u) => (u.id === userId ? { ...u, role } : u)));
      showToast('ইউজার রোল সফলভাবে পরিবর্তন করা হয়েছে', 'success');
    } catch (err: any) {
      showToast(err.message || 'রোল পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === 'active' ? 'banned' : 'active';
    try {
      await api.updateAdminUser(user.id, { status: newStatus });
      setUsers(users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
      showToast(`ইউজার অ্যাকাউন্ট ${newStatus === 'active' ? 'সক্রিয়' : 'নিষিদ্ধ'} করা হয়েছে`, 'success');
    } catch (err) {
      showToast('স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('আপনি কি এই ইউজার মুছে ফেলতে চান?')) return;
    try {
      await api.deleteAdminUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
      showToast('ইউজার সফলভাবে মুছে ফেলা হয়েছে', 'success');
    } catch (err: any) {
      showToast(err.message || 'ইউজার মুছে ফেলা সম্ভব হয়নি', 'error');
    }
  };

  const filteredUsers = users.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      u.name.toLowerCase().includes(q) ||
      (u.username && u.username.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-600" />
            ব্যবহারকারী ও অ্যাডমিন তালিকা ({users.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            রেজিস্টার্ড ইউজারদের অনুমতি ও অ্যাকাউন্ট স্ট্যাটাস পরিচালনা করুন
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="ইউজার খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4">ব্যবহারকারী</th>
                <th className="p-4">মোবাইল / ইমেইল</th>
                <th className="p-4">ইউজার রোল</th>
                <th className="p-4 text-center">স্ট্যাটাস</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(u.name)}`}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover border"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{u.name}</div>
                        {u.username && <div className="text-[11px] text-gray-400 font-mono">@{u.username}</div>}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-mono text-gray-700">{u.phone || '-'}</div>
                    <div className="text-[11px] text-gray-400">{u.email || '-'}</div>
                  </td>

                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-hidden ${
                        u.role === 'admin'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : u.role === 'moderator'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-gray-50 text-gray-800 border-gray-200'
                      }`}
                    >
                      <option value="user">User (ব্যবহারকারী)</option>
                      <option value="moderator">Moderator (মডারেটর)</option>
                      <option value="admin">Admin (অ্যাডমিন)</option>
                    </select>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        u.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {u.status === 'active' ? 'সক্রিয়' : 'নিষিদ্ধ (Banned)'}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    {u.username !== 'simo' && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="ইউজার মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
