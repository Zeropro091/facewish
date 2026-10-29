/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Home,
  Clock,
  ScanLine,
  Heart,
  User,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Lock,
  CheckCircle2,
  Droplets,
  ShieldCheck,
  Sun,
  PlayCircle,
} from 'lucide-react';
import {
  DEFAULT_USER_PROFILE,
  DEFAULT_PREFERENCES,
  DEFAULT_SCAN_RESULT,
  SKINCARE_PRODUCTS,
  UserProfile,
  HealthPreferences,
  SkinScanResult,
  ProductCategory,
  SkincareProduct,
} from './utils/skinLogic';
import { OnboardingAndAuth, OnboardingStep } from './components/OnboardingAndAuth';
import { AISkinScanView, AnalysisResultView } from './components/ScanAndAnalysis';
import {
  RecommendationsHubView,
  ProductCatalogView,
  ProductFullDetailView,
  HealthyFoodRecommendationsView,
} from './components/RecommendationsView';
import {
  ProfileMainView,
  PersonalDataView,
  HealthPreferencesView,
  PremiumMembershipView,
  ScanHistoryView,
  IngredientCheckerAndAssistantView,
  FavoritesView,
} from './components/ProfileAndToolsView';

export type ActiveScreen =
  | 'onboarding'
  | 'home'
  | 'scan'
  | 'analysis-result'
  | 'recommendations-hub'
  | 'product-catalog'
  | 'product-detail'
  | 'food-recommendations'
  | 'ingredient-checker'
  | 'skin-assistant'
  | 'history'
  | 'favorites'
  | 'profile'
  | 'personal-data'
  | 'health-preferences'
  | 'premium';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const startInOnboarding = params.get('onboarding') === '1';

  const [screen, setScreen] = useState<ActiveScreen>(
    startInOnboarding ? 'onboarding' : 'home'
  );
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('splash');

  const [user, setUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [preferences, setPreferences] = useState<HealthPreferences>(DEFAULT_PREFERENCES);
  const [scans, setScans] = useState<SkinScanResult[]>([DEFAULT_SCAN_RESULT]);
  const [activeScan, setActiveScan] = useState<SkinScanResult>(DEFAULT_SCAN_RESULT);

  const [selectedProductCategory, setSelectedProductCategory] =
    useState<ProductCategory>('Face Wash');
  const [selectedProduct, setSelectedProduct] = useState<SkincareProduct>(
    SKINCARE_PRODUCTS[6] // La Roche-Posay Anthelios UVMune 400 SPF 50+
  );

  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([
    'fw-cerave',
    'moist-skintific',
    'sun-lrp',
  ]);
  const [bookmarkedFoodIds, setBookmarkedFoodIds] = useState<string[]>([
    'food-alpukat',
    'food-berry',
  ]);

  const handleToggleFavoriteProduct = (productId: string) => {
    setFavoriteProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleToggleBookmarkFood = (foodId: string) => {
    setBookmarkedFoodIds((prev) =>
      prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]
    );
  };

  const handleScanComplete = (newScan: SkinScanResult) => {
    setScans((prev) => [newScan, ...prev]);
    setActiveScan(newScan);
    setScreen('analysis-result');
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [screen, selectedProductCategory]);

  // Full-screen Onboarding & Auth flow (Pages 1 - 6 & 27)
  if (screen === 'onboarding') {
    return (
      <OnboardingAndAuth
        step={onboardingStep}
        onChangeStep={setOnboardingStep}
        onCompleteAuth={(userData) => {
          if (userData?.fullName) {
            setUser((prev) => ({
              ...prev,
              fullName: userData.fullName || prev.fullName,
              email: userData.emailOrPhone?.includes('@')
                ? userData.emailOrPhone
                : prev.email,
            }));
          }
          setScreen('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F6F5FF] text-[#1E1B4B] flex flex-col">
      {/* Strict 3-Zone Top Bar Contract for Desktop & Tablet */}
      <header className="hidden md:flex sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-indigo-100 px-8 h-14 items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            setScreen('home');
          }}
          className="text-xl font-extrabold tracking-tight text-[#2D2A6E] whitespace-nowrap shrink-0"
        >
          FaceWish
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navigasi Utama"
          className="flex items-center gap-6 text-sm font-semibold text-slate-600"
        >
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              setScreen('home');
            }}
            className={`hover:text-[#6C67F0] transition-colors whitespace-nowrap shrink-0 ${
              screen === 'home' ? 'text-[#6C67F0] underline underline-offset-8' : ''
            }`}
          >
            Beranda
          </a>
          <a
            href="#riwayat"
            onClick={(e) => {
              e.preventDefault();
              setScreen('history');
            }}
            className={`hover:text-[#6C67F0] transition-colors whitespace-nowrap shrink-0 ${
              screen === 'history' ? 'text-[#6C67F0] underline underline-offset-8' : ''
            }`}
          >
            Riwayat
          </a>
          <a
            href="#rekomendasi"
            onClick={(e) => {
              e.preventDefault();
              setScreen('recommendations-hub');
            }}
            className={`hover:text-[#6C67F0] transition-colors whitespace-nowrap shrink-0 ${
              [
                'recommendations-hub',
                'product-catalog',
                'product-detail',
                'food-recommendations',
              ].includes(screen)
                ? 'text-[#6C67F0] underline underline-offset-8'
                : ''
            }`}
          >
            Rekomendasi
          </a>
          <a
            href="#preferensi"
            onClick={(e) => {
              e.preventDefault();
              setScreen('health-preferences');
            }}
            className={`hover:text-[#6C67F0] transition-colors whitespace-nowrap shrink-0 ${
              screen === 'health-preferences'
                ? 'text-[#6C67F0] underline underline-offset-8'
                : ''
            }`}
          >
            Preferensi
          </a>
          <a
            href="#profil"
            onClick={(e) => {
              e.preventDefault();
              setScreen('profile');
            }}
            className={`hover:text-[#6C67F0] transition-colors whitespace-nowrap shrink-0 ${
              ['profile', 'personal-data', 'premium'].includes(screen)
                ? 'text-[#6C67F0] underline underline-offset-8'
                : ''
            }`}
          >
            Profil
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setScreen('scan')}
            className="px-4 py-2 text-xs font-bold text-white bg-[#6C67F0] hover:bg-[#5B56E0] rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            Mulai Scan
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-10">
        {screen === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-5 sm:pt-6">
            {/* Greeting Row matching PDF Pages 7 & 14 */}
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B]">
                  Hai, {user.fullName}!
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Yuk kenali kondisi kulitmu.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setOnboardingStep('splash');
                    setScreen('onboarding');
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-indigo-100 text-xs font-semibold text-[#5B56E0] hover:bg-indigo-50 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Intro &amp; Login</span>
                </button>

                <button
                  type="button"
                  aria-label="Buka Profil Rangga"
                  onClick={() => setScreen('profile')}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Responsive 2-Column Layout on Desktop, Native Mobile Flow on Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left / Main Column: Hero Scan Banner + 4 Jelajahi Cards + Tips Banner */}
              <div className="lg:col-span-8 space-y-5">
                {/* Hero Banner Card matching PDF Pages 7 & 14 */}
                <div className="bg-gradient-to-r from-[#E6E2FF] via-[#DFDAFE] to-[#DBD5FE] rounded-3xl p-4 sm:p-6 shadow-sm border border-indigo-200/70 relative overflow-hidden">
                  <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                    <div className="col-span-7 sm:col-span-6 z-10">
                      <p className="text-[11px] sm:text-xs font-bold text-[#4F46E5] flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>Belum ada scan</span>
                      </p>

                      <h2 className="text-xl sm:text-3xl font-extrabold text-[#1E1B4B] leading-tight mb-2">
                        Mulai Kenali
                        <br />
                        Kulitmu
                      </h2>

                      <p className="text-[11px] sm:text-sm text-[#2D2A6E]/85 leading-relaxed mb-4 max-w-xs">
                        Lakukan scan wajah pertama untuk mendapatkan analisis kulit yang lebih personal.
                      </p>

                      <button
                        type="button"
                        onClick={() => setScreen('scan')}
                        className="h-11 sm:h-12 px-4 sm:px-6 rounded-full bg-gradient-to-r from-[#635EE2] to-[#7C78F6] hover:from-[#524DD1] hover:to-[#6C67F0] text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <ScanLine className="w-4 h-4" />
                        <span>Mulai Scan</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="col-span-5 sm:col-span-6 flex justify-end sm:justify-center">
                      <img
                        src="/assets/facewish/hero_3d_face.jpg"
                        alt="3D AI Skin Scan Mesh - Texture, Kelembapan, Minyak, Kemerahan"
                        referrerPolicy="no-referrer"
                        className="w-40 h-44 sm:w-64 sm:h-64 object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Jelajahi FaceWish (4 Feature Cards in 4-col row matching PDF Pages 7 & 14) */}
                <div>
                  <h2 className="text-base sm:text-xl font-extrabold text-[#1E1B4B]">
                    Jelajahi FaceWish
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 mb-3">
                    Fitur yang bisa kamu gunakan
                  </p>

                  <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
                    {/* 1. Analisis Kulit */}
                    <button
                      type="button"
                      onClick={() => setScreen('analysis-result')}
                      className="bg-white hover:bg-[#FBFaff] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-sm border border-indigo-100/80 hover:border-[#6C67F0] transition-all flex flex-col items-center text-center group"
                    >
                      <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden mb-2 flex items-center justify-center bg-[#F8F7FF]">
                        <img
                          src="/assets/facewish/feat_analisis.jpg"
                          alt="Analisis Kulit"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-[11px] sm:text-sm font-extrabold text-[#1E1B4B] leading-tight">
                        Analisis Kulit
                      </h3>
                      <p className="text-[9px] sm:text-[11px] text-slate-500 mt-1 leading-tight">
                        Pahami kondisi kulitmu
                      </p>
                    </button>

                    {/* 2. Rekomendasi Produk */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProductCategory('Face Wash');
                        setScreen('product-catalog');
                      }}
                      className="bg-white hover:bg-[#FBFaff] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-sm border border-indigo-100/80 hover:border-[#6C67F0] transition-all flex flex-col items-center text-center group"
                    >
                      <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden mb-2 flex items-center justify-center bg-[#F8F7FF]">
                        <img
                          src="/assets/facewish/feat_produk.jpg"
                          alt="Rekomendasi Produk"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-[11px] sm:text-sm font-extrabold text-[#1E1B4B] leading-tight">
                        Rekomendasi Produk
                      </h3>
                      <p className="text-[9px] sm:text-[11px] text-slate-500 mt-1 leading-tight">
                        Temukan skincare yang cocok
                      </p>
                    </button>

                    {/* 3. Ingredient Checker */}
                    <button
                      type="button"
                      onClick={() => setScreen('ingredient-checker')}
                      className="bg-white hover:bg-[#FBFaff] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-sm border border-indigo-100/80 hover:border-[#6C67F0] transition-all flex flex-col items-center text-center group"
                    >
                      <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden mb-2 flex items-center justify-center bg-[#F8F7FF]">
                        <img
                          src="/assets/facewish/feat_ingredient.jpg"
                          alt="Ingredient Checker"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-[11px] sm:text-sm font-extrabold text-[#1E1B4B] leading-tight">
                        Ingredient Checker
                      </h3>
                      <p className="text-[9px] sm:text-[11px] text-slate-500 mt-1 leading-tight">
                        Cek kandungan &amp; kecocokan produk
                      </p>
                    </button>

                    {/* 4. Rekomendasi Makanan */}
                    <button
                      type="button"
                      onClick={() => setScreen('food-recommendations')}
                      className="bg-white hover:bg-[#FBFaff] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-sm border border-indigo-100/80 hover:border-[#6C67F0] transition-all flex flex-col items-center text-center group"
                    >
                      <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden mb-2 flex items-center justify-center bg-[#F8F7FF]">
                        <img
                          src="/assets/facewish/feat_makanan.jpg"
                          alt="Rekomendasi Makanan"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-[11px] sm:text-sm font-extrabold text-[#1E1B4B] leading-tight">
                        Rekomendasi Makanan
                      </h3>
                      <p className="text-[9px] sm:text-[11px] text-slate-500 mt-1 leading-tight">
                        Pilihan makanan bergizi untukmu
                      </p>
                    </button>
                  </div>
                </div>

                {/* Tips untukmu + AI Skin Assistant (Premium) Banner matching PDF Pages 7 & 14 */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                      <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-[#3B3486]">
                        Tips untukmu
                      </h3>
                      <p className="text-[11px] sm:text-sm text-slate-600 leading-snug mt-0.5 max-w-md">
                        Sebelum melakukan scan, pastikan wajahmu terlihat jelas dan pencahayaan cukup agar hasil lebih akurat.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setScreen('skin-assistant')}
                    className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-[#8E8AFF] to-[#6C67F0] hover:from-[#7A75F5] hover:to-[#5B56E0] text-white text-[10px] sm:text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-1.5 shrink-0 text-left leading-tight"
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      AI Skin Assistant
                      <br />
                      (Premium)
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column: Latest Scan Summary & Personalized Routine Preview */}
              <div className="lg:col-span-4 space-y-5">
                {/* Latest Skin Score Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-extrabold text-[#1E1B4B]">
                        Ringkasan Kulitmu
                      </h2>
                      <p className="text-xs text-slate-500">
                        {activeScan.date} · {activeScan.time}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setScreen('analysis-result')}
                      className="text-xs font-bold text-[#5B56E0] hover:underline"
                    >
                      Detail Lengkap
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F7FF] flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Skin Score</p>
                      <p className="text-2xl font-extrabold text-[#4F46E5] tabular-nums">
                        {activeScan.skinScore}/100
                      </p>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">
                        {activeScan.scoreLabel} · {activeScan.skinProfile} ({activeScan.skinTag})
                      </p>
                    </div>
                    <img
                      src={activeScan.imageUrl}
                      alt="Hasil Scan Rangga"
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-indigo-200"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div className="p-2.5 rounded-2xl bg-slate-50">
                      <p className="text-[11px] text-slate-500">Kelembapan</p>
                      <p className="text-sm font-extrabold text-emerald-600 tabular-nums">
                        {activeScan.metrics.kelembapan.value}%
                      </p>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-slate-50">
                      <p className="text-[11px] text-slate-500">Minyak</p>
                      <p className="text-sm font-extrabold text-rose-500 tabular-nums">
                        {activeScan.metrics.minyak.value}%
                      </p>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-slate-50">
                      <p className="text-[11px] text-slate-500">Pori-pori</p>
                      <p className="text-sm font-extrabold text-amber-600 tabular-nums">
                        {activeScan.metrics.pori.value}%
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setScreen('recommendations-hub')}
                    className="w-full h-11 rounded-full bg-[#F3F1FF] hover:bg-[#E5E1FF] text-[#4F46E5] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Lihat Rekomendasi Untukmu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Skincare Categories */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80">
                  <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-base font-extrabold text-[#1E1B4B]">
                      Rekomendasi Utama
                    </h2>
                    <button
                      type="button"
                      onClick={() => setScreen('product-catalog')}
                      className="text-xs font-bold text-[#5B56E0] hover:underline"
                    >
                      Semua
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProductCategory('Face Wash');
                        setScreen('product-catalog');
                      }}
                      className="w-full p-3 rounded-2xl bg-[#F8F7FF] hover:bg-[#EFEeff] flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Droplets className="w-5 h-5 text-[#5B56E0]" />
                        <div>
                          <p className="text-xs font-bold text-[#1E1B4B]">
                            CeraVe Foaming Cleanser
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Face Wash · Cocok 94%
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5B56E0]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProductCategory('Moisturizer');
                        setScreen('product-catalog');
                      }}
                      className="w-full p-3 rounded-2xl bg-[#F8F7FF] hover:bg-[#EFEeff] flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-[#5B56E0]" />
                        <div>
                          <p className="text-xs font-bold text-[#1E1B4B]">
                            Skintific 5X Ceramide Gel
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Moisturizer · Cocok 95%
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5B56E0]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProductCategory('Sunscreen');
                        setScreen('product-catalog');
                      }}
                      className="w-full p-3 rounded-2xl bg-[#F8F7FF] hover:bg-[#EFEeff] flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Sun className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="text-xs font-bold text-[#1E1B4B]">
                            La Roche-Posay Anthelios SPF 50+
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Sunscreen · Cocok 90%
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5B56E0]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === 'scan' && (
          <AISkinScanView
            preferences={preferences}
            onBack={() => setScreen('home')}
            onScanComplete={handleScanComplete}
          />
        )}

        {screen === 'analysis-result' && (
          <AnalysisResultView
            result={activeScan}
            onBack={() => setScreen('home')}
            onViewRecommendations={() => setScreen('recommendations-hub')}
            onRescan={() => setScreen('scan')}
          />
        )}

        {screen === 'recommendations-hub' && (
          <RecommendationsHubView
            onBack={() => setScreen('analysis-result')}
            onSelectProductCategory={(cat) => {
              setSelectedProductCategory(cat);
              setScreen('product-catalog');
            }}
            onOpenFoodRecommendations={() => setScreen('food-recommendations')}
            onOpenIngredientChecker={() => setScreen('ingredient-checker')}
          />
        )}

        {screen === 'product-catalog' && (
          <ProductCatalogView
            initialCategory={selectedProductCategory}
            preferences={preferences}
            favoriteProductIds={favoriteProductIds}
            onToggleFavoriteProduct={handleToggleFavoriteProduct}
            onBack={() => setScreen('recommendations-hub')}
            onOpenFullProductDetail={(prod) => {
              setSelectedProduct(prod);
              setScreen('product-detail');
            }}
          />
        )}

        {screen === 'product-detail' && (
          <ProductFullDetailView
            product={selectedProduct}
            onBack={() => setScreen('product-catalog')}
            onSelectCategory={(cat) => {
              setSelectedProductCategory(cat);
              setScreen('product-catalog');
            }}
          />
        )}

        {screen === 'food-recommendations' && (
          <HealthyFoodRecommendationsView
            preferences={preferences}
            bookmarkedFoodIds={bookmarkedFoodIds}
            onToggleBookmarkFood={handleToggleBookmarkFood}
            onBack={() => setScreen('recommendations-hub')}
            onOpenScanHistory={() => setScreen('history')}
            onOpenPreferences={() => setScreen('health-preferences')}
          />
        )}

        {(screen === 'ingredient-checker' || screen === 'skin-assistant') && (
          <IngredientCheckerAndAssistantView
            initialTab={screen === 'skin-assistant' ? 'assistant' : 'checker'}
            preferences={preferences}
            latestScan={activeScan}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'history' && (
          <ScanHistoryView
            scans={scans}
            user={user}
            onBack={() => setScreen('home')}
            onSelectScan={(s) => {
              setActiveScan(s);
              setScreen('analysis-result');
            }}
            onOpenPremium={() => setScreen('premium')}
            onStartNewScan={() => setScreen('scan')}
          />
        )}

        {screen === 'favorites' && (
          <FavoritesView
            favoriteProductIds={favoriteProductIds}
            bookmarkedFoodIds={bookmarkedFoodIds}
            onToggleFavoriteProduct={handleToggleFavoriteProduct}
            onToggleBookmarkFood={handleToggleBookmarkFood}
            onOpenProductDetail={(prod) => {
              setSelectedProduct(prod);
              setScreen('product-detail');
            }}
            onExploreProducts={() => setScreen('product-catalog')}
          />
        )}

        {screen === 'profile' && (
          <ProfileMainView
            user={user}
            onBack={() => setScreen('home')}
            onOpenPersonalData={() => setScreen('personal-data')}
            onOpenPreferences={() => setScreen('health-preferences')}
            onOpenScanHistory={() => setScreen('history')}
            onOpenPremium={() => setScreen('premium')}
            onLogout={() => {
              setOnboardingStep('login');
              setScreen('onboarding');
            }}
          />
        )}

        {screen === 'personal-data' && (
          <PersonalDataView
            user={user}
            onUpdateUser={setUser}
            onBack={() => setScreen('profile')}
          />
        )}

        {screen === 'health-preferences' && (
          <HealthPreferencesView
            preferences={preferences}
            onSavePreferences={setPreferences}
            onBack={() => setScreen('profile')}
          />
        )}

        {screen === 'premium' && (
          <PremiumMembershipView
            user={user}
            onSelectPlan={(plan) =>
              setUser((prev) => ({
                ...prev,
                memberLevel: 'Premium',
                premiumPlan: plan,
              }))
            }
            onBack={() => setScreen('profile')}
          />
        )}
      </main>

      {/* Mobile Bottom Tab Bar matching PDF Pages 7, 8, 14 (<= 15% viewport height) */}
      <nav
        aria-label="Navigasi Bawah"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-indigo-100 h-16 px-2 grid grid-cols-5 items-center"
      >
        <button
          type="button"
          onClick={() => setScreen('home')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            screen === 'home' ? 'text-[#6C67F0]' : 'text-slate-500 hover:text-[#1E1B4B]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Beranda</span>
        </button>

        <button
          type="button"
          onClick={() => setScreen('history')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            screen === 'history' ? 'text-[#6C67F0]' : 'text-slate-500 hover:text-[#1E1B4B]'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Riwayat</span>
        </button>

        <div className="flex flex-col items-center justify-center h-full">
          <button
            type="button"
            aria-label="Mulai Scan Wajah"
            onClick={() => setScreen('scan')}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5B56E0] to-[#807BF8] text-white shadow-md shadow-indigo-500/30 flex items-center justify-center -mt-3"
          >
            <ScanLine className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-bold text-[#5B56E0] mt-0.5">Scan</span>
        </div>

        <button
          type="button"
          onClick={() => setScreen('favorites')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            screen === 'favorites' ? 'text-[#6C67F0]' : 'text-slate-500 hover:text-[#1E1B4B]'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Favorit</span>
        </button>

        <button
          type="button"
          onClick={() => setScreen('profile')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            ['profile', 'personal-data', 'health-preferences', 'premium'].includes(screen)
              ? 'text-[#6C67F0]'
              : 'text-slate-500 hover:text-[#1E1B4B]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Profil</span>
        </button>
      </nav>
    </div>
  );
}
