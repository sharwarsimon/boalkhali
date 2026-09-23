import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Phone, ArrowLeft, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api.js';
import { useData } from '../context/DataContext.js';
import { Listing, Category, Subcategory } from '../types.js';
import { ListingCard } from '../components/common/ListingCard.js';

interface SearchPageProps {
  initialQuery?: string;
  navigate: (path: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ initialQuery = '', navigate }) => {
  const { categories, subcategories } = useData();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUnion, setSelectedUnion] = useState<string>('all');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const unions = [
    'বোয়ালখালী পৌরসভা',
    'কধুরখীল',
    'পশ্চিম গোমদণ্ডী',
    'শাকপুরা',
    'সারোয়াতলী',
    'পোপাদিয়া',
    'আমুচিয়া',
    'চরনদ্বীপ',
    'শ্রীপুর-খরণদ্বীপ',
    'আহল্লা করলডেঙ্গা'
  ];

  const performSearch = async () => {
    setLoading(true);
    try {
      const data = await api.getListings({
        search: query.trim() || undefined,
        categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
        status: 'active'
      });
      setListings(data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch();
  }, [query, selectedCategory]);

  const filteredListings = listings.filter(l => {
    if (selectedUnion === 'all') return true;
    return l.union?.toLowerCase().includes(selectedUnion.toLowerCase()) || 
           l.area?.toLowerCase().includes(selectedUnion.toLowerCase());
  });

  // Also find matching categories and subcategories
  const matchingCategories = query.trim() ? categories.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    (c.name_en && c.name_en.toLowerCase().includes(query.toLowerCase()))
  ) : [];

  const matchingSubcategories = query.trim() ? subcategories.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    (s.name_en && s.name_en.toLowerCase().includes(query.toLowerCase()))
  ) : [];

  return (
    <div className="min-h-screen pb-20">
      {/* Top Search Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-6 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto space-y-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1 text-xs text-orange-100 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            হোম পেজ
          </button>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            বোয়ালখালী পোর্টাল অনুসন্ধান
          </h1>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
            <input
              id="global-search-page-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="কী খুঁজছেন? যেমন: ডাক্তার, পুলিশ, ফায়ার সার্ভিস, বাজার, কানুনগোপাড়া..."
              className="w-full pl-11 pr-4 py-2.5 bg-white text-gray-900 rounded-2xl shadow-md text-sm sm:text-base focus:outline-hidden border border-orange-200"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
        {/* Filters Strip */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
            <Filter className="w-4 h-4 text-orange-600" />
            ফিল্টার:
          </div>

          {/* Category Selector */}
          <select
            id="search-filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-800 focus:outline-hidden focus:border-orange-500"
          >
            <option value="all">সকল ক্যাটাগরি</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Union Selector */}
          <select
            id="search-filter-union"
            value={selectedUnion}
            onChange={(e) => setSelectedUnion(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-800 focus:outline-hidden focus:border-orange-500"
          >
            <option value="all">সকল ইউনিয়ন / এলাকা</option>
            {unions.map((u, i) => (
              <option key={i} value={u}>
                {u}
              </option>
            ))}
          </select>

          {(selectedCategory !== 'all' || selectedUnion !== 'all' || query) && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
                setSelectedUnion('all');
              }}
              className="text-xs text-orange-600 hover:underline font-semibold ml-auto"
            >
              রিসেট
            </button>
          )}
        </div>

        {/* Matched Categories or Subcategories Suggestions */}
        {(matchingCategories.length > 0 || matchingSubcategories.length > 0) && (
          <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-4 space-y-2">
            <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">
              সংশ্লিষ্ট ক্যাটাগরি ও বিভাগ:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {matchingCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/category/${c.slug}`)}
                  className="inline-flex items-center gap-1 bg-white text-orange-700 px-3 py-1 rounded-xl text-xs font-bold border border-orange-200 shadow-2xs hover:bg-orange-600 hover:text-white transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  {c.name}
                </button>
              ))}
              {matchingSubcategories.map((s) => {
                const parent = categories.find((c) => c.id === s.category_id);
                return (
                  <button
                    key={s.id}
                    onClick={() => navigate(`/category/${parent?.slug || 'emergency'}/${s.slug}`)}
                    className="inline-flex items-center gap-1 bg-white text-gray-800 px-3 py-1 rounded-xl text-xs font-bold border border-gray-200 shadow-2xs hover:bg-orange-600 hover:text-white transition-colors"
                  >
                    <Tag className="w-3.5 h-3.5 text-orange-500" />
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>অনুসন্ধান ফলাফল: <strong className="text-gray-900 font-bold">{filteredListings.length}</strong> টি লিস্টিং</span>
        </div>

        {/* Listing Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : filteredListings.length > 0 ? (
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
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">কোনো ফলাফল পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              ভিন্ন কোনো কি-ওয়ার্ড অথবা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
