import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  Plus, 
  Check, 
  Tag, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Eye, 
  X, 
  ArrowRight 
} from 'lucide-react';
import { STATIC_SHOP_CATEGORIES, STATIC_PRODUCTS, Product } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface ShopPageProps {
  navigate: (path: string) => void;
  initialCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ navigate, initialCategory }) => {
  const { addToCart, setIsCartOpen, showToast } = useData();
  
  // Extract category from query parameter if present
  const getInitialCategory = () => {
    if (initialCategory) return initialCategory;
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('category');
      if (param) return param;
    }
    return 'all';
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(getInitialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Sync category if initialCategory changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    } else if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('category');
      if (param) {
        setSelectedCategory(param);
      }
    }
  }, [initialCategory]);

  const currentCategoryObj = STATIC_SHOP_CATEGORIES.find((c) => c.id === selectedCategory);

  const filteredProducts = STATIC_PRODUCTS.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Top Search & Highlights Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#E4E6EB] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#050505]">বোয়ালখালী অনলাইন শপ</h1>
              <p className="text-xs text-[#65676B]">স্থানীয় বিখ্যাত ফলমূল, খাঁটি খাবার ও নিত্যপ্রয়োজনীয় পণ্য সরাসরি বাসায়</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য বা আইটেম খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:outline-[#1877F2]"
            />
          </div>
        </div>

        {/* 1. HORIZONTALLY SCROLLABLE ROUND SHAPE CATEGORY ICONS */}
        <div className="pt-2 border-t border-[#E4E6EB]">
          <h3 className="text-xs font-bold text-[#65676B] mb-3">ক্যাটাগরি ব্রাউজ করুন:</h3>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 px-1">
            {STATIC_SHOP_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
                >
                  {/* Round Shaped Category Image Container */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden p-0.5 transition-all duration-200 ${
                      isSelected
                        ? 'ring-3 ring-[#1877F2] ring-offset-2 scale-105 shadow-sm'
                        : 'border-2 border-gray-200 group-hover:border-[#1877F2] group-hover:scale-105'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full rounded-full object-cover bg-gray-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs font-semibold whitespace-nowrap text-center ${
                      isSelected ? 'font-bold text-[#1877F2]' : 'text-[#050505] group-hover:text-[#1877F2]'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Active Header & Controls Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E4E6EB] shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-xs text-[#65676B]">
            <span 
              onClick={() => navigate('/')} 
              className="hover:text-[#1877F2] cursor-pointer hover:underline"
            >
              হোম
            </span>
            <span className="mx-1.5">/</span>
            <span 
              onClick={() => setSelectedCategory('all')} 
              className="hover:text-[#1877F2] cursor-pointer hover:underline"
            >
              শপ
            </span>
            {selectedCategory !== 'all' && currentCategoryObj && (
              <>
                <span className="mx-1.5">/</span>
                <span className="font-bold text-[#1877F2]">
                  {currentCategoryObj.name}
                </span>
              </>
            )}
          </div>

          <div className="bg-blue-50 text-[#1877F2] font-bold text-xs px-2.5 py-0.5 rounded-full border border-blue-200">
            {selectedCategory === 'all' 
              ? `মোট ${filteredProducts.length} টি পণ্য`
              : `${currentCategoryObj?.name || selectedCategory}: ${filteredProducts.length} টি পণ্য`}
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-[11px] font-bold text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
            >
              ফিল্টার মুছুন ✕
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-gray-500 font-medium">সর্ট করুন:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-700 focus:outline-[#1877F2] cursor-pointer"
          >
            <option value="featured">জনপ্রিয় (Featured)</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="rating">সেরা রেটিং (Top Rated)</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl p-6 border border-[#E4E6EB] text-[#65676B] space-y-2">
            <ShoppingBag className="w-10 h-10 mx-auto text-gray-300" />
            <p className="font-bold text-sm text-[#050505]">কোনো পণ্য পাওয়া যায়নি</p>
            <p className="text-xs">অন্য কোনো ক্যাটাগরি নির্বাচন করুন।</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Product Image + Discount Badge */}
                <div 
                  onClick={() => setActiveProduct(product)}
                  className="relative h-36 sm:h-44 w-full overflow-hidden bg-gray-100 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {product.discountPercent && (
                    <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                      {product.discountPercent}% ছাড়
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {product.unit}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-1 text-[10px] text-[#65676B]">
                    <span className="truncate">{product.seller}</span>
                    <div className="flex items-center gap-0.5 font-bold text-amber-600 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => setActiveProduct(product)}
                    className="font-bold text-xs sm:text-sm text-[#050505] line-clamp-2 leading-snug group-hover:text-[#1877F2] cursor-pointer transition-colors"
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-sm sm:text-base font-black text-[#1877F2]">
                      ৳{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ৳{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="p-3 pt-0">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 bg-blue-50 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-blue-200 hover:border-transparent rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>কার্টে যোগ করুন</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Product Quick View / Detail Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-12">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveProduct(null)}
          />

          <div className="relative mx-auto max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#E4E6EB] flex items-center justify-between bg-slate-50">
              <span className="text-xs font-bold text-[#1877F2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                পণ্যের বিস্তারিত
              </span>
              <button
                onClick={() => setActiveProduct(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-200 text-[#65676B] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {activeProduct.discountPercent && (
                  <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-md">
                    {activeProduct.discountPercent}% ছাড়
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#050505]">
                  {activeProduct.name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-[#65676B] mt-1">
                  <span>বিক্রেতা: <strong className="text-[#050505]">{activeProduct.seller}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {activeProduct.rating} ({activeProduct.reviewsCount} রিভিউ)
                  </span>
                </div>
              </div>

              {/* Price & Unit */}
              <div className="bg-[#F0F2F5] p-3.5 rounded-xl border border-[#E4E6EB] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#65676B] block">মূল্য:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#1877F2]">৳{activeProduct.price}</span>
                    {activeProduct.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">৳{activeProduct.originalPrice}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#65676B] block">পরিমাণ / ইউনিট:</span>
                  <span className="font-bold text-xs text-[#050505]">{activeProduct.unit}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 text-xs leading-relaxed text-[#65676B]">
                <strong className="text-[#050505] block">বিবরণ:</strong>
                <p>{activeProduct.description}</p>
              </div>

              {/* Delivery Info */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{activeProduct.deliveryTime} (ক্যাশ অন ডেলিভারি)</span>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    addToCart(activeProduct);
                    setActiveProduct(null);
                  }}
                  className="flex-1 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>কার্টে যোগ করুন</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
