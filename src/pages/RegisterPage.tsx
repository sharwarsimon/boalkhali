import React, { useState } from 'react';
import { UserPlus, User, Lock, Phone, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useData } from '../context/DataContext.js';

interface RegisterPageProps {
  navigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
  const { register } = useAuth();
  const { showToast } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password) {
      setError('নাম এবং পাসওয়ার্ড প্রদান করুন');
      return;
    }

    if (!phone.trim() && !email.trim()) {
      setError('মোবাইল নম্বর অথবা ইমেইল যেকোনো একটি প্রদান আবশ্যক');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await register({
        name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        password,
      });
      showToast('রেজিস্ট্রেশন সফল হয়েছে!', 'success');
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।');
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            বোয়ালখালী ডিরেক্টরিতে সেবা সংরক্ষণ ও চ্যাট সুবিধা পেতে যুক্ত হোন
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
            <label className="text-xs font-bold text-gray-700">আপনার পুরো নাম *</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="reg-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">মোবাইল নম্বর *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="reg-phone-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="যেমন: 018XXXXXXXX"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">ইমেইল (ঐচ্ছিক)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="reg-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">পাসওয়ার্ড * (কমপক্ষে ৬ অক্ষর)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="reg-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="গোপন পাসওয়ার্ড দিন"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            id="reg-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'রেজিস্টার সম্পন্ন করুন'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-600">
          ইতিমধ্যে একাউন্ট আছে?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-orange-600 font-bold hover:underline"
          >
            লগইন করুন
          </button>
        </div>
      </div>
    </div>
  );
};
