import React, { useState, useEffect } from 'react';
import { Settings, Save, AlertTriangle, RefreshCw, KeyRound, ShieldAlert, Check } from 'lucide-react';
import { api } from '../../services/api.js';
import { useData } from '../../context/DataContext.js';
import { useAuth } from '../../context/AuthContext.js';

export const AdminSettingsPage: React.FC = () => {
  const { settings, refreshData, showToast } = useData();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState<any>({
    site_title_bn: '',
    site_title_en: '',
    site_subtitle_bn: '',
    emergency_notice: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    about_text: '',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        site_title_bn: settings.site_title_bn || '',
        site_title_en: settings.site_title_en || '',
        site_subtitle_bn: settings.site_subtitle_bn || '',
        emergency_notice: settings.emergency_notice || '',
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        address: settings.address || '',
        about_text: settings.about_text || '',
      });
    }
  }, [settings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateSettings(formData);
      await refreshData();
      showToast('পোর্টাল সেটিংস সফলভাবে সংরক্ষিত হয়েছে!', 'success');
    } catch (err: any) {
      showToast(err.message || 'সেটিংস সংরক্ষণ ব্যর্থ হয়েছে', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে', 'error');
      return;
    }

    setPwdLoading(true);
    try {
      await api.updateProfile({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      showToast('অ্যাডমিন পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!', 'success');
    } catch (err: any) {
      showToast(err.message || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে', 'error');
    } finally {
      setPwdLoading(false);
    }
  };

  const handleResetDatabase = async () => {
    if (!window.confirm('সতর্কতা: ডাটাবেজ প্রাথমিক বোয়ালখালী ডাটাতে রিসেট করতে চান? আপনার কাস্টম লিস্টিং মুছে যেতে পারে।')) {
      return;
    }

    setResetLoading(true);
    try {
      await api.resetDatabase();
      await refreshData();
      showToast('ডাটাবেজ সফলভাবে রিসেট ও সিড করা হয়েছে!', 'success');
    } catch (err: any) {
      showToast('ডাটাবেজ রিসেট ব্যর্থ হয়েছে', 'error');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-orange-600" />
            পোর্টাল সেটিংস ও নিরাপত্তা
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            জরুরি নোটিশ, ওয়েবসাইটের তথ্য ও অ্যাডমিন পাসওয়ার্ড পরিবর্তন
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Emergency Notice Banner Control */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200 bg-amber-50/20 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              শীর্ষ জরুরি স্ক্রল নোটিশ (Emergency Banner)
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            ওয়েবসাইটের উপরে সব পৃষ্ঠায় এই জরুরি ঘোষণা দেখা যাবে। ফাঁকা রাখলে এটি প্রদর্শিত হবে না।
          </p>
          <input
            type="text"
            placeholder="যেমন: ঘূর্ণিঝড় বা দুর্যোগকালীন জরুরি কন্ট্রোল রুম নম্বর: 01713-373656"
            value={formData.emergency_notice}
            onChange={(e) => setFormData({ ...formData, emergency_notice: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
          />
        </div>

        {/* Site Details */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            ওয়েবসাইটের নাম ও বিবরণ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">সাইটের বাংলা শিরোনাম</label>
              <input
                type="text"
                value={formData.site_title_bn}
                onChange={(e) => setFormData({ ...formData, site_title_bn: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">ইংরেজি শিরোনাম</label>
              <input
                type="text"
                value={formData.site_title_en}
                onChange={(e) => setFormData({ ...formData, site_title_en: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-gray-700">সাবটাইটেল / স্লোগান</label>
              <input
                type="text"
                value={formData.site_subtitle_bn}
                onChange={(e) => setFormData({ ...formData, site_subtitle_bn: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">যোগাযোগের ইমেইল</label>
              <input
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">যোগাযোগের ফোন নম্বর</label>
              <input
                type="text"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-gray-700">ঠিকানা</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-gray-700">আমাদের সম্পর্কে (About Text)</label>
              <textarea
                rows={3}
                value={formData.about_text}
                onChange={(e) => setFormData({ ...formData, about_text: e.target.value })}
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              {loading ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}
            </button>
          </div>
        </div>
      </form>

      {/* Change Password Form */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-orange-600" />
          অ্যাডমিন পাসওয়ার্ড পরিবর্তন
        </h2>

        <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">বর্তমান পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="বর্তমান পাসওয়ার্ড"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)</label>
            <input
              type="password"
              placeholder="নতুন গোপন পাসওয়ার্ড"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={pwdLoading || !newPassword}
              className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-all disabled:opacity-50"
            >
              {pwdLoading ? 'আপডেট হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন করুন'}
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone: Reset Database */}
      <div className="bg-red-50/60 rounded-3xl p-6 border border-red-200 space-y-3">
        <div className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="text-sm font-bold">ডাটাবেজ রিসেট ও সিডিং (Database Reset)</h3>
        </div>
        <p className="text-xs text-red-700 leading-relaxed">
          প্রয়োজন হলে সম্পূর্ণ বোয়ালখালী পোর্টাল ডাটাবেজটিকে মূল প্রাথমিক তথ্য (Seed Data) দিয়ে পুনরায় সিড করতে পারেন।
        </p>
        <button
          type="button"
          onClick={handleResetDatabase}
          disabled={resetLoading}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${resetLoading ? 'animate-spin' : ''}`} />
          {resetLoading ? 'রিসেট হচ্ছে...' : 'ডাটাবেজ রিসেট করুন'}
        </button>
      </div>
    </div>
  );
};
