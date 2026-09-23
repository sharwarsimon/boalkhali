import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useData } from '../../context/DataContext.js';

export const FloatingCartButton: React.FC = () => {
  const { cartCount, cartTotal, setIsCartOpen } = useData();

  return (
    <aside aria-label="Floating cart widget" className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none">
      <button
        id="floating-cart-btn"
        onClick={() => setIsCartOpen(true)}
        className="group relative flex flex-col items-center justify-center py-3 px-2 sm:px-2.5 rounded-l-2xl rounded-r-none bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-2xl hover:shadow-blue-500/30 border-l-2 border-y-2 border-r-0 border-white/90 transition-all duration-200 hover:-translate-x-1 active:translate-x-0 cursor-pointer"
        aria-label={`শপিং ব্যাগ (${cartCount} টি পণ্য)`}
        title="শপিং ব্যাগ দেখুন"
      >
        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <span className="absolute -top-2.5 -left-2 bg-red-600 text-white text-[10px] sm:text-[11px] font-black min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center shadow-md animate-bounce border border-white">
            {cartCount}
          </span>
        )}

        {/* Shopping Bag Icon */}
        <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform group-hover:scale-110" />

        {/* Label / Price */}
        <span className="text-xs font-bold mt-1 tracking-tight whitespace-nowrap">
          {cartCount > 0 ? `৳${cartTotal}` : 'কার্ট'}
        </span>

        {/* Hover Tooltip on desktop */}
        <span className="absolute right-full mr-2 px-2.5 py-1 bg-gray-900/90 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md hidden sm:block">
          {cartCount > 0 ? `কার্টে ${cartCount} টি পণ্য আছে (৳${cartTotal})` : 'শপিং ব্যাগ খালি'}
        </span>
      </button>
    </aside>
  );
};
