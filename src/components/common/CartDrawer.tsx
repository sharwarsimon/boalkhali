import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext.js';

interface CartDrawerProps {
  navigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ navigate }) => {
  const { cart, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, showToast } = useData();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedUnion, setSelectedUnion] = useState('শাকপুরা');

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      showToast('অনুগ্রহ করে নাম, ফোন ও ঠিকানা পূরণ করুন', 'error');
      return;
    }

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      setOrderPlaced(false);
      setIsCartOpen(false);
      showToast('আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে! শীঘ্রই প্রতিনিধি যোগাযোগ করবেন।', 'success');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-[#E4E6EB] flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1877F2] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#050505]">আমার শপিং ব্যাগ</h3>
                <p className="text-[11px] text-[#65676B]">{cart.length} টি পণ্য যোগ করা হয়েছে</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-gray-200 text-[#65676B] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {orderPlaced ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#050505]">অর্ডার সফল হয়েছে!</h3>
                <p className="text-xs text-[#65676B]">
                  ধন্যবাদ, {customerName}। বোয়ালখালী শপ থেকে শীঘ্রই আপনার মোবাইল <span className="font-bold font-mono text-[#050505]">{customerPhone}</span> এ কনফার্মেশন কল করা হবে।
                </p>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                  <span className="font-bold block">ক্যাশ অন ডেলিভারি (হোম ডেলিভারি)</span>
                  <p className="text-[11px] text-blue-700">পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন। বোয়ালখালী উপজেলাজুড়ে দ্রুত ডেলিভারি।</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="font-bold text-[#050505] block mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="যেমন: মো. তারেক"
                      className="w-full p-2.5 rounded-xl border border-[#CED0D4] bg-[#F0F2F5] text-xs focus:bg-white focus:outline-[#1877F2]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#050505] block mb-1">মোবাইল নাম্বার *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="018XXXXXXXX"
                      className="w-full p-2.5 rounded-xl border border-[#CED0D4] bg-[#F0F2F5] text-xs font-mono focus:bg-white focus:outline-[#1877F2]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#050505] block mb-1">ইউনিয়ন নির্বাচন করুন</label>
                    <select
                      value={selectedUnion}
                      onChange={(e) => setSelectedUnion(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#CED0D4] bg-[#F0F2F5] text-xs focus:bg-white focus:outline-[#1877F2]"
                    >
                      <option value="বোয়ালখালী পৌরসভা">বোয়ালখালী পৌরসভা</option>
                      <option value="কধুরখীল">১নং কধুরখীল</option>
                      <option value="পশ্চিম গোমদণ্ডী">২নং পশ্চিম গোমদণ্ডী</option>
                      <option value="শাকপুরা">৪নং শাকপুরা</option>
                      <option value="সারোয়াতলী">৫নং সারোয়াতলী</option>
                      <option value="পোপাদিয়া">৬নং পোপাদিয়া</option>
                      <option value="আমুচিয়া">৭নং আমুচিয়া</option>
                      <option value="চরনদ্বীপ">৮নং চরনদ্বীপ</option>
                      <option value="শ্রীপুর-খরণদ্বীপ">৯নং শ্রীপুর-খরণদ্বীপ</option>
                      <option value="আহল্লা করলডেঙ্গা">১০নং আহল্লা করলডেঙ্গা</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#050505] block mb-1">গ্রাম ও বিস্তারিত ঠিকানা *</label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="ওয়ার্ড নং, বাড়ির নাম বা পরিচিত স্থান..."
                      className="w-full p-2.5 rounded-xl border border-[#CED0D4] bg-[#F0F2F5] text-xs focus:bg-white focus:outline-[#1877F2]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[#CED0D4] text-xs font-bold text-[#65676B] hover:bg-gray-100 cursor-pointer"
                  >
                    ব্যাগে ফিরুন
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>অর্ডার নিশ্চিত করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#65676B] space-y-3">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#050505]">কার্ট খালি</h4>
                  <p className="text-xs mt-1">আপনার ব্যাগে এখনো কোনো পণ্য যোগ করেননি।</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-[#1877F2] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  শপ ব্রাউজ করুন
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3 bg-[#F0F2F5] rounded-xl border border-[#E4E6EB] flex items-center gap-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-white border border-[#E4E6EB] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#050505] line-clamp-1">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#1877F2]">৳{product.price}</span>
                        <span className="text-[10px] text-[#65676B]">({product.unit})</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 bg-white border border-[#CED0D4] rounded-lg px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 hover:text-red-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 hover:text-[#1877F2] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#050505]">
                          ৳{product.price * quantity}
                        </span>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#65676B] hover:text-red-600 p-1 cursor-pointer"
                          title="সরান"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Actions */}
          {!orderPlaced && !isCheckingOut && cart.length > 0 && (
            <div className="p-4 border-t border-[#E4E6EB] bg-slate-50 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#65676B] font-semibold">সর্বমোট মূল্য:</span>
                <span className="text-base sm:text-lg font-black text-[#1877F2]">৳{cartTotal}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-2.5 border border-[#CED0D4] hover:bg-gray-100 rounded-xl text-xs font-bold text-[#65676B] cursor-pointer"
                >
                  খালি করুন
                </button>
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="flex-1 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>চেকআউট করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
