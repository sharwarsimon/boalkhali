import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Image as ImageIcon, 
  CheckCircle2, 
  Star, 
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useData } from '../../context/DataContext.js';
import { Listing } from '../../types.js';

interface AdminListingFormPageProps {
  id?: string; // If present, edit mode
  navigate: (path: string) => void;
}

export const AdminListingFormPage: React.FC<AdminListingFormPageProps> = ({ id, navigate }) => {
  const { categories, subcategories, showToast, refreshData } = useData();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(Boolean(id));

  const [formData, setFormData] = useState<Partial<Listing>>({
    title: '',
    title_en: '',
    slug: '',
    category_id: categories[0]?.id || '',
    subcategory_id: '',
    display_type: 'organization',
    phone: '',
    alt_phone: '',
    email: '',
    website: '',
    address: '',
    area: '',
    union: 'বোয়ালখালী পৌরসভা',
    latitude: 22.3789,
    longitude: 91.9214,
    opening_hours: '২৪ ঘণ্টা খোলা',
    short_description: '',
    description: '',
    image: '',
    gallery: [],
    verified: true,
    featured: false,
    status: 'active',
    sort_order: 1,
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const unions = [
    'বোয়ালখালী পৌরসভা',
    'শাকপুরা',
    'সারোয়াতলী',
    'পোপাদিয়া',
    'চরণদ্বীপ',
    'শ্রীপুর খরণদ্বীপ',
    'আমূচিয়া',
    'আহলা করলডেঙ্গা',
    'কধুরখীল',
    'পশ্চিম গোমদণ্ডী'
  ];

  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        try {
          const data = await api.getListing(id);
          setFormData(data);
        } catch (err) {
          showToast('লিস্টিং লোড করতে ব্যর্থ হয়েছে', 'error');
          navigate('/adm/listings');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchListing();
    }
  }, [id]);

  // When category changes, reset subcategory if not matching
  const filteredSubcats = subcategories.filter(s => s.category_id === formData.category_id);

  useEffect(() => {
    if (!formData.subcategory_id && filteredSubcats.length > 0) {
      setFormData(prev => ({ ...prev, subcategory_id: filteredSubcats[0].id }));
    }
  }, [formData.category_id, filteredSubcats]);

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setFormData({
        ...formData,
        gallery: [...(formData.gallery || []), newGalleryUrl.trim()],
      });
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updated = [...(formData.gallery || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, gallery: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.phone?.trim() || !formData.category_id) {
      showToast('লিস্টিংয়ের বাংলা নাম, ফোন নম্বর ও ক্যাটাগরি আবশ্যক', 'error');
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await api.updateListing(id, formData);
        showToast('লিস্টিং সফলভাবে আপডেট হয়েছে!', 'success');
      } else {
        await api.createListing(formData);
        showToast('নতুন লিস্টিং ডাটাবেজে যুক্ত হয়েছে!', 'success');
      }
      await refreshData();
      navigate('/adm/listings');
    } catch (err: any) {
      showToast(err.message || 'লিস্টিং সংরক্ষণ ব্যর্থ হয়েছে', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-8 text-center text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/adm/listings')}
            className="p-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {id ? 'লিস্টিং সম্পাদনা' : 'নতুন লিস্টিং যুক্ত করুন'}
            </h1>
            <p className="text-xs text-gray-500">
              সঠিক ও যাচাইকৃত তথ্য প্রদান করুন
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            ১. প্রাথমিক তথ্য
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-gray-700">লিস্টিং নাম (বাংলা) *</label>
              <input
                type="text"
                required
                placeholder="যেমন: বোয়ালখালী উপজেলা স্বাস্থ্য কমপ্লেক্স"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">ইংরেজি নাম</label>
              <input
                type="text"
                placeholder="যেমন: Boalkhali Upazila Health Complex"
                value={formData.title_en || ''}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">স্ল্যাগ (URL Identifier)</label>
              <input
                type="text"
                placeholder="যেমন: boalkhali-health-complex"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">প্রধান ক্যাটাগরি *</label>
              <select
                required
                value={formData.category_id || ''}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">উপ-বিভাগ (Subcategory) *</label>
              <select
                required
                value={formData.subcategory_id || ''}
                onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              >
                <option value="">সাবক্যাটাগরি নির্বাচন করুন</option>
                {filteredSubcats.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">লিস্টিং টাইপ (Display Layout)</label>
              <select
                value={formData.display_type || 'organization'}
                onChange={(e) => setFormData({ ...formData, display_type: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              >
                <option value="organization">প্রতিষ্ঠান (Organization)</option>
                <option value="person">ব্যক্তি / ডাক্তার / কর্মকর্তা (Person)</option>
                <option value="service">নাগরিক সেবা (Service)</option>
                <option value="business">ব্যবসা প্রতিষ্ঠান (Business)</option>
                <option value="place">দর্শনীয় স্থান (Place)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">সেবার সময়সূচী (Opening Hours)</label>
              <input
                type="text"
                placeholder="যেমন: ২৪ ঘণ্টা খোলা অথবা সকাল ৯টা - বিকাল ৫টা"
                value={formData.opening_hours || ''}
                onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Location */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            ২. যোগাযোগ ও অবস্থান
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">প্রধান ফোন / হেল্পলাইন নম্বর *</label>
              <input
                type="text"
                required
                placeholder="যেমন: +8801730324789"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">বিকল্প ফোন নম্বর</label>
              <input
                type="text"
                placeholder="যেমন: 031-630222"
                value={formData.alt_phone || ''}
                onChange={(e) => setFormData({ ...formData, alt_phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">ইমেইল</label>
              <input
                type="email"
                placeholder="info@example.com"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">ওয়েবসাইট / ফেসবুক পেইজ</label>
              <input
                type="text"
                placeholder="https://facebook.com/..."
                value={formData.website || ''}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">ইউনিয়ন / পৌরসভা *</label>
              <select
                value={formData.union || unions[0]}
                onChange={(e) => setFormData({ ...formData, union: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              >
                {unions.map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">নির্দিষ্ট এলাকা / গ্রাম</label>
              <input
                type="text"
                placeholder="যেমন: গোমদণ্ডী, কানুনগোপাড়া"
                value={formData.area || ''}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-gray-700">পূর্ণাঙ্গ ঠিকানা</label>
              <input
                type="text"
                placeholder="যেমন: গোমদণ্ডী ফুলতল মোড়, বোয়ালখালী, চট্টগ্রাম"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">অক্ষাংশ (Latitude)</label>
              <input
                type="number"
                step="any"
                value={formData.latitude || 22.3789}
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">দ্রাঘিমাংশ (Longitude)</label>
              <input
                type="number"
                step="any"
                value={formData.longitude || 91.9214}
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Media & Descriptions */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            ৩. মিডিয়া ও বিবরণ
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">মূল ছবি / লোগো (Image URL বা ফাইল আপলোড)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors">
                  <Upload className="w-4 h-4" />
                  আপলোড
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.image && (
                <div className="mt-2 w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 shadow-xs">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>

            {/* Gallery Images */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">গ্যালারি ছবি সমূহ</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="অতিরিক্ত ছবির URL দিন"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="px-3 py-2 bg-gray-800 text-white rounded-xl text-xs font-bold hover:bg-black"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {formData.gallery && formData.gallery.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.gallery.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 group">
                      <img src={img} alt="gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-80 hover:opacity-100"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">সংক্ষিপ্ত বিবরণ (Short Description)</label>
              <input
                type="text"
                placeholder="যেমন: ২৪ ঘণ্টা জরুরি সেবা, গাইনি, সার্জারি ও সাধারণ চিকিৎসা"
                value={formData.short_description || ''}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">পূর্ণাঙ্গ বিবরণ (Full Description)</label>
              <textarea
                rows={5}
                placeholder="লিস্টিংয়ের বিস্তারিত তথ্য, ডাক্তারদের তালিকা, সময়সূচি বা বিশেষ দিকসমূহ..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Flags & Status */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            ৪. বৈশিষ্ট্য ও স্ট্যাটাস
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-2.5 p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.verified ?? true}
                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <div className="text-xs font-bold text-gray-900">যাচাইকৃত (Verified)</div>
                <div className="text-[10px] text-gray-500">নীল টিক ব্যাজ প্রদর্শন করবে</div>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured ?? false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <div>
                <div className="text-xs font-bold text-gray-900">ফিচার্ড (Featured)</div>
                <div className="text-[10px] text-gray-500">হোমপেজের শীর্ষে প্রদর্শিত হবে</div>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === 'active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'active' : 'inactive' })}
                className="w-4 h-4 text-green-600 rounded"
              />
              <div>
                <div className="text-xs font-bold text-gray-900">সক্রিয় স্ট্যাটাস (Active)</div>
                <div className="text-[10px] text-gray-500">ওয়েবসাইটে দৃশ্যমান থাকবে</div>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/adm/listings')}
            className="px-5 py-3 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            বাতিল করুন
          </button>

          <button
            id="listing-form-save-btn"
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'সংরক্ষণ হচ্ছে...' : 'লিস্টিং সংরক্ষণ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
};
