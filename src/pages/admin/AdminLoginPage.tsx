import React, { useState } from 'react';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { useData } from '../../context/DataContext.js';

interface AdminLoginPageProps {
  navigate: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ navigate }) => {
  const { login, isAdmin } = useAuth();
  const { showToast } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAdmin) {
    navigate('/adm');
    return null;
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('অ্যাডমিন ইউজারনেম ও পাসওয়ার্ড প্রদান করুন');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login({ username: username.trim(), password });
      showToast('অ্যাডমিন লগইন সফল হয়েছে!', 'success');
      navigate('/adm');
    } catch (err: any) {
      setError(err.message || 'অ্যাডমিন ইউজারনেম অথবা পাসওয়ার্ড ভুল');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-700 shadow-2xl space-y-6 text-gray-100">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Boalkhali.com অ্যাডমিন প্যানেল</h1>
          <p className="text-xs text-gray-400">
            পোর্টাল পরিচালনা ও তথ্য ব্যবস্থাপনায় লগইন করুন
          </p>
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300">অ্যাডমিন ইউজারনেম</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="admin-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="যেমন: simo"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-hidden focus:border-orange-500 transition-all placeholder-gray-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="admin-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="অ্যাডমিন পাসওয়ার্ড"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-hidden focus:border-orange-500 transition-all placeholder-gray-500"
              />
            </div>
          </div>

          <button
            id="admin-login-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'যাচাই করা হচ্ছে...' : 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ'}
          </button>
        </form>

        <div className="pt-3 border-t border-gray-700/60 flex items-center justify-between text-xs text-gray-400">
          <button
            onClick={() => navigate('/')}
            className="hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            মূল ওয়েবসাইটে ফিরুন
          </button>
          <span className="text-[11px] text-gray-500 font-mono">Boalkhali Admin v2.0</span>
        </div>
      </div>
    </div>
  );
};
