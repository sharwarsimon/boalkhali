import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Tag, 
  FileText, 
  Users, 
  MessageSquare, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  ExternalLink,
  Edit,
  Eye
} from 'lucide-react';
import { api } from '../../services/api.js';
import { Listing } from '../../types.js';

interface AdminDashboardPageProps {
  navigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const [stats, setStats] = useState<any>(null);
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, listingsData] = await Promise.all([
          api.getStats(),
          api.getListings(),
        ]);
        setStats(statsData);
        setRecentListings(listingsData.slice(0, 6));
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-white rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'মোট ক্যাটাগরি', value: stats?.categoriesCount || 0, icon: Layers, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'মোট সাবক্যাটাগরি', value: stats?.subcategoriesCount || 0, icon: Tag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'মোট লিস্টিং', value: stats?.listingsCount || 0, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'নিবন্ধিত ইউজার', value: stats?.usersCount || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            স্বাগতম, Boalkhali.com কন্ট্রোল প্যানেল 🛡️
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            বোয়ালখালী উপজেলার সকল ক্যাটাগরি, লিস্টিং, তথ্য ও ইউজার ব্যবস্থাপনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate('/adm/listings/add')}
            className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            নতুন লিস্টিং যুক্ত করুন
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200 shadow-xs flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-gray-500">{card.label}</p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{card.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Access Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => navigate('/adm/categories')}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-5 text-white shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all"
        >
          <Layers className="w-6 h-6 mb-2" />
          <h3 className="text-base font-bold">ক্যাটাগরি ও আইকন পরিবর্তন</h3>
          <p className="text-xs text-orange-100 mt-1">হোমপেজের আইকন এবং বিভাগ সাজান</p>
        </div>

        <div 
          onClick={() => navigate('/adm/subcategories')}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-5 text-white shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all"
        >
          <Tag className="w-6 h-6 mb-2" />
          <h3 className="text-base font-bold">সাবক্যাটাগরি সাজান</h3>
          <p className="text-xs text-blue-100 mt-1">জরুরি, স্বাস্থ্য বা শিক্ষার উপবিভাগ</p>
        </div>

        <div 
          onClick={() => navigate('/adm/settings')}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-5 text-white shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all"
        >
          <TrendingUp className="w-6 h-6 mb-2" />
          <h3 className="text-base font-bold">জরুরি নোটিশ ও সেটিংস</h3>
          <p className="text-xs text-gray-300 mt-1">জরুরি স্ক্রল ব্যানার ও সাইট তথ্য</p>
        </div>
      </div>

      {/* Recent Listings Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">সাম্প্রতিক লিস্টিং সমূহ</h2>
            <p className="text-xs text-gray-500">ডাটাবেজে যুক্ত হওয়া সাম্প্রতিক তথ্য ও সেবা</p>
          </div>
          <button
            onClick={() => navigate('/adm/listings')}
            className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
          >
            সকল লিস্টিং
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 font-semibold">
              <tr>
                <th className="p-3.5">লিস্টিং নাম</th>
                <th className="p-3.5">বিভাগ</th>
                <th className="p-3.5">ফোন নম্বর</th>
                <th className="p-3.5">স্ট্যাটাস</th>
                <th className="p-3.5 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentListings.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50/80">
                  <td className="p-3.5 font-bold text-gray-900 flex items-center gap-2">
                    <img
                      src={l.image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=100&auto=format&fit=crop&q=80'}
                      alt={l.title}
                      className="w-8 h-8 rounded-lg object-cover border"
                      referrerPolicy="no-referrer"
                    />
                    <span className="truncate max-w-[200px]">{l.title}</span>
                  </td>
                  <td className="p-3.5 text-gray-600">{l.subcategory_name || l.category_name || '-'}</td>
                  <td className="p-3.5 font-mono text-gray-700">{l.phone}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        l.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {l.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1">
                    <button
                      onClick={() => navigate(`/listing/${l.slug}`)}
                      className="p-1.5 text-gray-500 hover:text-orange-600 rounded-lg hover:bg-gray-100"
                      title="ওয়েবসাইটে দেখুন"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/adm/listings/edit/${l.id}`)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50"
                      title="সম্পাদনা করুন"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
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
