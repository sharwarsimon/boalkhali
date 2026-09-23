import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  CheckCircle2, 
  Star, 
  FileText, 
  AlertCircle, 
  ExternalLink 
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useData } from '../../context/DataContext.js';
import { Listing } from '../../types.js';

interface AdminListingsPageProps {
  navigate: (path: string) => void;
}

export const AdminListingsPage: React.FC<AdminListingsPageProps> = ({ navigate }) => {
  const { categories, subcategories, showToast } = useData();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedSubcat, setSelectedSubcat] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const data = await api.getListings({
        categoryId: selectedCat !== 'all' ? selectedCat : undefined,
        subcategoryId: selectedSubcat !== 'all' ? selectedSubcat : undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        search: searchQuery.trim() || undefined,
      });
      setListings(data);
    } catch (err) {
      console.error('Failed to load listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [selectedCat, selectedSubcat, selectedStatus, searchQuery]);

  const handleToggleStatus = async (l: Listing) => {
    const newStatus = l.status === 'active' ? 'inactive' : 'active';
    try {
      await api.updateListing(l.id, { status: newStatus });
      setListings(listings.map(item => item.id === l.id ? { ...item, status: newStatus } : item));
      showToast(`লিস্টিং ${newStatus === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`, 'success');
    } catch (err) {
      showToast('স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleToggleVerified = async (l: Listing) => {
    try {
      await api.updateListing(l.id, { verified: !l.verified });
      setListings(listings.map(item => item.id === l.id ? { ...item, verified: !l.verified } : item));
      showToast(l.verified ? 'যাচাইকরণ সরানো হয়েছে' : 'লিস্টিং যাচাইকৃত করা হয়েছে', 'success');
    } catch (err) {
      showToast('যাচাইকরণ পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleToggleFeatured = async (l: Listing) => {
    try {
      await api.updateListing(l.id, { featured: !l.featured });
      setListings(listings.map(item => item.id === l.id ? { ...item, featured: !l.featured } : item));
      showToast(l.featured ? 'ফিচার্ড থেকে সরানো হয়েছে' : 'ফিচার্ড লিস্টিং এ যুক্ত করা হয়েছে', 'success');
    } catch (err) {
      showToast('ফিচার্ড পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const duplicated = await api.duplicateListing(id);
      setListings([duplicated, ...listings]);
      showToast('লিস্টিং সফলভাবে ডুপ্লিকেট করা হয়েছে!', 'success');
    } catch (err) {
      showToast('ডুপ্লিকেট ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteListing(id);
      setListings(listings.filter(l => l.id !== id));
      setDeleteConfirmId(null);
      showToast('লিস্টিং মুছে ফেলা হয়েছে', 'success');
    } catch (err) {
      showToast('মুছে ফেলা ব্যর্থ হয়েছে', 'error');
    }
  };

  const filteredSubcatsForFilter = selectedCat === 'all'
    ? subcategories
    : subcategories.filter(s => s.category_id === selectedCat);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-600" />
            লিস্টিং ব্যবস্থাপনা ({listings.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            বোয়ালখালী পোর্টালের সকল নাগরিক সেবা, প্রতিষ্ঠান, ডাক্তার ও ব্যবসায়িক তথ্য পরিচালনা করুন
          </p>
        </div>

        <button
          id="add-new-listing-btn"
          onClick={() => navigate('/adm/listings/add')}
          className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          নতুন লিস্টিং যুক্ত করুন
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="লিস্টিং খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500 focus:bg-white"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCat}
              onChange={(e) => {
                setSelectedCat(e.target.value);
                setSelectedSubcat('all');
              }}
              className="w-full py-2 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500"
            >
              <option value="all">সকল ক্যাটাগরি</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <select
              value={selectedSubcat}
              onChange={(e) => setSelectedSubcat(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500"
            >
              <option value="all">সকল সাবক্যাটাগরি</option>
              {filteredSubcatsForFilter.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500"
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="active">সক্রিয় (Active)</option>
              <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4">ছবি ও নাম</th>
                <th className="p-4">বিভাগ</th>
                <th className="p-4">ফোন ও এলাকা</th>
                <th className="p-4 text-center">যাচাইকৃত</th>
                <th className="p-4 text-center">ফিচার্ড</th>
                <th className="p-4 text-center">স্ট্যাটাস</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    লোড হচ্ছে...
                  </td>
                </tr>
              ) : listings.length > 0 ? (
                listings.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Image & Title */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={l.image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=100&auto=format&fit=crop&q=80'}
                          alt={l.title}
                          className="w-10 h-10 rounded-xl object-cover border shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 truncate max-w-[200px]">{l.title}</div>
                          {l.title_en && <div className="text-[11px] text-gray-400 truncate max-w-[200px]">{l.title_en}</div>}
                        </div>
                      </div>
                    </td>

                    {/* Category & Subcategory */}
                    <td className="p-4">
                      <div className="font-semibold text-gray-800 text-xs">{l.subcategory_name || '-'}</div>
                      <div className="text-[11px] text-gray-400">{l.category_name}</div>
                    </td>

                    {/* Phone & Area */}
                    <td className="p-4">
                      <div className="font-mono text-gray-900 text-xs font-bold">{l.phone}</div>
                      <div className="text-[11px] text-gray-500 truncate max-w-[150px]">{l.area || l.union}</div>
                    </td>

                    {/* Verified Toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleVerified(l)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          l.verified
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'bg-gray-50 border-gray-200 text-gray-300 hover:text-gray-400'
                        }`}
                        title="যাচাইকৃত টগল করুন"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(l)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          l.featured
                            ? 'bg-amber-50 border-amber-200 text-amber-500'
                            : 'bg-gray-50 border-gray-200 text-gray-300 hover:text-gray-400'
                        }`}
                        title="ফিচার্ড টগল করুন"
                      >
                        <Star className={`w-4 h-4 ${l.featured ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* Status Toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(l)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          l.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {l.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/listing/${l.slug}`)}
                        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        title="ওয়েবসাইটে দেখুন"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/adm/listings/edit/${l.id}`)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="সম্পাদনা"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(l.id)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="ডুপ্লিকেট করুন"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(l.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    কোনো লিস্টিং পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">লিস্টিং মুছে ফেলতে চান?</h3>
            <p className="text-xs text-gray-500">
              মুছে ফেললে এটি ওয়েবসাইট ও সার্চ থেকে অবিলম্বে সরিয়ে নেওয়া হবে।
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-700"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
