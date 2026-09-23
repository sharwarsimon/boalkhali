import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  PhoneCall, 
  MapPin, 
  Globe, 
  Mail, 
  Clock, 
  Share2, 
  MessageSquare, 
  CheckCircle2, 
  Navigation, 
  Bookmark, 
  Star, 
  Eye, 
  Copy, 
  Check, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.js';
import { useData } from '../context/DataContext.js';
import { Listing, Category, Subcategory } from '../types.js';
import { ListingCard } from '../components/common/ListingCard.js';
import { LeafletMap } from '../components/common/LeafletMap.js';

interface ListingDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ slug, navigate }) => {
  const { user } = useAuth();
  const { showToast } = useData();
  const [listing, setListing] = useState<Listing | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [relatedListings, setRelatedListings] = useState<Listing[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const data = await api.getListing(slug);
        setListing(data);
        setCategory(data.category || null);
        setSubcategory(data.subcategory || null);
        setIsBookmarked(Boolean(data.is_bookmarked));
        setRelatedListings(data.related || []);
      } catch (err) {
        console.error('Error fetching listing details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  const handleBookmarkToggle = async () => {
    if (!user) {
      showToast('বুকমার্ক করতে অনুগ্রহ করে প্রথমে লগইন করুন', 'info');
      navigate('/login');
      return;
    }

    if (!listing) return;

    try {
      const res = await api.toggleBookmark(listing.id);
      setIsBookmarked(res.bookmarked);
      showToast(res.bookmarked ? 'বুকমার্কে যুক্ত করা হয়েছে' : 'বুকমার্ক সরানো হয়েছে', 'success');
    } catch (err) {
      showToast('বুকমার্ক পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing?.title || 'Boalkhali.com',
          text: listing?.short_description || 'বোয়ালখালী ডিরেক্টরি',
          url: window.location.href,
        });
      } catch {
        // Fallback to copy
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('লিংক কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleChat = async () => {
    if (!user) {
      showToast('চ্যাট করতে অনুগ্রহ করে লগইন করুন', 'info');
      navigate('/login');
      return;
    }

    try {
      const initialMessage = `নমস্কার / আসসালামু আলাইকুম। আমি "${listing?.title}" সম্পর্কে তথ্য জানতে যোগাযোগ করছি।`;
      const res = await api.startConversation(listing?.created_by || 'usr_admin_simo', initialMessage);
      navigate(`/chat?conv=${res.conversationId}`);
    } catch (err) {
      navigate('/chat');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="h-64 bg-gray-200 rounded-3xl animate-pulse" />
        <div className="h-32 bg-white rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">লিস্টিং পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-500">অনুরোধকৃত তথ্যটি হয়তো সরিয়ে ফেলা হয়েছে।</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold shadow-xs hover:bg-orange-700"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  const allImages = [listing.image, ...(listing.gallery || [])].filter(Boolean);

  return (
    <div className="min-h-screen pb-20">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <button onClick={() => navigate('/')} className="hover:text-orange-600">
              হোম
            </button>
            {category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                <button onClick={() => navigate(`/category/${category.slug}`)} className="hover:text-orange-600">
                  {category.name}
                </button>
              </>
            )}
            {category && subcategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                <button
                  onClick={() => navigate(`/category/${category.slug}/${subcategory.slug}`)}
                  className="hover:text-orange-600 truncate max-w-[120px]"
                >
                  {subcategory.name}
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="detail-bookmark-btn"
              onClick={handleBookmarkToggle}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-orange-50 border-orange-200 text-orange-600'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-orange-600'
              }`}
              title="বুকমার্ক"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-orange-600' : ''}`} />
            </button>

            <button
              id="detail-share-btn"
              onClick={handleShare}
              className="p-2 rounded-xl border bg-gray-50 border-gray-200 text-gray-600 hover:text-orange-600 transition-colors"
              title="শেয়ার করুন"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
        {/* Main Hero Card with Cover & Profile */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
          {/* Cover image if available */}
          <div className="relative h-48 sm:h-72 w-full bg-gray-100 overflow-hidden">
            <img
              src={listing.image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&auto=format&fit=crop&q=80'}
              alt={listing.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges in top right */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {listing.verified && (
                <span className="inline-flex items-center gap-1 bg-white/95 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
                  যাচাইকৃত
                </span>
              )}
              {listing.featured && (
                <span className="inline-flex items-center gap-1 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  ফিচার্ড
                </span>
              )}
            </div>
          </div>

          {/* Body Info */}
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                {subcategory && (
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg">
                    {subcategory.name}
                  </span>
                )}
                {category && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                    {category.name}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 leading-snug pt-1">
                {listing.title}
              </h1>

              {listing.title_en && (
                <span className="text-sm text-gray-500 font-medium">
                  {listing.title_en}
                </span>
              )}
            </div>

            {listing.short_description && (
              <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                {listing.short_description}
              </p>
            )}

            {/* Action Buttons Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-gray-100">
              {listing.phone && (
                <a
                  id="detail-call-action-btn"
                  href={`tel:${listing.phone}`}
                  className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white py-3 px-4 rounded-2xl font-bold text-sm shadow-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  কল করুন
                </a>
              )}

              {listing.latitude && listing.longitude && (
                <a
                  id="detail-directions-action-btn"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${listing.latitude},${listing.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-2xl font-bold text-sm shadow-sm transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  দিকনির্দেশনা
                </a>
              )}

              <button
                id="detail-chat-action-btn"
                onClick={handleChat}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-2xl font-bold text-sm shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                মেসেজ পাঠান
              </button>

              {listing.website && (
                <a
                  id="detail-website-action-btn"
                  href={listing.website.startsWith('http') ? listing.website : `https://${listing.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-2xl font-bold text-sm transition-all"
                >
                  <Globe className="w-4 h-4" />
                  ওয়েবসাইট
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Details & Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left 2 Cols: Description, Gallery, Map */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            {listing.description && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-600" />
                  বিস্তারিত বিবরণ
                </h3>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {allImages.length > 1 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-gray-900">ছবি গ্যালারি ({allImages.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {allImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className="h-28 rounded-2xl overflow-hidden cursor-pointer border border-gray-200 hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Map */}
            {listing.latitude && listing.longitude && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    মানচিত্রে অবস্থান
                  </h3>
                  <span className="text-xs text-gray-500">বোয়ালখালী, চট্টগ্রাম</span>
                </div>
                <LeafletMap
                  latitude={listing.latitude}
                  longitude={listing.longitude}
                  title={listing.title}
                  address={listing.address}
                />
              </div>
            )}
          </div>

          {/* Right Col: Contact & Meta Information Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                যোগাযোগের তথ্য
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 font-semibold uppercase">প্রধান মোবাইল / ফোন</div>
                    <a
                      href={`tel:${listing.phone}`}
                      className="font-mono font-bold text-gray-900 hover:text-orange-600"
                    >
                      {listing.phone}
                    </a>
                  </div>
                </div>

                {/* Alt Phone */}
                {listing.alt_phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-semibold uppercase">বিকল্প ফোন / হেল্পলাইন</div>
                      <a
                        href={`tel:${listing.alt_phone}`}
                        className="font-mono font-bold text-gray-900 hover:text-orange-600"
                      >
                        {listing.alt_phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {listing.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] text-gray-400 font-semibold uppercase">ইমেইল</div>
                      <a
                        href={`mailto:${listing.email}`}
                        className="font-medium text-gray-900 hover:text-orange-600 break-all"
                      >
                        {listing.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Address */}
                {listing.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-semibold uppercase">ঠিকানা ও এলাকা</div>
                      <div className="font-medium text-gray-900">{listing.address}</div>
                      <div className="text-gray-500 text-xs">
                        {listing.area ? `${listing.area}, ` : ''}{listing.union}
                      </div>
                    </div>
                  </div>
                )}

                {/* Opening Hours */}
                {listing.opening_hours && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-semibold uppercase">সেবার সময়সূচী</div>
                      <div className="font-medium text-gray-900">{listing.opening_hours}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        {relatedListings.length > 0 && (
          <section className="space-y-4 pt-6">
            <h2 className="text-lg font-bold text-gray-900">সম্পর্কিত অন্যান্য সেবা</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedListings.map((rel) => (
                <ListingCard
                  key={rel.id}
                  listing={rel}
                  onClick={() => navigate(`/listing/${rel.slug}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox for Gallery */}
      {activeGalleryIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveGalleryIndex(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh]">
            <img
              src={allImages[activeGalleryIndex]}
              alt="Gallery item"
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setActiveGalleryIndex(null)}
              className="absolute top-3 right-3 text-white bg-black/60 rounded-full p-2 hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
