import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Tag, 
  Filter, 
  X, 
  AlertCircle 
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useData } from '../../context/DataContext.js';
import { Subcategory, Category } from '../../types.js';
import { DynamicIcon, AVAILABLE_LUCIDE_ICONS } from '../../components/common/DynamicIcon.js';

export const AdminSubcategoriesPage: React.FC = () => {
  const { categories, subcategories, refreshData, showToast } = useData();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [editingSubcategory, setEditingSubcategory] = useState<Partial<Subcategory> | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredSubcategories = subcategories.filter((s) => {
    if (selectedCategoryFilter === 'all') return true;
    return s.category_id === selectedCategoryFilter;
  });

  const handleOpenAdd = () => {
    const defaultCatId = selectedCategoryFilter !== 'all' ? selectedCategoryFilter : (categories[0]?.id || '');
    setEditingSubcategory({
      category_id: defaultCatId,
      name: '',
      name_en: '',
      slug: '',
      icon: 'Shield',
      description: '',
      status: 'active',
      sort_order: subcategories.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (sub: Subcategory) => {
    setEditingSubcategory({ ...sub });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubcategory?.name?.trim() || !editingSubcategory.category_id) {
      showToast('সাবক্যাটাগরির নাম ও প্রধান ক্যাটাগরি আবশ্যক', 'error');
      return;
    }

    setLoading(true);
    try {
      if (editingSubcategory.id) {
        await api.updateSubcategory(editingSubcategory.id, editingSubcategory);
        showToast('সাবক্যাটাগরি সফলভাবে আপডেট হয়েছে', 'success');
      } else {
        await api.createSubcategory(editingSubcategory);
        showToast('নতুন সাবক্যাটাগরি তৈরি হয়েছে', 'success');
      }
      setModalOpen(false);
      setEditingSubcategory(null);
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'সংরক্ষণ ব্যর্থ হয়েছে', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await api.deleteSubcategory(id);
      showToast('সাবক্যাটাগরি মুছে ফেলা হয়েছে', 'success');
      setDeleteConfirmId(null);
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'মুছে ফেলা ব্যর্থ হয়েছে', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (sub: Subcategory) => {
    try {
      const newStatus = sub.status === 'active' ? 'inactive' : 'active';
      await api.updateSubcategory(sub.id, { status: newStatus });
      await refreshData();
      showToast(`সাবক্যাটাগরি ${newStatus === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`, 'success');
    } catch (err) {
      showToast('স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <Tag className="w-6 h-6 text-orange-600" />
            সাবক্যাটাগরি ব্যবস্থাপনা ({subcategories.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            বিভিন্ন প্রধান ক্যাটাগরির অধীনে উপ-বিভাগ এবং আইকন পরিচালনা করুন
          </p>
        </div>

        <button
          id="add-subcategory-btn"
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          নতুন সাবক্যাটাগরি যুক্ত করুন
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center gap-3">
        <Filter className="w-4 h-4 text-orange-600" />
        <span className="text-xs font-bold text-gray-700">ক্যাটাগরি ফিল্টার:</span>
        <select
          value={selectedCategoryFilter}
          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-800 focus:outline-hidden focus:border-orange-500"
        >
          <option value="all">সকল প্রধান ক্যাটাগরি ({subcategories.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategories Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4">আইকন</th>
                <th className="p-4">সাবক্যাটাগরি নাম (বাংলা)</th>
                <th className="p-4">প্রধান ক্যাটাগরি</th>
                <th className="p-4">স্ল্যাগ</th>
                <th className="p-4 text-center">স্ট্যাটাস</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSubcategories.map((sub) => {
                const parent = categories.find((c) => c.id === sub.category_id);
                return (
                  <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Icon */}
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                        <DynamicIcon name={sub.icon} className="w-5 h-5" />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="p-4">
                      <div className="font-bold text-gray-900 text-sm">{sub.name}</div>
                      {sub.name_en && (
                        <div className="text-[11px] text-gray-400">{sub.name_en}</div>
                      )}
                    </td>

                    {/* Parent Category */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-lg">
                        {parent?.name || 'ক্যাটাগরি'}
                      </span>
                    </td>

                    {/* Slug */}
                    <td className="p-4 font-mono text-gray-500 text-xs">
                      /{sub.slug}
                    </td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(sub)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          sub.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {sub.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(sub)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="সম্পাদনা"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(sub.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Subcategory Modal */}
      {modalOpen && editingSubcategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                {editingSubcategory.id ? 'সাবক্যাটাগরি সম্পাদনা' : 'নতুন সাবক্যাটাগরি যুক্ত করুন'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Category Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">প্রধান ক্যাটাগরি *</label>
                <select
                  required
                  value={editingSubcategory.category_id || ''}
                  onChange={(e) => setEditingSubcategory({ ...editingSubcategory, category_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
                >
                  <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.name_en || c.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">সাবক্যাটাগরি নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: পুলিশ ও নিরাপত্তা"
                  value={editingSubcategory.name || ''}
                  onChange={(e) => setEditingSubcategory({ ...editingSubcategory, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">ইংরেজি নাম</label>
                <input
                  type="text"
                  placeholder="যেমন: Police & Security"
                  value={editingSubcategory.name_en || ''}
                  onChange={(e) => setEditingSubcategory({ ...editingSubcategory, name_en: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">স্ল্যাগ (URL Identifier)</label>
                <input
                  type="text"
                  placeholder="যেমন: police"
                  value={editingSubcategory.slug || ''}
                  onChange={(e) => setEditingSubcategory({ ...editingSubcategory, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
              </div>

              {/* Icon Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">আইকন নির্বাচন করুন</label>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <DynamicIcon name={editingSubcategory.icon || 'Tag'} className="w-6 h-6" />
                  </div>
                  <input
                    type="text"
                    value={editingSubcategory.icon || ''}
                    onChange={(e) => setEditingSubcategory({ ...editingSubcategory, icon: e.target.value })}
                    placeholder="Lucide Icon নাম"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1.5 max-h-24 overflow-y-auto">
                  {AVAILABLE_LUCIDE_ICONS.slice(0, 24).map((iconName) => (
                    <button
                      type="button"
                      key={iconName}
                      onClick={() => setEditingSubcategory({ ...editingSubcategory, icon: iconName })}
                      className={`p-1.5 rounded-lg border flex items-center gap-1 text-[11px] transition-colors ${
                        editingSubcategory.icon === iconName
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-orange-50'
                      }`}
                    >
                      <DynamicIcon name={iconName} className="w-3.5 h-3.5" />
                      <span>{iconName}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={editingSubcategory.description || ''}
                  onChange={(e) => setEditingSubcategory({ ...editingSubcategory, description: e.target.value })}
                  placeholder="এই উপ-বিভাগে যেসব সেবা থাকবে"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
              </div>

              {/* Status Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSubcategory.status === 'active'}
                    onChange={(e) =>
                      setEditingSubcategory({
                        ...editingSubcategory,
                        status: e.target.checked ? 'active' : 'inactive',
                      })
                    }
                    className="w-4 h-4 text-orange-600 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">সাবক্যাটাগরি সক্রিয় রাখুন</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs"
                >
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">আপনি কি নিশ্চিত?</h3>
            <p className="text-xs text-gray-500">
              এই সাবক্যাটাগরি মুছে ফেললে এর অধীনে থাকা লিস্টিং ক্ষতিগ্রস্ত হতে পারে।
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
