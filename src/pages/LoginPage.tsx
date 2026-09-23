import React, { useState } from 'react';
import { LogIn, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useData } from '../context/DataContext.js';

interface LoginPageProps {
  navigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { login } = useAuth();
  const { showToast } = useData();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('ইউজারনেম / ফোন নম্বর এবং পাসওয়ার্ড প্রদান করুন');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login({
        username: identifier.includes('@') ? undefined : identifier,
        email: identifier.includes('@') ? identifier : undefined,
        password,
      });
      showToast('লগইন সফল হয়েছে!', 'success');
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'লগইন ব্যর্থ হয়েছে। ইউজারনেম ও পাসওয়ার্ড সঠিক দিন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-sm">
            ব
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">লগইন করুন</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Boalkhali.com একাউন্টে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">ইউজারনেম / ইমেইল / মোবাইল</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="login-identifier-input"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="যেমন: simo বা 01711000000"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700">পাসওয়ার্ড</label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার গোপন পাসওয়ার্ড"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 space-y-2 text-xs text-gray-600">
          <p>
            নতুন ব্যবহারকারী?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-orange-600 font-bold hover:underline"
            >
              এখনই রেজিস্টার করুন
            </button>
          </p>
          <p>
            <button
              onClick={() => navigate('/adm/login')}
              className="text-gray-400 hover:text-orange-600"
            >
              অ্যাডমিন পোর্টাল লগইন (/adm)
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
