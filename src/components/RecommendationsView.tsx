import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sun,
  Droplets,
  ShieldCheck,
  Feather,
  Lightbulb,
  CheckCircle2,
  Star,
  ShoppingBag,
  X,
  Search,
  Bookmark,
  Heart,
  Utensils,
  Sparkles,
  BookOpen,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import {
  SkincareProduct,
  ProductCategory,
  HealthyFoodItem,
  FoodCategory,
  HealthPreferences,
  SKINCARE_PRODUCTS,
  HEALTHY_FOODS,
  evaluateProductCompatibility,
  filterFoodsByCategoryAndPreferences,
} from '../utils/skinLogic';

interface RecommendationsHubProps {
  onBack: () => void;
  onSelectProductCategory: (category: ProductCategory) => void;
  onOpenFoodRecommendations: () => void;
  onOpenIngredientChecker: () => void;
}

export const RecommendationsHubView: React.FC<RecommendationsHubProps> = ({
  onBack,
  onSelectProductCategory,
  onOpenFoodRecommendations,
  onOpenIngredientChecker,
}) => {
  const [activeTab, setActiveTab] = useState<'skincare' | 'food'>('skincare');

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header matching PDF Page 17 */}
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
              Rekomendasi Untukmu
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Pilihan terbaik untuk kulit sehat dan hidup lebih sehat.
            </p>
          </div>
        </div>

        {/* Segmented Control: Skincare | Healthy Food (PDF Page 17) */}
        <div className="bg-white p-1.5 rounded-full shadow-xs border border-indigo-100 flex items-center mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('skincare')}
            className={`flex-1 h-12 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'skincare'
                ? 'bg-[#6C67F0] text-white shadow-md shadow-indigo-500/20'
                : 'text-[#3B3486] hover:bg-indigo-50/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Skincare</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('food');
              onOpenFoodRecommendations();
            }}
            className={`flex-1 h-12 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'food'
                ? 'bg-[#6C67F0] text-white shadow-md shadow-indigo-500/20'
                : 'text-[#3B3486] hover:bg-indigo-50/50'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Healthy Food</span>
          </button>
        </div>

        {/* Banner Card matching PDF Page 17 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-7 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
          <div className="flex-1">
            <h2
              className="text-base sm:text-lg font-extrabold text-[#1E1B4B] leading-snug mb-3"
              style={{ textWrap: 'balance' }}
            >
              Perawatan kulit &amp; pola makan sehat, langkah kecil untuk hasil besar!
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
              <span>Kulit lebih sehat</span>
              <span aria-hidden="true">·</span>
              <span>Energi lebih baik</span>
              <span aria-hidden="true">·</span>
              <span>Hidup lebih seimbang</span>
            </div>
          </div>

          <div className="w-36 h-28 sm:w-44 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-[#F8F7FF]">
            <img
              src="/assets/facewish/banner_skincare_girl.jpg"
              alt="Perawatan kulit sehat"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section: Rekomendasi Skincare (Face Wash, Moisturizer, Sunscreen - PDF Page 17) */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B]">
            Rekomendasi Skincare
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 mb-4">
            Produk yang disarankan sesuai dengan kondisi kulitmu.
          </p>

          <div className="space-y-4">
            {/* 1. Face Wash */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0 mt-1">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B4B]">
                    Face Wash
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-3.5 max-w-sm">
                    Membersihkan wajah dari kotoran, minyak berlebih, dan sisa makeup.
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectProductCategory('Face Wash')}
                    className="px-4 py-2 rounded-full bg-[#F3F1FF] hover:bg-[#E5E1FF] text-[#4F46E5] text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Lihat Rekomendasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <img
                  src="/assets/facewish/cat_facewash.jpg"
                  alt="Cetaphil Face Wash"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl"
                />
                <button
                  type="button"
                  aria-label="Buka kategori Face Wash"
                  onClick={() => onSelectProductCategory('Face Wash')}
                  className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#4F46E5] hover:bg-[#E5E1FF] flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. Moisturizer */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0 mt-1">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B4B]">
                    Moisturizer
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-3.5 max-w-sm">
                    Menjaga kelembapan kulit dan memperkuat skin barrier.
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectProductCategory('Moisturizer')}
                    className="px-4 py-2 rounded-full bg-[#F3F1FF] hover:bg-[#E5E1FF] text-[#4F46E5] text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Lihat Rekomendasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <img
                  src="/assets/facewish/cat_moisturizer.jpg"
                  alt="Skintific 5X Ceramide Moisturizer"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl"
                />
                <button
                  type="button"
                  aria-label="Buka kategori Moisturizer"
                  onClick={() => onSelectProductCategory('Moisturizer')}
                  className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#4F46E5] hover:bg-[#E5E1FF] flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3. Sunscreen */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 mt-1">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B4B]">
                    Sunscreen
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-3.5 max-w-sm">
                    Melindungi kulit dari sinar UV dan mencegah penuaan dini.
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectProductCategory('Sunscreen')}
                    className="px-4 py-2 rounded-full bg-[#F3F1FF] hover:bg-[#E5E1FF] text-[#4F46E5] text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Lihat Rekomendasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <img
                  src="/assets/facewish/cat_sunscreen.jpg"
                  alt="La Roche-Posay Sunscreen"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl"
                />
                <button
                  type="button"
                  aria-label="Buka kategori Sunscreen"
                  onClick={() => onSelectProductCategory('Sunscreen')}
                  className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#4F46E5] hover:bg-[#E5E1FF] flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Rekomendasi Healthy Food & Ingredient Checker (PDF Page 24) */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B]">
            Rekomendasi Healthy Food
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 mb-4">
            Makanan bergizi yang cocok untuk mendukung kesehatan kulitmu dari dalam.
          </p>

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-indigo-100/80 mb-4">
            <div className="h-36 sm:h-44 w-full overflow-hidden">
              <img
                src="/assets/facewish/banner_healthy_salmon.jpg"
                alt="Healthy Food Bowl"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-emerald-700 mb-1">
                  Healthy Food
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B4B]">
                  Nutrisi Sehat, Kulit Lebih Bersinar
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-3.5 max-w-md">
                  Pilih makanan bergizi seperti buah, sayur, protein dan lemak baik untuk kulit yang sehat.
                </p>
                <button
                  type="button"
                  onClick={onOpenFoodRecommendations}
                  className="px-4 py-2 rounded-full bg-[#F3F1FF] hover:bg-[#E5E1FF] text-[#4F46E5] text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Lihat Rekomendasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                aria-label="Buka Rekomendasi Makanan"
                onClick={onOpenFoodRecommendations}
                className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#4F46E5] hover:bg-[#E5E1FF] flex items-center justify-center shrink-0 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Ingredient Checker Card (PDF Page 24) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#1E1B4B]">
                  Ingredient Checker
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-3 max-w-sm">
                  Cek keamanan bahan dalam produk skincare atau makanan yang kamu gunakan.
                </p>
                <button
                  type="button"
                  onClick={onOpenIngredientChecker}
                  className="px-4 py-2 rounded-full bg-[#E8E6FF] hover:bg-[#D8D4FF] text-[#4F46E5] text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Mulai Cek Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-label="Buka Ingredient Checker"
              onClick={onOpenIngredientChecker}
              className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#4F46E5] hover:bg-[#E5E1FF] flex items-center justify-center shrink-0 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductCatalogViewProps {
  initialCategory: ProductCategory;
  preferences: HealthPreferences;
  favoriteProductIds: string[];
  onToggleFavoriteProduct: (productId: string) => void;
  onBack: () => void;
  onOpenFullProductDetail: (product: SkincareProduct) => void;
}

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
  initialCategory,
  preferences,
  favoriteProductIds,
  onToggleFavoriteProduct,
  onBack,
  onOpenFullProductDetail,
}) => {
  const [category, setCategory] = useState<ProductCategory>(initialCategory);
  const [quickPreviewProduct, setQuickPreviewProduct] = useState<SkincareProduct | null>(null);
  const [showAllBonus, setShowAllBonus] = useState(false);

  const products = SKINCARE_PRODUCTS.filter((p) => p.category === category);

  const categoryCopy: Record<
    ProductCategory,
    { title: string; subtitle: string; whyTitle: string; whyBullets: string[] }
  > = {
    'Face Wash': {
      title: 'Facewash yang cocok',
      subtitle: 'Diformulasikan khusus untuk kulit kombinasi dan berjerawat.',
      whyTitle: 'Kenapa Facewash Ini Cocok?',
      whyBullets: [
        'Mengangkat kotoran & sebum berlebih pada area T-zone (72%).',
        'Formula pH seimbang yang tidak mengikis kelembapan alami kulit.',
        'Membantu membersihkan pori-pori besar serta komedo ringan.',
        'Aman untuk kulit kombinasi dan cenderung sensitif.',
      ],
    },
    Moisturizer: {
      title: 'Moisturizer yang cocok',
      subtitle: 'Menjaga kelembapan kulit tanpa membuat wajah terasa berminyak.',
      whyTitle: 'Kenapa Moisturizer Ini Cocok?',
      whyBullets: [
        'Menjaga kelembapan kulit tanpa membuat wajah berminyak.',
        'Membantu memperbaiki skin barrier yang sensitif.',
        'Tekstur ringan dan cepat meresap, tidak menyumbat pori.',
        'Cocok untuk kulit kombinasi dan cenderung berminyak.',
      ],
    },
    Sunscreen: {
      title: 'Sunscreen yang cocok',
      subtitle:
        'Melindungi kulit dari sinar UV dan mencegah kulit kusam. Pilih sunscreen yang sesuai dengan tipe dan kebutuhan kulitmu.',
      whyTitle: 'Kenapa Sunscreen Ini Cocok?',
      whyBullets: [
        'Melindungi kulit dari sinar UVA & UVB.',
        'Mencegah kulit kusam dan penuaan dini.',
        'Tekstur ringan, tidak menyumbat pori.',
        'Cocok untuk kulit kombinasi dan cenderung berminyak.',
      ],
    },
  };

  const activeCopy = categoryCopy[category];

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header matching PDF Pages 18, 19, 20 */}
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
              Rekomendasi Produk
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Produk yang disarankan sesuai dengan kondisi kulitmu.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs: Face Wash | Moisturizer | Sunscreen */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {(['Face Wash', 'Moisturizer', 'Sunscreen'] as ProductCategory[]).map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`h-12 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#6C67F0] text-white border-[#6C67F0] shadow-md shadow-indigo-500/20'
                    : 'bg-white text-[#2D2A6E] border-indigo-100 hover:bg-indigo-50/50'
                }`}
              >
                {cat === 'Face Wash' && <Droplets className="w-4 h-4 shrink-0" />}
                {cat === 'Moisturizer' && <ShieldCheck className="w-4 h-4 shrink-0" />}
                {cat === 'Sunscreen' && <Sun className="w-4 h-4 shrink-0" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Category Section Title */}
        <div className="mb-5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
            {activeCopy.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {activeCopy.subtitle}
          </p>
        </div>

        {/* Product List Cards matching PDF Pages 18, 19, 20 */}
        <div className="space-y-4 mb-6">
          {products.map((product) => {
            const compat = evaluateProductCompatibility(product, preferences);
            const isFav = favoriteProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-indigo-100/80 flex items-center gap-3.5 sm:gap-5 hover:border-indigo-200 transition-all"
              >
                {/* Product Thumbnail */}
                <button
                  type="button"
                  onClick={() => setQuickPreviewProduct(product)}
                  className="w-24 h-32 sm:w-36 sm:h-40 rounded-2xl bg-[#F8F7FF] flex items-center justify-center p-2 shrink-0 overflow-hidden group"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </button>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <button
                      type="button"
                      onClick={() => onOpenFullProductDetail(product)}
                      className="text-left"
                    >
                      <h3 className="text-sm sm:text-lg font-extrabold text-[#1E1B4B] hover:text-[#6C67F0] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] sm:text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Cocok {compat.adjustedMatchScore}%</span>
                      </span>
                      <button
                        type="button"
                        aria-label={
                          isFav ? `Hapus ${product.name} dari favorit` : `Simpan ${product.name} ke favorit`
                        }
                        onClick={() => onToggleFavoriteProduct(product.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                          isFav
                            ? 'bg-rose-50 border-rose-200 text-rose-500'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg font-extrabold text-[#4F46E5] tabular-nums mb-2">
                    {product.formattedPrice}
                  </p>

                  {/* Benefits list */}
                  <div className="space-y-1.5 mb-2">
                    {product.benefits.map((b, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[11px] sm:text-sm font-medium text-[#2D2A6E] bg-[#F6F5FF] px-3 py-1.5 rounded-xl"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#6C67F0] shrink-0" />
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sensitivity warning if triggered by user preferences */}
                  {!compat.isSafeForSensitivity && (
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[10px] sm:text-[11px] font-medium text-amber-800 flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{compat.warnings[0]}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setQuickPreviewProduct(product)}
                      className="text-[11px] sm:text-xs font-semibold text-[#5B56E0] hover:underline py-1"
                    >
                      Ringkasan Cepat
                    </button>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenFullProductDetail(product)}
                      className="text-[11px] sm:text-xs font-bold text-[#1E1B4B] hover:text-[#6C67F0] inline-flex items-center gap-1 py-1"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right Arrow Button matching PDF Pages 18-20 */}
                <button
                  type="button"
                  aria-label={`Lihat detail ${product.name}`}
                  onClick={() => onOpenFullProductDetail(product)}
                  className="flex w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F3F1FF] hover:bg-[#E2DEFF] text-[#4F46E5] items-center justify-center shrink-0 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Why Suitable Card matching PDF Pages 19 & 20 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 mb-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#3B3486] mb-2">
              {activeCopy.whyTitle}
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              {activeCopy.whyBullets.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {showAllBonus && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 mb-6">
            <h3 className="text-sm font-bold text-[#1E1B4B] mb-2">
              Tips Kombinasi Bahan Aktif untuk Kulitmu
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Untuk kulit Kombinasi &amp; Sensitif (Skor 68/100), gunakan{' '}
              <strong className="text-[#3B3486]">CeraVe Foaming Cleanser</strong> di pagi hari,
              kombinasikan dengan{' '}
              <strong className="text-[#3B3486]">Skintific 5X Ceramide Moisture Gel</strong> untuk
              menaikkan kelembapan dari 48%, dan kunci dengan{' '}
              <strong className="text-[#3B3486]">La Roche-Posay Anthelios SPF 50+</strong>.
            </p>
          </div>
        )}

        {/* Bottom CTA Button matching PDF Pages 18, 19, 20 */}
        <button
          type="button"
          onClick={() => setShowAllBonus((prev) => !prev)}
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#6C67F0] to-[#7C78F6] hover:from-[#5B56E0] hover:to-[#6C67F0] text-white font-bold text-base shadow-xl shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-5 h-5" />
          <span>
            {showAllBonus ? 'Sembunyikan Tips Kombinasi' : 'Lihat Rekomendasi lainnya'}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Product Bottom Sheet Modal matching PDF Page 21 */}
      {quickPreviewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Ringkasan ${quickPreviewProduct.name}`}
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              type="button"
              aria-label="Tutup ringkasan produk"
              onClick={() => setQuickPreviewProduct(null)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center absolute top-5 left-5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-10 sm:pt-6 items-center">
              <div className="sm:col-span-5 flex flex-col items-center">
                <div className="w-44 h-52 rounded-2xl bg-[#F8F7FF] p-3 flex items-center justify-center relative">
                  <img
                    src={quickPreviewProduct.imageUrl}
                    alt={quickPreviewProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                  {quickPreviewProduct.isBestSeller && (
                    <span className="absolute bottom-2 left-2 bg-[#6C67F0] text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-sm">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* 4 Feature Icons below image (PDF Page 21) */}
                <div className="grid grid-cols-4 gap-2 w-full mt-4 text-center">
                  {quickPreviewProduct.highlights.map((h, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center mb-1">
                        {h.icon === 'spf' && <Sun className="w-4 h-4" />}
                        {h.icon === 'feather' && <Feather className="w-4 h-4" />}
                        {h.icon === 'droplet' && <Droplets className="w-4 h-4" />}
                        {h.icon === 'shield' && <ShieldCheck className="w-4 h-4" />}
                      </div>
                      <span className="text-[10px] text-slate-600 leading-tight font-medium">
                        {h.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-7">
                <p className="text-xs font-semibold text-[#5B56E0] mb-1">
                  {quickPreviewProduct.category}
                </p>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B]">
                  {quickPreviewProduct.name}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 my-2.5">
                  <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {quickPreviewProduct.rating} ({quickPreviewProduct.reviewCount})
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-semibold">
                    Cocok untuk kulitmu
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-extrabold text-[#4F46E5] tabular-nums">
                    {quickPreviewProduct.formattedPrice}
                  </span>
                  {quickPreviewProduct.discountBadge && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                      {quickPreviewProduct.discountBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[#1E1B4B] mb-1.5">
                  Tentang Produk
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {quickPreviewProduct.description}
                </p>
              </div>
            </div>

            {/* Marketplace Strip matching PDF Page 21 */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F8F7FF] border border-indigo-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-[#5B56E0]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B4B]">
                    Tersedia di Marketplace
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Beli sekarang di official store terpercaya!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={quickPreviewProduct.marketplaces.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-orange-400 text-xs font-bold text-orange-600 transition-colors"
                >
                  Shopee
                </a>
                <a
                  href={quickPreviewProduct.marketplaces.tokopedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-xs font-bold text-emerald-600 transition-colors"
                >
                  Tokopedia
                </a>
                <a
                  href={quickPreviewProduct.marketplaces.lazada}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-pink-500 text-xs font-bold text-pink-600 transition-colors"
                >
                  Lazada
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  const target = quickPreviewProduct;
                  setQuickPreviewProduct(null);
                  onOpenFullProductDetail(target);
                }}
                className="flex-1 h-13 rounded-full bg-gradient-to-r from-[#6C67F0] to-[#7C78F6] hover:from-[#5B56E0] hover:to-[#6C67F0] text-white font-bold text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lihat di Marketplace &amp; Detail Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface ProductFullDetailViewProps {
  product: SkincareProduct;
  onBack: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const ProductFullDetailView: React.FC<ProductFullDetailViewProps> = ({
  product,
  onBack,
  onSelectCategory,
}) => {
  const [selectedStore, setSelectedStore] = useState<'shopee' | 'tokopedia' | 'lazada' | null>(
    null
  );

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header matching PDF Page 22 */}
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
              Rekomendasi Produk
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Produk yang disarankan sesuai dengan kondisi kulitmu.
            </p>
          </div>
        </div>

        {/* Category Switcher Strip matching PDF Page 22 */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {(['Face Wash', 'Moisturizer', 'Sunscreen'] as ProductCategory[]).map((cat) => {
            const isActive = product.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`h-12 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#6C67F0] text-white border-[#6C67F0] shadow-md shadow-indigo-500/20'
                    : 'bg-white text-[#2D2A6E] border-indigo-100 hover:bg-indigo-50/50'
                }`}
              >
                {cat === 'Face Wash' && <Droplets className="w-4 h-4 shrink-0" />}
                {cat === 'Moisturizer' && <ShieldCheck className="w-4 h-4 shrink-0" />}
                {cat === 'Sunscreen' && <Sun className="w-4 h-4 shrink-0" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Top Product Hero Card matching PDF Page 22 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-5 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-44 h-52 rounded-2xl bg-[#F8F7FF] p-3 flex items-center justify-center relative shrink-0">
            {product.isBestSeller && (
              <span className="absolute top-2 left-2 bg-[#6C67F0] text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-xs">
                Best Seller
              </span>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B]">
                {product.name}
              </h2>
              {product.discountBadge && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                  {product.discountBadge}
                </span>
              )}
            </div>

            <p className="text-2xl font-extrabold text-[#4F46E5] tabular-nums mt-1.5 mb-2">
              {product.formattedPrice}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-3.5">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cocok untuk kulitmu ({product.matchScore}%)
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            <div className="space-y-2">
              {product.benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#2D2A6E] bg-[#F6F5FF] px-3.5 py-2 rounded-xl"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6C67F0] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Produk Card with 4 Highlights matching PDF Page 22 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-[#1E1B4B]">
              Detail Produk
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
            {product.highlights.map((h, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#FBFaff]"
              >
                <div className="w-11 h-11 rounded-full bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center mb-2">
                  {h.icon === 'spf' && <Sun className="w-5 h-5" />}
                  {h.icon === 'feather' && <Feather className="w-5 h-5" />}
                  {h.icon === 'droplet' && <Droplets className="w-5 h-5" />}
                  {h.icon === 'shield' && <ShieldCheck className="w-5 h-5" />}
                </div>
                <span className="text-xs font-semibold text-[#2D2A6E]">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kenapa cocok untuk kulitmu? Card matching PDF Page 22 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-[#1E1B4B]">
              Kenapa cocok untuk kulitmu?
            </h3>
          </div>

          <ul className="space-y-2.5">
            {product.whySuitable.map((reason, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cara Penggunaan (Steps 1, 2, 3) matching PDF Page 22 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100/80 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-[#1E1B4B]">
              Cara Penggunaan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.howToUse.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F7FF]"
              >
                <span className="w-7 h-7 rounded-full bg-[#E8E6FF] text-[#4F46E5] text-xs font-extrabold flex items-center justify-center shrink-0 tabular-nums">
                  {s.step}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tersedia di Marketplace Card matching PDF Page 22 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1E1B4B]">
                Tersedia di Marketplace
              </h3>
              <p className="text-xs text-slate-500">
                Beli sekarang di official store terpercaya!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedStore('shopee')}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedStore === 'shopee'
                  ? 'bg-orange-50 border-orange-400 text-orange-700'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-orange-300'
              }`}
            >
              <span className="text-orange-600 font-extrabold">S</span>
              <span>Shopee Official Store</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedStore('tokopedia')}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedStore === 'tokopedia'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
              }`}
            >
              <span className="text-emerald-600 font-extrabold">T</span>
              <span>Tokopedia Official Store</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedStore('lazada')}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedStore === 'lazada'
                  ? 'bg-pink-50 border-pink-400 text-pink-700'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-pink-300'
              }`}
            >
              <span className="text-pink-600 font-extrabold">L</span>
              <span>Lazada Official Store</span>
            </button>
          </div>
        </div>

        {selectedStore && (
          <div className="mb-5 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#1E1B4B]">
                Official Store {selectedStore.toUpperCase()} — {product.name}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Harga: {product.formattedPrice} · Produk 100% Original BPOM
              </p>
            </div>
            <a
              href={product.marketplaces[selectedStore]}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#6C67F0] text-white text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Buka Toko</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Primary CTA Button matching PDF Page 22 */}
        <a
          href={product.marketplaces[selectedStore || 'shopee']}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#6C67F0] to-[#7C78F6] hover:from-[#5B56E0] hover:to-[#6C67F0] text-white font-bold text-base shadow-xl shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Beli Sekarang di Marketplace</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

interface HealthyFoodViewProps {
  preferences: HealthPreferences;
  bookmarkedFoodIds: string[];
  onToggleBookmarkFood: (foodId: string) => void;
  onBack: () => void;
  onOpenScanHistory: () => void;
  onOpenPreferences: () => void;
}

export const HealthyFoodRecommendationsView: React.FC<HealthyFoodViewProps> = ({
  preferences,
  bookmarkedFoodIds,
  onToggleBookmarkFood,
  onBack,
  onOpenScanHistory,
  onOpenPreferences,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('Semua');
  const [selectedFoodDetail, setSelectedFoodDetail] = useState<HealthyFoodItem | null>(null);

  const filteredFoods = filterFoodsByCategoryAndPreferences(
    HEALTHY_FOODS,
    selectedCategory,
    preferences
  );

  const categories: FoodCategory[] = [
    'Semua',
    'Untuk Jerawat',
    'Untuk Kulit Kering',
    'Untuk Kulit Sensitif',
  ];

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header matching PDF Page 25 */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-start gap-3.5">
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
                Rekomendasi Makanan
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Pilihan makanan bergizi untuk kulit yang lebih sehat.
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Atur Alergi dan Preferensi Makanan"
            onClick={onOpenPreferences}
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-[#5B56E0] hover:bg-indigo-50 transition-colors shrink-0"
          >
            <Utensils className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Tabs matching PDF Page 25 */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`h-11 px-4 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#6C67F0] text-white border-[#6C67F0] shadow-md shadow-indigo-500/20'
                    : 'bg-white text-[#2D2A6E] border-indigo-100 hover:bg-indigo-50/50'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Hero Banner Card matching PDF Page 25 */}
        <div className="bg-gradient-to-r from-[#ECE9FF] via-[#F3F1FF] to-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-100 mb-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex-1">
            <p className="text-xs font-bold text-[#5B56E0] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rekomendasi Harian</span>
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B] leading-tight mb-2">
              Makanan untuk
              <br />
              Kulit Bersih &amp; Sehat
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 max-w-sm">
              Kombinasi nutrisi yang tepat dapat membantu menjaga kesehatan kulit dari dalam.
            </p>
            <button
              type="button"
              onClick={() => setSelectedFoodDetail(HEALTHY_FOODS[0])}
              className="px-5 py-2.5 rounded-full bg-[#6C67F0] hover:bg-[#5B56E0] text-white text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all whitespace-nowrap shrink-0"
            >
              <span>Lihat Rekomendasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-48 h-36 sm:w-56 sm:h-44 rounded-2xl overflow-hidden shrink-0">
            <img
              src="/assets/facewish/food_hero_bowl.jpg"
              alt="Makanan untuk Kulit Bersih & Sehat"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Food List Section matching PDF Page 25 */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B]">
            Rekomendasi Makanan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 mb-4">
            Pilih makanan yang sesuai dengan kebutuhan kulitmu.
          </p>

          <div className="space-y-3.5">
            {filteredFoods.map((food) => {
              const isBookmarked = bookmarkedFoodIds.includes(food.id);
              return (
                <div
                  key={food.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-4 hover:border-indigo-200 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedFoodDetail(food)}
                    className="w-28 h-24 sm:w-32 sm:h-24 rounded-2xl overflow-hidden bg-[#F8F7FF] shrink-0"
                  >
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedFoodDetail(food)}
                        className="text-left"
                      >
                        <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B4B] hover:text-[#6C67F0] transition-colors">
                          {food.name}
                        </h3>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-2.5">
                      {food.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#4F46E5]">
                      {food.nutrients.map((nut, idx) => (
                        <React.Fragment key={nut}>
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <span>{nut}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    {food.hasAllergyWarning && (
                      <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-800 inline-flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>
                          Perhatian Alergi: Mengandung {food.matchedAllergens.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <button
                      type="button"
                      aria-label={
                        isBookmarked
                          ? `Hapus ${food.name} dari tersimpan`
                          : `Simpan ${food.name}`
                      }
                      onClick={() => onToggleBookmarkFood(food.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isBookmarked
                          ? 'bg-indigo-100 text-[#4F46E5]'
                          : 'bg-slate-50 text-slate-400 hover:text-[#4F46E5]'
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isBookmarked ? 'fill-[#4F46E5]' : ''}`}
                      />
                    </button>

                    <button
                      type="button"
                      aria-label={`Detail nutrisi ${food.name}`}
                      onClick={() => setSelectedFoodDetail(food)}
                      className="w-10 h-10 rounded-full bg-[#F3F1FF] text-[#4F46E5] hover:bg-[#E5E1FF] flex items-center justify-center transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Button matching PDF Page 25 */}
        <button
          type="button"
          onClick={onOpenScanHistory}
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#6C67F0] to-[#7C78F6] hover:from-[#5B56E0] hover:to-[#6C67F0] text-white font-bold text-base shadow-xl shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-5 h-5" />
          <span>Lihat Riwayat &amp; Progress</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Food Detail Modal */}
      {selectedFoodDetail && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Detail Nutrisi ${selectedFoodDetail.name}`}
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
            <button
              type="button"
              aria-label="Tutup detail makanan"
              onClick={() => setSelectedFoodDetail(null)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center absolute top-5 right-5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedFoodDetail.imageUrl}
                alt={selectedFoodDetail.name}
                referrerPolicy="no-referrer"
                className="w-24 h-20 object-contain rounded-2xl bg-[#F8F7FF] p-2"
              />
              <div>
                <h2 className="text-xl font-extrabold text-[#1E1B4B]">
                  {selectedFoodDetail.name}
                </h2>
                <p className="text-xs font-semibold text-[#5B56E0] mt-0.5">
                  {selectedFoodDetail.nutrients.join(' · ')} · {selectedFoodDetail.calories}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              <p>{selectedFoodDetail.detailedBenefit}</p>
              <div className="p-3.5 rounded-2xl bg-[#F8F7FF] border border-indigo-100">
                <p className="font-bold text-[#1E1B4B] mb-1">Saran Penyajian:</p>
                <p>{selectedFoodDetail.servingSuggestion}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedFoodDetail(null)}
              className="w-full h-12 rounded-full bg-[#6C67F0] text-white font-bold text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
