import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { api } from '../services/api.js';
import { Category, Subcategory, Listing } from '../types.js';
import { SubcategoryCard } from '../components/common/SubcategoryCard.js';
import { ListingCard } from '../components/common/ListingCard.js';
import { DynamicIcon } from '../components/common/DynamicIcon.js';

interface CategoryPageProps {
  categorySlug: string;
  navigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug, navigate }) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setLoading(true);
      try {
        const data = await api.getCategory(categorySlug);
        setCategory(data);
        setSubcategories(data.subcategories || []);
        setListings(data.listings || []);
      } catch (err) {
        console.error('Failed to load category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [categorySlug]);

  const filteredListings = listings.filter(l => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase().trim();
    return l.title.toLowerCase().includes(q) || 
           (l.short_description && l.short_description.toLowerCase().includes(q)) ||
           l.phone.includes(q) ||
           (l.area && l.area.toLowerCase().includes(q));
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
        <div className="h-32 bg-orange-600 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">ক্যাটাগরি পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-500">অনুরোধকৃত ক্যাটাগরি হয়তো মুছে ফেলা হয়েছে বা সক্রিয় নেই।</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold shadow-xs hover:bg-orange-700"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Category Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-6 sm:py-8 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto space-y-3">
          <button
            id="category-back-btn"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-orange-100 hover:text-white text-xs sm:text-sm font-semibold bg-orange-800/40 px-3 py-1.5 rounded-full border border-orange-400/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </button>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-white text-orange-600 flex items-center justify-center shadow-md shrink-0">
              <DynamicIcon name={category.icon} className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                {category.name}
              </h1>
              {category.name_en && (
                <span className="text-xs sm:text-sm text-orange-100 font-medium block">
                  {category.name_en}
                </span>
              )}
            </div>
          </div>

          {category.description && (
            <p className="text-xs sm:text-sm text-orange-50 max-w-2xl leading-relaxed pt-1">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 space-y-8">
        {/* Subcategories Grid Section */}
        {subcategories.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-gray-900">
              উপ-বিভাগ সমূহ ({subcategories.length})
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3.5">
              {subcategories.map((sub) => (
                <SubcategoryCard
                  key={sub.id}
                  subcategory={sub}
                  categorySlug={category.slug}
                  onClick={() => navigate(`/category/${category.slug}/${sub.slug}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Listings Section under Category */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-200/80 pt-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {category.name} সংক্রান্ত সকল লিস্টিং ({filteredListings.length})
              </h2>
              <p className="text-xs text-gray-500">যেকোনো সেবায় সরাসরি কল বা বিস্তারিত দেখতে ক্লিক করুন</p>
            </div>

            {/* Quick Filter Search */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="তালিকায় খুঁজুন..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500 shadow-2xs"
              />
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => navigate(`/listing/${listing.slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200/80 space-y-2">
              <p className="text-sm font-semibold text-gray-700">কোনো লিস্টিং পাওয়া যায়নি</p>
              <p className="text-xs text-gray-400">এই বিভাগে কোনো তথ্য নেই অথবা ফিল্টারে মিলছে না।</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
