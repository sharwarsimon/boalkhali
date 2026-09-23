import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, LayoutList, LayoutGrid, PlusCircle } from 'lucide-react';
import { api } from '../services/api.js';
import { Subcategory, Category, Listing } from '../types.js';
import { ListingCard } from '../components/common/ListingCard.js';
import { DynamicIcon } from '../components/common/DynamicIcon.js';

interface SubcategoryPageProps {
  categorySlug: string;
  subcategorySlug: string;
  navigate: (path: string) => void;
}

export const SubcategoryPage: React.FC<SubcategoryPageProps> = ({
  categorySlug,
  subcategorySlug,
  navigate,
}) => {
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      setLoading(true);
      try {
        const data = await api.getSubcategory(subcategorySlug, categorySlug);
        setSubcategory(data);
        setCategory(data.category || null);
        setListings(data.listings || []);
      } catch (err) {
        console.error('Failed to load subcategory:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryData();
  }, [categorySlug, subcategorySlug]);

  const filteredListings = listings.filter((l) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase().trim();
    return (
      l.title.toLowerCase().includes(q) ||
      (l.short_description && l.short_description.toLowerCase().includes(q)) ||
      l.phone.includes(q) ||
      (l.area && l.area.toLowerCase().includes(q))
    );
  });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <div className="h-24 bg-orange-500 rounded-3xl animate-pulse" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-2xl animate-pulse border border-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  if (!subcategory) {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">উপ-বিভাগ পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-500">অনুরোধকৃত বিভাগটি বর্তমানে উপলব্ধ নেই।</p>
        <button
          onClick={() => navigate(`/category/${categorySlug}`)}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold shadow-xs hover:bg-orange-700"
        >
          ক্যাটাগরিতে ফিরে যান
        </button>
      </div>
    );
  }

  const pageHeaderTitle = subcategory.name_en ? `${subcategory.name_en} List` : `${subcategory.name} তালিকা`;

  return (
    <div className="min-h-screen pb-16 bg-[#F3F4F6]">
      {/* High Density Top App Bar matching Screenshot 3 */}
      <div className="bg-[#FF9800] text-white py-3.5 px-4 shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              id="subcat-back-btn"
              onClick={() => navigate(`/category/${categorySlug}`)}
              className="p-1.5 -ml-1 text-white hover:bg-orange-600 rounded-full transition-colors active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {pageHeaderTitle}
            </h1>
          </div>

          {/* Right Action: Add Listing shortcut */}
          <button
            id="subcat-add-listing-shortcut"
            onClick={() => navigate('/add-listing')}
            className="flex items-center gap-1 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">লিস্টিং যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-3">
        {/* Search & View Switcher Bar */}
        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-200/90 shadow-2xs flex items-center justify-between gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              id="subcat-listing-search"
              type="text"
              placeholder={`${subcategory.name} এ সার্চ করুন...`}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl shrink-0">
            <button
              id="view-mode-list-btn"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-orange-600 shadow-2xs' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="লিস্ট ভিউ"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              id="view-mode-card-btn"
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'card' ? 'bg-white text-orange-600 shadow-2xs' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="কার্ড ভিউ"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Listings in High Density Layout */}
        {filteredListings.length > 0 ? (
          viewMode === 'list' ? (
            <div className="space-y-2">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  variant="list"
                  onClick={() => navigate(`/listing/${listing.slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  variant="card"
                  onClick={() => navigate(`/listing/${listing.slug}`)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-200/90 space-y-3 mt-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">কোনো তথ্য বা লিস্টিং পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {searchFilter ? 'আপনার সার্চের সাথে কোনো ফলাফল মেলেনি।' : 'এই উপ-বিভাগে এখনো কোনো লিস্টিং যুক্ত করা হয়নি। আপনি চাইলে নতুন লিস্টিং যোগ করতে পারেন।'}
            </p>
            <button
              onClick={() => navigate('/add-listing')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-orange-700 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              নতুন লিস্টিং যুক্ত করুন
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

