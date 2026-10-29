import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Star,
  User,
  Shield,
  FileText,
  Bell,
  HeartPulse,
  Settings,
  HelpCircle,
  LogOut,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Droplets,
  Utensils,
  Leaf,
  FlaskConical,
  Plus,
  Save,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  AlertCircle,
  Sparkles,
  Search,
  Send,
  X,
  Heart,
  Trash2,
} from 'lucide-react';
import {
  UserProfile,
  HealthPreferences,
  SkinScanResult,
  SKIN_SENSITIVITY_OPTIONS,
  FOOD_ALLERGY_OPTIONS,
  FOOD_PREFERENCE_OPTIONS,
  SKINCARE_PRODUCTS,
  HEALTHY_FOODS,
  analyzeIngredientsDeterministic,
  SkincareProduct,
} from '../utils/skinLogic';

interface ProfileMainViewProps {
  user: UserProfile;
  onBack: () => void;
  onOpenPersonalData: () => void;
  onOpenPreferences: () => void;
  onOpenScanHistory: () => void;
  onOpenPremium: () => void;
  onLogout: () => void;
}

export const ProfileMainView: React.FC<ProfileMainViewProps> = ({
  user,
  onBack,
  onOpenPersonalData,
  onOpenPreferences,
  onOpenScanHistory,
  onOpenPremium,
  onLogout,
}) => {
  const [activeSubModal, setActiveSubModal] = useState<
    'security' | 'notifications' | 'settings' | 'help' | null
  >(null);
  const [notifDailyScan, setNotifDailyScan] = useState(true);
  const [notifSkincareRoutine, setNotifSkincareRoutine] = useState(true);
  const [statusToast, setStatusToast] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'account',
      icon: User,
      title: 'Informasi Akun',
      subtitle: 'Kelola data diri & akun Anda',
      onClick: onOpenPersonalData,
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Keamanan Akun',
      subtitle: 'Ubah password dan pengaturan keamanan',
      onClick: () => setActiveSubModal('security'),
    },
    {
      id: 'history',
      icon: FileText,
      title: 'Riwayat Scan',
      subtitle: 'Lihat hasil analisis kulit Anda',
      onClick: onOpenScanHistory,
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notifikasi',
      subtitle: 'Pengingat dan pembaruan terbaru',
      onClick: () => setActiveSubModal('notifications'),
    },
    {
      id: 'preferences',
      icon: HeartPulse,
      title: 'Kesehatan & Preferensi',
      subtitle: 'Atur alergi, sensitivitas, dan preferensi skincare Anda',
      onClick: onOpenPreferences,
    },
    {
      id: 'settings',
      icon: Settings,
      title: 'Pengaturan',
      subtitle: 'Bahasa, tampilan, dan lainnya',
      onClick: () => setActiveSubModal('settings'),
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: 'Pusat Bantuan',
      subtitle: 'FAQ, hubungi kami, dan panduan',
      onClick: () => setActiveSubModal('help'),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        {/* Top Bar matching PDF Page 8 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Kembali"
              onClick={onBack}
              className="w-11 h-11 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-[#2D2A6E] hover:bg-indigo-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
              Profil
            </h1>
          </div>

          <button
            type="button"
            onClick={onOpenPremium}
            className="px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-xs text-xs font-bold text-[#3B3486] hover:bg-indigo-50 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <Crown className="w-4 h-4 text-[#6C67F0]" />
            <span>Member {user.memberLevel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {statusToast && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
            <span>{statusToast}</span>
            <button
              type="button"
              onClick={() => setStatusToast(null)}
              className="text-emerald-700 font-bold px-2"
            >
              OK
            </button>
          </div>
        )}

        {/* Avatar & Greeting Header matching PDF Page 8 */}
        <div className="flex items-center gap-5 mb-6">
          <button
            type="button"
            onClick={onOpenPersonalData}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-md border-4 border-white shrink-0 relative group"
          >
            <img
              src={user.avatar}
              alt={user.fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </button>

          <div>
            <p className="text-base font-semibold text-[#5B56E0]">Halo,</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B]">
              {user.fullName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Jaga kesehatan kulit, mulai dari sekarang
            </p>
          </div>
        </div>

        {/* Points & Member Level Strip matching PDF Page 8 */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-indigo-100/80 mb-6 grid grid-cols-2 divide-x divide-indigo-100">
          <div className="flex items-center gap-3 pr-4">
            <div className="w-11 h-11 rounded-full bg-[#ECE9FF] text-[#6C67F0] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-[#6C67F0]" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Poin</p>
              <p className="text-lg font-extrabold text-[#1E1B4B] tabular-nums">
                {user.points.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPremium}
            className="flex items-center justify-between pl-4 text-left hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#ECE9FF] text-[#6C67F0] flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5 fill-[#6C67F0]" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Level Member</p>
                <p className="text-base sm:text-lg font-extrabold text-[#4F46E5]">
                  {user.memberLevel}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>
        </div>

        {/* Menu List Card matching PDF Page 8 */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-indigo-100/80 mb-5 divide-y divide-slate-100">
          {menuItems.map((item) => {
            const IconComp = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className="w-full py-3.5 px-3 flex items-center justify-between gap-4 hover:bg-[#F9F8FF] rounded-2xl transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-[#1E1B4B]">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Keluar Akun Button matching PDF Page 8 */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full bg-white hover:bg-rose-50/60 rounded-2xl p-4 shadow-sm border border-indigo-100/80 flex items-center justify-between text-[#3B3486] hover:text-rose-600 transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold">Keluar Akun</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Sub-modal for Keamanan Akun / Notifikasi / Pengaturan / Pusat Bantuan */}
      {activeSubModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <button
              type="button"
              aria-label="Tutup dialog"
              onClick={() => setActiveSubModal(null)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center absolute top-5 right-5"
            >
              <X className="w-5 h-5" />
            </button>

            {activeSubModal === 'security' && (
              <div>
                <h2 className="text-lg font-extrabold text-[#1E1B4B] mb-2">
                  Keamanan Akun
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Perbarui kata sandi akun FaceWish Anda.
                </p>
                <div className="space-y-3 mb-5">
                  <input
                    type="password"
                    placeholder="Password saat ini"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs"
                  />
                  <input
                    type="password"
                    placeholder="Password baru"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubModal(null);
                    setStatusToast('Pengaturan keamanan akun berhasil diperbarui.');
                  }}
                  className="w-full h-11 rounded-full bg-[#6C67F0] text-white text-xs font-bold"
                >
                  Simpan Password
                </button>
              </div>
            )}

            {activeSubModal === 'notifications' && (
              <div>
                <h2 className="text-lg font-extrabold text-[#1E1B4B] mb-2">
                  Pengaturan Notifikasi
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Atur jadwal pengingat perawatan kulit harianmu.
                </p>
                <div className="space-y-3 mb-5">
                  <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7FF] cursor-pointer">
                    <span className="text-xs font-bold text-[#1E1B4B]">
                      Pengingat Scan Kulit Mingguan
                    </span>
                    <input
                      type="checkbox"
                      checked={notifDailyScan}
                      onChange={(e) => setNotifDailyScan(e.target.checked)}
                      className="w-4 h-4 accent-[#6C67F0]"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7FF] cursor-pointer">
                    <span className="text-xs font-bold text-[#1E1B4B]">
                      Pengingat Sunscreen &amp; Night Routine
                    </span>
                    <input
                      type="checkbox"
                      checked={notifSkincareRoutine}
                      onChange={(e) => setNotifSkincareRoutine(e.target.checked)}
                      className="w-4 h-4 accent-[#6C67F0]"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubModal(null);
                    setStatusToast('Preferensi notifikasi berhasil disimpan.');
                  }}
                  className="w-full h-11 rounded-full bg-[#6C67F0] text-white text-xs font-bold"
                >
                  Simpan Pengaturan
                </button>
              </div>
            )}

            {activeSubModal === 'settings' && (
              <div>
                <h2 className="text-lg font-extrabold text-[#1E1B4B] mb-2">
                  Pengaturan Aplikasi
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Bahasa: Bahasa Indonesia (Default) · Satuan Analisis: Metrik Standar
                </p>
                <button
                  type="button"
                  onClick={() => setActiveSubModal(null)}
                  className="w-full h-11 rounded-full bg-[#6C67F0] text-white text-xs font-bold"
                >
                  Selesai
                </button>
              </div>
            )}

            {activeSubModal === 'help' && (
              <div>
                <h2 className="text-lg font-extrabold text-[#1E1B4B] mb-2">
                  Pusat Bantuan FaceWish
                </h2>
                <div className="space-y-2.5 text-xs text-slate-600 mb-5">
                  <p>
                    <strong className="text-[#1E1B4B]">
                      1. Bagaimana cara mendapatkan hasil scan akurat?
                    </strong>
                    <br />
                    Pastikan wajah bersih tanpa makeup tebal dan menghadap sumber cahaya merata.
                  </p>
                  <p>
                    <strong className="text-[#1E1B4B]">
                      2. Bagaimana produk direkomendasikan?
                    </strong>
                    <br />
                    Rekomendasi disesuaikan otomatis dengan skor kelembapan, minyak T-zone, serta daftar alergi/sensitivitas kulitmu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSubModal(null)}
                  className="w-full h-11 rounded-full bg-[#6C67F0] text-white text-xs font-bold"
                >
                  Tutup Panduan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface PersonalDataViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onBack: () => void;
}

export const PersonalDataView: React.FC<PersonalDataViewProps> = ({
  user,
  onUpdateUser,
  onBack,
}) => {
  const [editingField, setEditingField] = useState<keyof UserProfile | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [savedBanner, setSavedBanner] = useState(false);

  const fields: Array<{
    key: keyof UserProfile;
    label: string;
    icon: React.ElementType;
  }> = [
    { key: 'fullName', label: 'Nama Lengkap', icon: User },
    { key: 'phone', label: 'Nomor Telepon', icon: Phone },
    { key: 'email', label: 'Email', icon: Mail },
    { key: 'birthDate', label: 'Tanggal Lahir', icon: Calendar },
    { key: 'gender', label: 'Jenis Kelamin', icon: User },
    { key: 'address', label: 'Alamat', icon: MapPin },
  ];

  const startEdit = (key: keyof UserProfile) => {
    setEditingField(key);
    setTempValue(String(user[key] || ''));
    setSavedBanner(false);
  };

  const saveEdit = () => {
    if (!editingField) return;
    if (tempValue.trim().length > 0) {
      onUpdateUser({
        ...user,
        [editingField]: tempValue.trim(),
      });
      setSavedBanner(true);
    }
    setEditingField(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header matching PDF Page 9 */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            aria-label="Kembali"
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-[#2D2A6E] hover:bg-indigo-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
            Data Diri
          </h1>
        </div>

        {/* Profile Avatar & Subtitle matching PDF Page 9 */}
        <div className="flex items-center gap-5 mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-md border-4 border-white shrink-0">
            <img
              src={user.avatar}
              alt={user.fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B]">
              {user.fullName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Kelola data diri Anda
              <br />
              dengan mudah dan aman
            </p>
          </div>
        </div>

        {savedBanner && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Perubahan data diri berhasil disimpan.</span>
          </div>
        )}

        {/* Personal Data List Card matching PDF Page 9 */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-indigo-100/80 mb-5 divide-y divide-slate-100">
          {fields.map((f) => {
            const IconComp = f.icon;
            const isEditing = editingField === f.key;
            return (
              <div key={f.key} className="py-3.5 px-3">
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-[#4F46E5] block mb-1">
                        {f.label}
                      </label>
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-indigo-300 text-sm text-slate-900 focus:outline-none focus:border-[#6C67F0]"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2 sm:pt-5">
                      <button
                        type="button"
                        onClick={saveEdit}
                        className="px-4 h-10 rounded-xl bg-[#6C67F0] text-white text-xs font-bold"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingField(null)}
                        className="px-3 h-10 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEdit(f.key)}
                    className="w-full flex items-center justify-between gap-4 text-left hover:bg-[#F9F8FF] rounded-2xl p-1 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                          {f.label}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          {String(user[f.key])}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Keamanan Data Card matching PDF Page 9 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1E1B4B]">
                Keamanan Data
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                Data Anda terlindungi dengan aman dan tidak akan dibagikan ke pihak ketiga.
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>
      </div>
    </div>
  );
};

interface HealthPreferencesViewProps {
  preferences: HealthPreferences;
  onSavePreferences: (prefs: HealthPreferences) => void;
  onBack: () => void;
}

export const HealthPreferencesView: React.FC<HealthPreferencesViewProps> = ({
  preferences,
  onSavePreferences,
  onBack,
}) => {
  const [skinSens, setSkinSens] = useState<string[]>(preferences.skinSensitivities);
  const [foodAlg, setFoodAlg] = useState<string[]>(preferences.foodAllergies);
  const [foodPref, setFoodPref] = useState<string[]>(preferences.foodPreferences);
  const [avoidedList, setAvoidedList] = useState<string[]>(preferences.avoidedIngredients);
  const [newAvoidedInput, setNewAvoidedInput] = useState('');
  const [customSensitivityOptions, setCustomSensitivityOptions] = useState<string[]>([]);
  const [addingCustomSens, setAddingCustomSens] = useState(false);
  const [customSensInput, setCustomSensInput] = useState('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleAddCustomSensitivity = () => {
    const clean = customSensInput.trim();
    if (!clean) return;
    if (!SKIN_SENSITIVITY_OPTIONS.includes(clean) && !customSensitivityOptions.includes(clean)) {
      setCustomSensitivityOptions((prev) => [...prev, clean]);
    }
    if (!skinSens.includes(clean)) {
      setSkinSens((prev) => [...prev, clean]);
    }
    setCustomSensInput('');
    setAddingCustomSens(false);
  };

  const handleAddAvoidedIngredient = () => {
    const clean = newAvoidedInput.trim();
    if (!clean) return;
    if (!avoidedList.includes(clean)) {
      setAvoidedList((prev) => [...prev, clean]);
    }
    setNewAvoidedInput('');
  };

  const handleSaveAll = () => {
    const finalAvoided = newAvoidedInput.trim()
      ? Array.from(new Set([...avoidedList, newAvoidedInput.trim()]))
      : avoidedList;

    onSavePreferences({
      skinSensitivities: skinSens,
      foodAllergies: foodAlg,
      foodPreferences: foodPref,
      avoidedIngredients: finalAvoided,
    });
    setNewAvoidedInput('');
    setSaveMessage(
      'Preferensi kesehatan & alergi berhasil disimpan! Rekomendasi skincare dan makanan telah diperbarui.'
    );
  };

  const allSensitivityOptions = [...SKIN_SENSITIVITY_OPTIONS, ...customSensitivityOptions];

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header matching PDF Page 11 */}
        <div className="flex items-start gap-3.5 mb-6">
          <button
            type="button"
            aria-label="Kembali"
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-[#2D2A6E] hover:bg-indigo-50 transition-colors shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
              Kesehatan &amp; Preferensi
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Bantu kami memberikan rekomendasi yang lebih aman dan sesuai dengan kebutuhanmu.
            </p>
          </div>
        </div>

        {saveMessage && (
          <div
            role="status"
            className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}

        {/* Section 1: Sensitivitas Kulit (PDF Page 11) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#1E1B4B]">
                  Sensitivitas Kulit
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pilih bahan yang sebaiknya dihindari karena dapat memicu iritasi atau reaksi pada kulitmu.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400 shrink-0">
              Opsional
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {allSensitivityOptions.map((opt) => {
              const selected = skinSens.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleItem(skinSens, setSkinSens, opt)}
                  className={`h-11 px-4 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap shrink-0 ${
                    selected
                      ? 'bg-[#ECE9FF] border-[#6C67F0] text-[#3B3486]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-200'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selected ? 'border-[#6C67F0] bg-[#6C67F0]' : 'border-slate-300'
                    }`}
                  >
                    {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setAddingCustomSens((prev) => !prev)}
              className="h-11 px-4 rounded-2xl border border-dashed border-indigo-300 text-xs font-bold text-[#5B56E0] hover:bg-indigo-50/50 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah bahan lain</span>
            </button>
          </div>

          {addingCustomSens && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={customSensInput}
                onChange={(e) => setCustomSensInput(e.target.value)}
                placeholder="Ketik nama bahan sensitivitas..."
                className="flex-1 h-11 px-4 rounded-xl border border-indigo-200 text-xs focus:outline-none focus:border-[#6C67F0]"
              />
              <button
                type="button"
                onClick={handleAddCustomSensitivity}
                className="h-11 px-4 rounded-xl bg-[#6C67F0] text-white text-xs font-bold"
              >
                Tambah
              </button>
            </div>
          )}
        </div>

        {/* Section 2: Alergi Makanan (PDF Page 11) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#1E1B4B]">
                  Alergi Makanan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pilih makanan yang tidak dapat kamu konsumsi untuk menghindari reaksi alergi.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#5B56E0] shrink-0">
              Wajib
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {FOOD_ALLERGY_OPTIONS.map((opt) => {
              const selected = foodAlg.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleItem(foodAlg, setFoodAlg, opt)}
                  className={`h-11 px-4 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap shrink-0 ${
                    selected
                      ? 'bg-[#ECE9FF] border-[#6C67F0] text-[#3B3486]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-200'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selected ? 'border-[#6C67F0] bg-[#6C67F0]' : 'border-slate-300'
                    }`}
                  >
                    {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Preferensi Makanan (PDF Page 11) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#1E1B4B]">
                  Preferensi Makanan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pilih preferensi makanan yang kamu sukai atau ingin diterapkan dalam pola makanmu.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400 shrink-0">
              Opsional
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {FOOD_PREFERENCE_OPTIONS.map((opt) => {
              const selected = foodPref.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleItem(foodPref, setFoodPref, opt)}
                  className={`h-11 px-4 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap shrink-0 ${
                    selected
                      ? 'bg-[#ECE9FF] border-[#6C67F0] text-[#3B3486]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-200'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selected ? 'border-[#6C67F0] bg-[#6C67F0]' : 'border-slate-300'
                    }`}
                  >
                    {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Bahan yang Harus Dihindari (PDF Page 11) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-7">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#1E1B4B]">
                  Bahan yang Harus Dihindari
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tambahkan bahan lain yang perlu dihindari, misalnya kandungan tertentu dalam skincare atau makanan.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400 shrink-0">
              Opsional
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 flex items-center">
              <Plus className="w-4 h-4 text-[#5B56E0] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={newAvoidedInput}
                onChange={(e) => setNewAvoidedInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAvoidedIngredient();
                  }
                }}
                placeholder="Tulis bahan yang harus dihindari..."
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6C67F0]"
              />
            </div>
            <button
              type="button"
              onClick={handleAddAvoidedIngredient}
              className="h-12 px-4 rounded-2xl bg-[#F3F1FF] hover:bg-[#E5E1FF] text-[#4F46E5] text-xs font-bold whitespace-nowrap shrink-0"
            >
              Tambah
            </button>
          </div>

          {avoidedList.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {avoidedList.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-medium text-slate-700"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    aria-label={`Hapus ${item}`}
                    onClick={() =>
                      setAvoidedList((prev) => prev.filter((x) => x !== item))
                    }
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Changes Button matching PDF Page 11 */}
        <button
          type="button"
          onClick={handleSaveAll}
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#6C67F0] to-[#7C78F6] hover:from-[#5B56E0] hover:to-[#6C67F0] text-white font-bold text-base shadow-xl shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <Save className="w-5 h-5" />
          <span>Simpan Perubahan</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface PremiumViewProps {
  user: UserProfile;
  onSelectPlan: (plan: 'trial' | 'monthly' | 'yearly') => void;
  onBack: () => void;
}

export const PremiumMembershipView: React.FC<PremiumViewProps> = ({
  user,
  onSelectPlan,
  onBack,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'yearly'>(
    user.premiumPlan || 'trial'
  );
  const [activatedNotice, setActivatedNotice] = useState<string | null>(null);

  const freeFeatures = [
    'Scan kulit dasar',
    'Analisis kelembapan, minyak & kemerahan',
    'Rekomendasi produk dasar',
    'Ingredient Checker dasar',
    'Rekomendasi makanan',
    'AI Skin Assistant terbatas',
  ];

  const premiumFeatures = [
    'AI Skin Assistant Unlimited',
    'Unlimited Scan',
    'Analisis Kulit Lengkap',
    'Ingredient Checker Lengkap',
    'Skin Progress',
    'Laporan Kulit Berkala',
    'Tanpa Iklan',
  ];

  const handleActivate = () => {
    onSelectPlan(selectedPlan);
    const labelMap = {
      trial: 'Trial Gratis 3 Hari',
      monthly: 'Paket Bulanan (Rp19.900)',
      yearly: 'Paket Tahunan (Rp149.000)',
    };
    setActivatedNotice(
      `Selamat! ${labelMap[selectedPlan]} FaceWish Premium telah aktif di akun Anda.`
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Top Bar matching PDF Page 13 */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            aria-label="Kembali"
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-[#2D2A6E] hover:bg-indigo-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
            Premium
          </h1>
        </div>

        {/* Hero Section matching PDF Page 13 */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-7">
          <div className="sm:col-span-7">
            <p className="text-xs font-bold text-[#5B56E0] flex items-center gap-1.5 mb-2">
              <Crown className="w-4 h-4" />
              <span>FaceWish Premium</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] leading-tight">
              Kulit lebih sehat,
              <br />
              <span className="text-[#6C67F0]">setiap hari.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 max-w-md">
              Dapatkan analisis lebih mendalam, pendamping kulit berbasis AI, dan pantau progres kulitmu.
            </p>
          </div>

          <div className="sm:col-span-5 flex justify-center">
            <img
              src="/assets/facewish/premium_crown.jpg"
              alt="FaceWish Premium Crown"
              referrerPolicy="no-referrer"
              className="w-52 h-44 object-contain rounded-3xl"
            />
          </div>
        </div>

        {activatedNotice && (
          <div
            role="status"
            className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{activatedNotice}</span>
          </div>
        )}

        {/* Comparison Grid: Gratis vs Premium (PDF Page 13) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7 items-stretch">
          {/* Gratis Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#1E1B4B]">Gratis</h3>
                <p className="text-xs text-slate-500">
                  Cukup untuk mulai mengenal kulitmu.
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {freeFeatures.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#6C67F0] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Card */}
          <div className="bg-gradient-to-b from-[#F3F1FF] to-white rounded-3xl p-5 sm:p-6 shadow-sm border-2 border-[#6C67F0]/40">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-full bg-[#6C67F0] text-white flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#1E1B4B]">Premium</h3>
                <p className="text-xs text-slate-600">
                  Lebih lengkap, lebih personal.
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {premiumFeatures.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1E1B4B]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#6C67F0] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pilih Paket Premium matching PDF Page 13 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B4B]">
              Pilih Paket Premium
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Trial 3 Hari */}
            <button
              type="button"
              onClick={() => setSelectedPlan('trial')}
              className={`rounded-3xl p-4 text-left border-2 transition-all flex flex-col justify-between ${
                selectedPlan === 'trial'
                  ? 'border-[#6C67F0] bg-[#F6F5FF]'
                  : 'border-slate-200 bg-white hover:border-indigo-200'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-[#5B56E0]">Trial</span>
                <p className="text-xl font-extrabold text-[#1E1B4B] mt-1">
                  3 Hari
                </p>
                <p className="text-xs font-bold text-[#4F46E5] mt-0.5">Gratis</p>
              </div>
              <p className="text-xs text-slate-600 mt-4 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6C67F0] shrink-0" />
                <span>Semua fitur Premium terbuka</span>
              </p>
            </button>

            {/* Bulanan Rp19.900 */}
            <button
              type="button"
              onClick={() => setSelectedPlan('monthly')}
              className={`rounded-3xl p-4 text-left border-2 transition-all flex flex-col justify-between ${
                selectedPlan === 'monthly'
                  ? 'border-[#6C67F0] bg-[#F6F5FF]'
                  : 'border-slate-200 bg-white hover:border-indigo-200'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-slate-700">Bulanan</span>
                <p className="text-xl font-extrabold text-[#1E1B4B] tabular-nums mt-1">
                  Rp19.900
                </p>
                <p className="text-[11px] font-bold text-[#5B56E0] mt-1">
                  Pembelian Pertama
                </p>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-400 line-through tabular-nums">
                  Rp29.900
                </p>
                <p className="text-[11px] text-slate-500">
                  Setelahnya Rp29.900/bulan
                </p>
              </div>
            </button>

            {/* Tahunan Rp149.000 */}
            <button
              type="button"
              onClick={() => setSelectedPlan('yearly')}
              className={`rounded-3xl p-4 text-left border-2 transition-all flex flex-col justify-between ${
                selectedPlan === 'yearly'
                  ? 'border-[#6C67F0] bg-[#F6F5FF]'
                  : 'border-slate-200 bg-white hover:border-indigo-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Tahunan</span>
                  <span className="text-[11px] font-bold text-[#5B56E0]">
                    Hemat 25%
                  </span>
                </div>
                <p className="text-xl font-extrabold text-[#1E1B4B] tabular-nums mt-1">
                  Rp149.000
                </p>
                <p className="text-xs text-slate-400 line-through tabular-nums mt-1">
                  Rp199.000
                </p>
              </div>
              <p className="text-[11px] text-slate-500 mt-4">
                Setelahnya Rp199.000/tahun
              </p>
            </button>
          </div>
        </div>

        {/* Bottom Trial Strip matching PDF Page 13 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Sparkles className="w-6 h-6 text-[#6C67F0] shrink-0" />
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#1E1B4B]">
                Coba dulu, rasakan bedanya!
              </h3>
              <p className="text-xs text-slate-500">
                Nikmati semua fitur Premium selama 3 hari, gratis.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleActivate}
            className="w-full sm:w-auto px-6 h-12 rounded-full bg-gradient-to-r from-[#6C67F0] to-[#7C78F6] hover:from-[#5B56E0] hover:to-[#6C67F0] text-white font-bold text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Mulai Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Bisa dibatalkan kapan saja.
        </p>
      </div>
    </div>
  );
};

interface ScanHistoryViewProps {
  scans: SkinScanResult[];
  user: UserProfile;
  onBack: () => void;
  onSelectScan: (scan: SkinScanResult) => void;
  onOpenPremium: () => void;
  onStartNewScan: () => void;
}

export const ScanHistoryView: React.FC<ScanHistoryViewProps> = ({
  scans,
  user,
  onBack,
  onSelectScan,
  onOpenPremium,
  onStartNewScan,
}) => {
  const [activeTab, setActiveTab] = useState<'riwayat' | 'progress' | 'laporan'>('riwayat');

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Top Header matching PDF Page 26 */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <button
              type="button"
              aria-label="Kembali"
              onClick={onBack}
              className="w-11 h-11 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-[#2D2A6E] hover:bg-indigo-50 transition-colors mb-4"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B]">
              Riwayat Scan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Lihat hasil analisis kulit dari scan yang pernah kamu lakukan.
            </p>
          </div>

          <img
            src="/assets/facewish/riwayat_folder.jpg"
            alt="Riwayat Scan Folder"
            referrerPolicy="no-referrer"
            className="w-28 h-24 sm:w-36 sm:h-28 object-contain rounded-2xl shrink-0"
          />
        </div>

        {/* Segmented Control: Riwayat | Progress | Laporan (PDF Page 26) */}
        <div className="bg-white p-1.5 rounded-full shadow-xs border border-indigo-100 grid grid-cols-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('riwayat')}
            className={`h-11 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'riwayat'
                ? 'bg-[#6C67F0] text-white shadow-md shadow-indigo-500/20'
                : 'text-[#3B3486] hover:bg-indigo-50/50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Riwayat</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('progress')}
            className={`h-11 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'progress'
                ? 'bg-[#6C67F0] text-white shadow-md shadow-indigo-500/20'
                : 'text-[#3B3486] hover:bg-indigo-50/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Progress</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('laporan')}
            className={`h-11 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'laporan'
                ? 'bg-[#6C67F0] text-white shadow-md shadow-indigo-500/20'
                : 'text-[#3B3486] hover:bg-indigo-50/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Laporan</span>
          </button>
        </div>

        {/* Upgrade Banner Card matching PDF Page 26 */}
        <div className="bg-gradient-to-r from-[#ECE9FF] to-[#F5F4FF] rounded-3xl p-5 shadow-sm border border-indigo-100 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white text-[#6C67F0] flex items-center justify-center shadow-xs shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#1E1B4B]">
                Ingin melihat perkembangan kulitmu?
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Upgrade ke Premium untuk mengakses Skin Progress dan Laporan Kulit
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPremium}
            className="px-5 h-11 rounded-full bg-[#6C67F0] hover:bg-[#5B56E0] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 whitespace-nowrap shrink-0"
          >
            <span>Upgrade Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {activeTab === 'riwayat' && (
          <>
            <div className="space-y-4 mb-10">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-4 hover:border-indigo-200 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-neutral-800 relative shrink-0">
                      <img
                        src={scan.imageUrl}
                        alt={scan.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#5B56E0]" />
                        <span>{scan.date}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{scan.time}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B4B]">
                        {scan.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#5B56E0]" />
                        <span>
                          {scan.subtitle} · Skor {scan.skinScore}/100
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-4 shrink-0">
                    <button
                      type="button"
                      onClick={() => onSelectScan(scan)}
                      className="text-xs font-bold text-rose-600 flex items-center gap-1 hover:underline"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      <span>{scan.badgeText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      aria-label={`Lihat hasil ${scan.title} ${scan.date}`}
                      onClick={() => onSelectScan(scan)}
                      className="w-11 h-11 rounded-full bg-[#F3F1FF] hover:bg-[#E2DEFF] text-[#4F46E5] flex items-center justify-center transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center py-6">
              <p className="text-xs text-slate-500 mb-1">
                Itu semua riwayat scan kamu.
              </p>
              <p className="text-xs font-medium text-slate-600 mb-4">
                Scan lagi untuk melihat perkembangan kulitmu.
              </p>
              <button
                type="button"
                onClick={onStartNewScan}
                className="px-6 h-12 rounded-full bg-[#6C67F0] text-white text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-indigo-500/20"
              >
                <span>Scan Wajah Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {activeTab === 'progress' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-100/80">
            <h3 className="text-base font-extrabold text-[#1E1B4B] mb-1">
              Grafik Perkembangan Skin Score ({user.memberLevel})
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Perbandingan hidrasi kulit, kontrol minyak T-zone, dan skor keseluruhan.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[#F8F7FF]">
                <p className="text-xs text-slate-500">Agustus 2026</p>
                <p className="text-2xl font-extrabold text-[#1E1B4B] tabular-nums mt-1">
                  62/100
                </p>
                <p className="text-[11px] text-amber-600 mt-1">Kelembapan 41%</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F3F1FF] border border-[#6C67F0]/30">
                <p className="text-xs font-bold text-[#5B56E0]">8 Sep 2026 (Terbaru)</p>
                <p className="text-2xl font-extrabold text-[#4F46E5] tabular-nums mt-1">
                  68/100
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  +6 Poin (Kelembapan 48%)
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F7FF]">
                <p className="text-xs text-slate-500">Target Oktober</p>
                <p className="text-2xl font-extrabold text-emerald-600 tabular-nums mt-1">
                  78/100
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Rutin Ceramide + SPF</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'laporan' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-100/80 space-y-3">
            <h3 className="text-base font-extrabold text-[#1E1B4B]">
              Laporan Kulit Berkala — Rangga
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Berdasarkan evaluasi scan terakhir (Skor 68/100), kondisi kemerahan sudah rendah (28%), namun minyak pada area T-zone masih berada di angka 72% dengan kelembapan 48%.
            </p>
            <div className="p-4 rounded-2xl bg-[#F8F7FF] text-xs text-slate-700 space-y-1.5">
              <p className="font-bold text-[#1E1B4B]">Rekomendasi Prioritas Bulan Ini:</p>
              <p>1. Gunakan CeraVe Foaming Facial Cleanser 2x sehari.</p>
              <p>2. Aplikasikan Skintific 5X Ceramide Moisture Gel setiap habis mencuci muka.</p>
              <p>3. Tingkatkan konsumsi Alpukat dan Buah Berry untuk hidrasi &amp; antioksidan.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface IngredientCheckerAndAssistantViewProps {
  initialTab: 'checker' | 'assistant';
  preferences: HealthPreferences;
  latestScan: SkinScanResult;
  onBack: () => void;
}

export const IngredientCheckerAndAssistantView: React.FC<
  IngredientCheckerAndAssistantViewProps
> = ({ initialTab, preferences, latestScan, onBack }) => {
  const [tab, setTab] = useState<'checker' | 'assistant'>(initialTab);
  const [ingredientInput, setIngredientInput] = useState(
    'Aqua, Niacinamide, Ceramide NP, Hyaluronic Acid, Centella Asiatica, Glycerin'
  );
  const [checkResult, setCheckResult] = useState(() =>
    analyzeIngredientsDeterministic(
      'Aqua, Niacinamide, Ceramide NP, Hyaluronic Acid, Centella Asiatica, Glycerin',
      preferences,
      latestScan.skinProfile
    )
  );

  // AI Skin Assistant Chat State
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([
    {
      role: 'assistant',
      text: `Halo Rangga! Aku AI Skin Assistant FaceWish. Berdasarkan scan terakhirmu (Skin Score ${latestScan.skinScore}/100, kulit ${latestScan.skinProfile} & ${latestScan.skinTag}), ada yang ingin kamu tanyakan seputar urutan skincare, cara mengatasi minyak di T-zone (72%), atau pilihan makanan sehat?`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  const handleRunIngredientCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = analyzeIngredientsDeterministic(
      ingredientInput,
      preferences,
      latestScan.skinProfile
    );
    setCheckResult(res);
  };

  const applyPresetIngredients = (presetText: string) => {
    setIngredientInput(presetText);
    setCheckResult(
      analyzeIngredientsDeterministic(presetText, preferences, latestScan.skinProfile)
    );
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed || isSendingChat) return;

    setChatMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setChatInput('');
    setIsSendingChat(true);

    try {
      const response = await fetch('/api/skin-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          skinProfile: `${latestScan.skinProfile} (${latestScan.skinTag})`,
          preferences,
          latestScan: {
            skinScore: latestScan.skinScore,
            mainCondition: latestScan.mainCondition,
          },
        }),
      });
      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            data.reply ||
            'Gunakan cleanser lembut rendah pH, moisturizer berbahan Ceramide, dan sunscreen SPF 50+ setiap pagi.',
        },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Untuk kulit Kombinasi & Sensitif, utamakan CeraVe Foaming Cleanser, Skintific 5X Ceramide Gel, dan La Roche-Posay Anthelios SPF 50+.',
        },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-3.5 mb-6">
          <button
            type="button"
            aria-label="Kembali"
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-[#2D2A6E] hover:bg-indigo-50 transition-colors shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
              {tab === 'checker' ? 'Ingredient Checker' : 'AI Skin Assistant'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {tab === 'checker'
                ? 'Cek kandungan & kecocokan produk dengan sensitivitas kulitmu.'
                : 'Konsultasi personal berbasis hasil AI Skin Scan milikmu.'}
            </p>
          </div>
        </div>

        {/* Switcher: Ingredient Checker | AI Skin Assistant */}
        <div className="bg-white p-1.5 rounded-full shadow-xs border border-indigo-100 grid grid-cols-2 mb-6">
          <button
            type="button"
            onClick={() => setTab('checker')}
            className={`h-11 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 ${
              tab === 'checker'
                ? 'bg-[#6C67F0] text-white shadow-md shadow-indigo-500/20'
                : 'text-[#3B3486] hover:bg-indigo-50/50'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Ingredient Checker</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('assistant')}
            className={`h-11 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 ${
              tab === 'assistant'
                ? 'bg-[#6C67F0] text-white shadow-md shadow-indigo-500/20'
                : 'text-[#3B3486] hover:bg-indigo-50/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Skin Assistant</span>
          </button>
        </div>

        {tab === 'checker' ? (
          <div className="space-y-5">
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <label
                  htmlFor="ingredient-textarea"
                  className="text-sm font-extrabold text-[#1E1B4B]"
                >
                  Daftar Komposisi / Ingredients Produk
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      applyPresetIngredients(
                        'Aqua, Niacinamide, Ceramide NP, Hyaluronic Acid, Centella Asiatica, Glycerin'
                      )
                    }
                    className="text-xs font-semibold text-[#5B56E0] bg-[#F3F1FF] hover:bg-[#E5E1FF] px-3 py-1.5 rounded-xl transition-colors"
                  >
                    Contoh Aman (Ceramide)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      applyPresetIngredients(
                        'Aqua, Alcohol Denat, Fragrance, Sodium Lauryl Sulfate (SLS), Paraben'
                      )
                    }
                    className="text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    Contoh Pemicu Sensitif
                  </button>
                </div>
              </div>

              <form onSubmit={handleRunIngredientCheck}>
                <textarea
                  id="ingredient-textarea"
                  rows={3}
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="Pisahkan dengan koma, contoh: Niacinamide, Ceramide, Alcohol Denat, Fragrance..."
                  className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#6C67F0] mb-4"
                />

                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#6C67F0] hover:bg-[#5B56E0] text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Analisis Kecocokan Bahan</span>
                </button>
              </form>
            </div>

            {/* Result Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Hasil Kecocokan dengan Kulit {latestScan.skinProfile} ({latestScan.skinTag})
                  </p>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B] mt-0.5">
                    {checkResult.verdict}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-[#4F46E5] tabular-nums">
                    {checkResult.overallScore}/100
                  </span>
                  <p className="text-[11px] text-slate-400">Safety Score</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                {checkResult.summary}
              </p>

              <div className="space-y-3">
                {checkResult.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#F8F7FF] border border-indigo-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#1E1B4B]">
                        {item.name}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          · {item.function}
                        </span>
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">{item.note}</p>
                    </div>
                    <span
                      className={`text-xs font-bold shrink-0 ${
                        item.status.includes('Hindari')
                          ? 'text-rose-600'
                          : item.status.includes('Perhatian')
                          ? 'text-amber-600'
                          : 'text-emerald-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 flex flex-col h-[540px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#6C67F0] text-white'
                        : 'bg-[#F6F5FF] text-[#1E1B4B] border border-indigo-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tanyakan soal jerawat, komedo, urutan skincare..."
                className="flex-1 h-12 px-4 rounded-full border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#6C67F0]"
              />
              <button
                type="submit"
                disabled={isSendingChat}
                aria-label="Kirim pesan"
                className="w-12 h-12 rounded-full bg-[#6C67F0] hover:bg-[#5B56E0] text-white flex items-center justify-center shrink-0 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

interface FavoritesViewProps {
  favoriteProductIds: string[];
  bookmarkedFoodIds: string[];
  onToggleFavoriteProduct: (id: string) => void;
  onToggleBookmarkFood: (id: string) => void;
  onOpenProductDetail: (product: SkincareProduct) => void;
  onExploreProducts: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteProductIds,
  bookmarkedFoodIds,
  onToggleFavoriteProduct,
  onToggleBookmarkFood,
  onOpenProductDetail,
  onExploreProducts,
}) => {
  const favProducts = SKINCARE_PRODUCTS.filter((p) => favoriteProductIds.includes(p.id));
  const favFoods = HEALTHY_FOODS.filter((f) => bookmarkedFoodIds.includes(f.id));

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B]">
              Favorit &amp; Tersimpan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Daftar produk skincare dan makanan sehat pilihanmu.
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreProducts}
            className="px-4 py-2 rounded-full bg-[#6C67F0] text-white text-xs font-bold whitespace-nowrap shrink-0"
          >
            Tambah Produk
          </button>
        </div>

        {/* Skincare Favorit */}
        <div className="mb-8">
          <h2 className="text-base sm:text-lg font-extrabold text-[#1E1B4B] mb-3">
            Produk Skincare Favorit ({favProducts.length})
          </h2>

          {favProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center border border-indigo-100/80">
              <Heart className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-500">
                Belum ada produk skincare favorit.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-indigo-100/80 flex items-center gap-4"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-contain rounded-2xl bg-[#F8F7FF] p-2 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => onOpenProductDetail(p)}
                      className="text-left"
                    >
                      <h3 className="text-sm font-extrabold text-[#1E1B4B] hover:text-[#6C67F0] truncate">
                        {p.name}
                      </h3>
                    </button>
                    <p className="text-xs font-bold text-[#4F46E5] mt-1">
                      {p.formattedPrice}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                      Cocok {p.matchScore}%
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Hapus ${p.name} dari favorit`}
                    onClick={() => onToggleFavoriteProduct(p.id)}
                    className="w-9 h-9 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Makanan Tersimpan */}
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#1E1B4B] mb-3">
            Makanan Sehat Tersimpan ({favFoods.length})
          </h2>

          {favFoods.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center border border-indigo-100/80">
              <p className="text-xs sm:text-sm text-slate-500">
                Belum ada makanan sehat yang disimpan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favFoods.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-indigo-100/80 flex items-center gap-4"
                >
                  <img
                    src={f.imageUrl}
                    alt={f.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-contain rounded-2xl bg-[#F8F7FF] p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-extrabold text-[#1E1B4B]">
                      {f.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                      {f.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Hapus ${f.name} dari tersimpan`}
                    onClick={() => onToggleBookmarkFood(f.id)}
                    className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-rose-600 flex items-center justify-center shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
