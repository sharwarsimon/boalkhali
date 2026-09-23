import React, { useRef } from 'react';
import { 
  Newspaper, 
  ChevronRight, 
  ChevronLeft,
  Sparkles, 
  Lamp,
  Shirt,
  Gamepad2,
  Laptop,
  ShoppingBag
} from 'lucide-react';
import { BoalkhaliHeroSlider } from "../components/home/BoalkhaliHeroSlider.js";
import { ProductHorizontalSection } from "../components/home/ProductHorizontalSection.js";
import { 
  STATIC_NEWS, 
  STATIC_PRODUCTS,
} from '../data/staticData.js';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  // Product categories for horizontal showcase sections
  const homeDecorProducts = STATIC_PRODUCTS.filter((p) => p.category === 'home-decor');
  const shirtProducts = STATIC_PRODUCTS.filter((p) => p.category === 'shirt');
  const panjabiProducts = STATIC_PRODUCTS.filter((p) => p.category === 'panjabi');
  const toysProducts = STATIC_PRODUCTS.filter((p) => p.category === 'toys');
  const digitalProducts = STATIC_PRODUCTS.filter((p) => p.category === 'digital-products');

  const newsScrollRef = useRef<HTMLDivElement>(null);
  const scrollNews = (direction: 'left' | 'right') => {
    if (newsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      newsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 1. বোয়ালখালীর বিশেষ আয়োজন (স্লাইডার ফরম্যাট) */}
      <BoalkhaliHeroSlider navigate={navigate} />

      {/* 2. SHOPPING PRODUCT SHOWCASE SECTIONS */}
      {/* 2.1 Home Decor Section (Horizontally scrollable with View All) */}
      <ProductHorizontalSection
        title="Home Decor"
        subtitle="ঘর সাজানোর আকর্ষণীয় হোম ডেকোর ও সামগ্রী"
        categoryId="home-decor"
        icon={Lamp}
        iconBgClass="bg-amber-100 text-amber-700"
        navigate={navigate}
        products={homeDecorProducts}
      />

      {/* 2.2 Shirt Section (Horizontally scrollable with View All) */}
      <ProductHorizontalSection
        title="Shirt"
        subtitle="প্রিমিয়াম কোয়ালিটি ক্যাজুয়াল ও ফর্মাল শার্ট"
        categoryId="shirt"
        icon={Shirt}
        iconBgClass="bg-blue-100 text-blue-700"
        navigate={navigate}
        products={shirtProducts}
      />

      {/* 5.3 Panjabi Section (Horizontally scrollable with View All) */}
      <ProductHorizontalSection
        title="Panjabi"
        subtitle="ঈদ ও উৎসবের এক্সক্লুসিভ ডিজাইনার পাঞ্জাবি কালেকশন"
        categoryId="panjabi"
        icon={Sparkles}
        iconBgClass="bg-emerald-100 text-emerald-700"
        navigate={navigate}
        products={panjabiProducts}
      />

      {/* 5.4 Toys Section (Horizontally scrollable with View All) */}
      <ProductHorizontalSection
        title="Toys"
        subtitle="বাচ্চাদের আকর্ষণীয় খেলনা ও লার্নিং টয়েজ"
        categoryId="toys"
        icon={Gamepad2}
        iconBgClass="bg-purple-100 text-purple-700"
        navigate={navigate}
        products={toysProducts}
      />

      {/* 5.5 Digital Products Section (Horizontally scrollable with View All) */}
      <ProductHorizontalSection
        title="Digital Products"
        subtitle="সফটওয়্যার, ওয়েবসাইট টেমপ্লেট ও ক্যারিয়ার স্কিল কোর্স"
        categoryId="digital-products"
        icon={Laptop}
        iconBgClass="bg-cyan-100 text-cyan-700"
        navigate={navigate}
        products={digitalProducts}
      />

      {/* 6. "সংবাদ" SECTION (At least 3 news items visible simultaneously, reduced text) */}
      <section className="bg-white rounded-3xl p-3 sm:p-4 md:p-5 border border-[#E4E6EB] shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-50 text-[#FA3E3E] flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Newspaper className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-[#050505] truncate">সংবাদ</h2>
              <p className="text-[10px] sm:text-[11px] text-[#65676B] truncate">বোয়ালখালীর গুরুত্বপূর্ণ খবর</p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Scroll buttons (desktop only) */}
            <div className="hidden sm:flex items-center gap-1 mr-1">
              <button
                onClick={() => scrollNews('left')}
                className="w-6 h-6 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                title="পূর্ববর্তী"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollNews('right')}
                className="w-6 h-6 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                title="পরবর্তী"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => navigate('/news')}
              className="text-[11px] sm:text-xs font-bold text-[#FA3E3E] hover:text-red-700 flex items-center gap-0.5 cursor-pointer bg-red-50 hover:bg-red-100 px-2 sm:px-2.5 py-1 rounded-lg transition-colors"
            >
              <span>আরও দেখুন</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Horizontally Scrollable News Cards Carousel - AT LEAST 3 VISIBLE AT ONCE */}
        <div 
          ref={newsScrollRef}
          className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory py-0.5 -mx-1 px-1 sm:mx-0 sm:px-0"
        >
          {STATIC_NEWS.map((news) => (
            <div
              key={news.id}
              className="w-[calc(33.333%-6px)] min-w-[104px] sm:w-[170px] md:w-[220px] shrink-0 snap-start bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 border border-[#E4E6EB] hover:border-[#1877F2] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <div>
                {/* Top Image with Source Badge */}
                <div className="relative h-20 xs:h-24 sm:h-32 w-full rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 mb-1.5">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 bg-white/95 backdrop-blur-xs text-[#FA3E3E] text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                    {news.source || 'বোয়ালখালী'}
                  </div>
                </div>

                {/* News Title (Concise) */}
                <h3 className="font-semibold text-[10px] sm:text-xs text-[#050505] line-clamp-2 leading-tight group-hover:text-[#1877F2] transition-colors">
                  {news.title}
                </h3>

                {/* Date */}
                <div className="text-[8px] sm:text-[10px] text-[#65676B] font-medium mt-1 truncate">
                  {news.date}
                </div>
              </div>

              {/* Compact Read Link */}
              <div className="mt-1.5 pt-1 border-t border-gray-100 text-[9px] sm:text-[11px] font-bold text-[#1877F2] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                <span>পড়ুন &gt;&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. সব প্রোডাক্ট দেখুন বাটন */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1877F2] mx-auto flex items-center justify-center shadow-xs">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#050505]">বোয়ালখালী শপ পণ্যসমূহ</h3>
          <p className="text-xs text-[#65676B] mt-0.5">হোম ডেকোর, পোশাক, খেলনা, ইলেকট্রনিক্স ও গ্যাজেট সহ সকল ক্যাটাগরির সামগ্রী</p>
        </div>
        <div className="pt-1 flex justify-center">
          <button
            id="home-view-all-products-btn"
            onClick={() => navigate('/shop')}
            className="w-full sm:w-auto px-8 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm sm:text-base font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-98"
          >
            <ShoppingBag className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span>সব প্রোডাক্ট দেখুন</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
