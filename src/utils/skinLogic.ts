export interface SkinMetric {
  id: string;
  label: string;
  value: number; // 0 - 100
  status: string;
  level: 'good' | 'moderate' | 'high';
}

export interface FaceMarker {
  id: string;
  label: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  tone: 'danger' | 'warning' | 'primary';
}

export interface SkinScanResult {
  id: string;
  date: string;
  time: string;
  title: string;
  subtitle: string;
  badgeText: string;
  imageUrl: string;
  skinScore: number;
  scoreLabel: string;
  skinProfile: string;
  skinTag: string;
  mainCondition: string;
  metrics: {
    kelembapan: SkinMetric;
    minyak: SkinMetric;
    tekstur: SkinMetric;
    pori: SkinMetric;
    jerawat: SkinMetric;
    kemerahan: SkinMetric;
  };
  findings: string[];
  markers: FaceMarker[];
}

export interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: string;
  address: string;
  points: number;
  memberLevel: 'Gratis' | 'Premium';
  premiumPlan?: 'trial' | 'monthly' | 'yearly';
  avatar: string;
}

export interface HealthPreferences {
  skinSensitivities: string[];
  foodAllergies: string[];
  foodPreferences: string[];
  avoidedIngredients: string[];
}

export type ProductCategory = 'Face Wash' | 'Moisturizer' | 'Sunscreen';

export interface SkincareProduct {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  formattedPrice: string;
  originalPrice?: string;
  discountBadge?: string;
  matchScore: number;
  rating: number;
  reviewCount: string;
  isBestSeller?: boolean;
  imageUrl: string;
  benefits: string[];
  description: string;
  highlights: {
    icon: 'spf' | 'feather' | 'droplet' | 'shield';
    label: string;
  }[];
  whySuitable: string[];
  howToUse: {
    step: number;
    text: string;
  }[];
  keyIngredients: string[];
  containsPotentialIrritants?: string[];
  marketplaces: {
    shopee: string;
    tokopedia: string;
    lazada: string;
  };
}

export type FoodCategory = 'Semua' | 'Untuk Jerawat' | 'Untuk Kulit Kering' | 'Untuk Kulit Sensitif';

export interface HealthyFoodItem {
  id: string;
  name: string;
  description: string;
  detailedBenefit: string;
  imageUrl: string;
  nutrients: string[];
  categories: FoodCategory[];
  allergenTriggers: string[];
  dietaryTags: string[];
  servingSuggestion: string;
  calories: string;
}

export interface IngredientAnalysisItem {
  name: string;
  status: 'Aman & Direkomendasikan' | 'Perlu Perhatian' | 'Hindari (Sensitif/Alergi)';
  function: string;
  note: string;
}

export interface IngredientCheckResult {
  overallScore: number;
  verdict: 'Sangat Cocok' | 'Cukup Aman (Perhatikan Dosis)' | 'Tidak Disarankan';
  summary: string;
  items: IngredientAnalysisItem[];
}

export const SKIN_SENSITIVITY_OPTIONS = [
  'Fragrance / Parfum',
  'Alkohol',
  'Essential Oil',
  'Paraben',
  'Sulfate',
  'Bahan Kimia Tertentu',
];

export const FOOD_ALLERGY_OPTIONS = [
  'Kacang-kacangan',
  'Seafood',
  'Susu',
  'Telur',
  'Gluten',
  'Ikan',
  'Makanan Pedas',
  'Buah-buahan Tertentu',
];

export const FOOD_PREFERENCE_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Tidak suka seafood',
  'Tidak mengonsumsi susu',
  'Rendah gula',
  'Tinggi protein',
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  fullName: 'Rangga',
  phone: '0881038755232',
  email: 'Venelrangga288@gmail.com',
  birthDate: '31 Desember 2009',
  gender: 'Laki Laki',
  address: 'Jl. Sesetan No.297 Pegok',
  points: 1250,
  memberLevel: 'Premium',
  premiumPlan: 'monthly',
  avatar: '/assets/facewish/avatar_rangga.jpg',
};

export const DEFAULT_PREFERENCES: HealthPreferences = {
  skinSensitivities: ['Fragrance / Parfum', 'Alkohol'],
  foodAllergies: ['Seafood'],
  foodPreferences: ['Rendah gula', 'Tinggi protein'],
  avoidedIngredients: ['Sodium Lauryl Sulfate (SLS)'],
};

export const DEFAULT_SCAN_RESULT: SkinScanResult = {
  id: 'scan-2026-09-08',
  date: '8 September 2026',
  time: '16:24',
  title: 'Scan Wajah',
  subtitle: 'Analisis kulit dasar',
  badgeText: 'Perlu Perhatian',
  imageUrl: '/assets/facewish/scan_face_rangga.jpg',
  skinScore: 68,
  scoreLabel: 'Cukup baik',
  skinProfile: 'Kombinasi',
  skinTag: 'Sensitif',
  mainCondition: 'Jerawat ringan, minyak berlebih (T-zone), pori-pori besar.',
  metrics: {
    kelembapan: {
      id: 'kelembapan',
      label: 'Kelembapan',
      value: 48,
      status: 'Cukup rendah',
      level: 'good',
    },
    minyak: {
      id: 'minyak',
      label: 'Minyak',
      value: 72,
      status: 'Tinggi (T-zone)',
      level: 'high',
    },
    tekstur: {
      id: 'tekstur',
      label: 'Tekstur Kulit',
      value: 62,
      status: 'Cukup tinggi',
      level: 'moderate',
    },
    pori: {
      id: 'pori',
      label: 'Pori-pori',
      value: 68,
      status: 'Cenderung besar',
      level: 'moderate',
    },
    jerawat: {
      id: 'jerawat',
      label: 'Jerawat & Komedo',
      value: 45,
      status: 'Sedang',
      level: 'moderate',
    },
    kemerahan: {
      id: 'kemerahan',
      label: 'Kemerahan',
      value: 28,
      status: 'Rendah',
      level: 'good',
    },
  },
  findings: [
    'Area T-zone terlihat berminyak.',
    'Terdapat beberapa jerawat ringan dan komedo',
    'Pori-pori pada area hidung dan pipi tampak besar.',
    'Tekstur kulit tidak merata.',
  ],
  markers: [
    {
      id: 'jerawat',
      label: 'Jerawat & Komedo',
      x: 18,
      y: 22,
      targetX: 43,
      targetY: 28,
      tone: 'danger',
    },
    {
      id: 'minyak',
      label: 'Minyak Berlebih',
      x: 78,
      y: 25,
      targetX: 52,
      targetY: 32,
      tone: 'warning',
    },
    {
      id: 'tekstur',
      label: 'Tekstur Kasar',
      x: 18,
      y: 62,
      targetX: 38,
      targetY: 54,
      tone: 'primary',
    },
    {
      id: 'kemerahan',
      label: 'Kemerahan',
      x: 80,
      y: 60,
      targetX: 60,
      targetY: 51,
      tone: 'danger',
    },
  ],
};

export const SKINCARE_PRODUCTS: SkincareProduct[] = [
  // Face Wash
  {
    id: 'fw-cerave',
    name: 'CeraVe Foaming Facial Cleanser',
    brand: 'CeraVe',
    category: 'Face Wash',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    matchScore: 94,
    rating: 4.9,
    reviewCount: '14.2k ulasan',
    isBestSeller: true,
    imageUrl: '/assets/facewish/prod_cerave_fw.jpg',
    benefits: ['Mengontrol minyak berlebih', 'Membersihkan pori-pori'],
    description:
      'Pembersih wajah bertekstur gel berbusa dengan 3 Essential Ceramides, Niacinamide, dan Hyaluronic Acid yang membersihkan minyak berlebih di area T-zone tanpa merusak skin barrier.',
    highlights: [
      { icon: 'droplet', label: 'Non-Comedogenic' },
      { icon: 'feather', label: 'Lembut & Busa Halus' },
      { icon: 'shield', label: '3 Essential Ceramides' },
      { icon: 'spf', label: 'Tanpa Parfum' },
    ],
    whySuitable: [
      'Mengangkat sebum berlebih pada area T-zone tanpa membuat area pipi kering.',
      'Kandungan Niacinamide menenangkan kemerahan dan membantu merawat pori-pori.',
      'Bebas parfum (Fragrance-free) sehingga aman untuk kulit kombinasi-sensitif.',
      'Mempertahankan kelembapan alami kulit dengan 3 Essential Ceramides.',
    ],
    howToUse: [
      { step: 1, text: 'Basahi wajah dengan air hangat kuku terlebih dahulu.' },
      { step: 2, text: 'Busakan cleanser di telapak tangan lalu pijat lembut ke wajah memutar.' },
      { step: 3, text: 'Bilas hingga bersih dan keringkan dengan menepuk handuk lembut.' },
    ],
    keyIngredients: ['Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Niacinamide', 'Hyaluronic Acid'],
    containsPotentialIrritants: [],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=CeraVe%20Foaming%20Facial%20Cleanser',
      tokopedia: 'https://www.tokopedia.com/search?q=CeraVe%20Foaming%20Facial%20Cleanser',
      lazada: 'https://www.lazada.co.id/catalog/?q=CeraVe%20Foaming%20Facial%20Cleanser',
    },
  },
  {
    id: 'fw-cosrx',
    name: 'COSRX Low pH Good Morning Gel Cleanser',
    brand: 'COSRX',
    category: 'Face Wash',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    matchScore: 91,
    rating: 4.8,
    reviewCount: '18.5k ulasan',
    imageUrl: '/assets/facewish/prod_cosrx_fw.jpg',
    benefits: ['Menyeimbangkan pH kulit', 'Lembut di kulit, tidak membuat kering'],
    description:
      'Pembersih wajah dengan pH rendah (5.0 - 6.0) yang mendekati pH alami kulit, diperkaya Tea Tree Oil dan Betaine Salicylate (BHA alami) untuk membersihkan pori-pori dan komedo ringan.',
    highlights: [
      { icon: 'droplet', label: 'Low pH Formula' },
      { icon: 'feather', label: 'Gel Lembut' },
      { icon: 'shield', label: 'BHA + Tea Tree' },
      { icon: 'spf', label: 'Cocok Pagi & Malam' },
    ],
    whySuitable: [
      'Menyeimbangkan kadar asam-basa kulit kombinasi agar produksi minyak terkontrol.',
      'BHA lembut membantu mengangkat sel kulit mati dan komedo pada hidung.',
      'Tidak meninggalkan rasa tertarik setelah mencuci wajah.',
      'Membantu menghaluskan tekstur kulit yang tidak merata.',
    ],
    howToUse: [
      { step: 1, text: 'Gunakan pagi dan malam hari pada wajah yang sudah dibasahi.' },
      { step: 2, text: 'Pijat lembut terutama pada area T-zone yang berminyak selama 30 detik.' },
      { step: 3, text: 'Bilas dengan air bersih lalu lanjutkan dengan moisturizer.' },
    ],
    keyIngredients: ['Tea Tree Leaf Oil', 'Betaine Salicylate (BHA)', 'Saccharomyces Ferment', 'Allantoin'],
    containsPotentialIrritants: ['Essential Oil'],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=COSRX%20Low%20pH%20Good%20Morning',
      tokopedia: 'https://www.tokopedia.com/search?q=COSRX%20Low%20pH%20Good%20Morning',
      lazada: 'https://www.lazada.co.id/catalog/?q=COSRX%20Low%20pH%20Good%20Morning',
    },
  },
  {
    id: 'fw-senka',
    name: 'Senka Perfect Whip Facial Foam',
    brand: 'Senka',
    category: 'Face Wash',
    price: 75000,
    formattedPrice: 'Rp 75.000',
    matchScore: 88,
    rating: 4.7,
    reviewCount: '9.8k ulasan',
    imageUrl: '/assets/facewish/prod_senka_fw.jpg',
    benefits: ['Mengangkat kotoran & minyak', 'Membantu mencegah jerawat'],
    description:
      'Facial foam dengan Micro Dense Foam yang padat dan lembut, mengandung White Cocoon Essence dan Double Hyaluronic Acid untuk membersihkan kotoran hingga ke pori-pori.',
    highlights: [
      { icon: 'feather', label: 'Micro Dense Foam' },
      { icon: 'droplet', label: 'Double Hyaluronic' },
      { icon: 'shield', label: 'Deep Pore Clean' },
      { icon: 'spf', label: 'Kulit Segar' },
    ],
    whySuitable: [
      'Busa mikro yang padat mampu mengangkat debu dan polusi dari pori-pori besar.',
      'Dilengkapi Double Hyaluronic Acid agar kelembapan kulit tetap terjaga.',
      'Harga terjangkau untuk perawatan harian kulit berminyak dan kombinasi.',
    ],
    howToUse: [
      { step: 1, text: 'Keluarkan produk sekitar 2 cm pada telapak tangan yang basah.' },
      { step: 2, text: 'Tambahkan sedikit air dan kocok hingga menghasilkan busa padat.' },
      { step: 3, text: 'Usapkan busa pada wajah dengan lembut lalu bilas hingga bersih.' },
    ],
    keyIngredients: ['Sodium Acetylated Hyaluronate', 'Sodium Hyaluronate', 'Sericin', 'Glycerin'],
    containsPotentialIrritants: ['Fragrance / Parfum', 'Alkohol'],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=Senka%20Perfect%20Whip',
      tokopedia: 'https://www.tokopedia.com/search?q=Senka%20Perfect%20Whip',
      lazada: 'https://www.lazada.co.id/catalog/?q=Senka%20Perfect%20Whip',
    },
  },

  // Moisturizer
  {
    id: 'moist-cerave',
    name: 'CeraVe Moisturizing Cream',
    brand: 'CeraVe',
    category: 'Moisturizer',
    price: 189000,
    formattedPrice: 'Rp 189.000',
    matchScore: 92,
    rating: 4.9,
    reviewCount: '11.4k ulasan',
    imageUrl: '/assets/facewish/prod_cerave_moist.jpg',
    benefits: ['Menghidrasi kulit secara intensif', 'Memperkuat skin barrier'],
    description:
      'Pelembap dengan MVE Delivery Technology yang melepaskan nutrisi pelembap secara bertahap selama 24 jam, memulihkan kelembapan kulit yang cukup rendah (48%) tanpa menyumbat pori.',
    highlights: [
      { icon: 'droplet', label: 'Hidrasi 24 Jam' },
      { icon: 'feather', label: 'Cepat Meresap' },
      { icon: 'shield', label: 'Memperkuat Barrier' },
      { icon: 'spf', label: 'Cocok Kulit Sensitif' },
    ],
    whySuitable: [
      'Menjaga kelembapan kulit tanpa membuat wajah berminyak.',
      'Membantu memperbaiki skin barrier yang sensitif.',
      'Tekstur ringan dan cepat meresap, tidak menyumbat pori.',
      'Cocok untuk kulit kombinasi dan cenderung berminyak.',
    ],
    howToUse: [
      { step: 1, text: 'Bersihkan wajah terlebih dahulu menggunakan gentle cleanser.' },
      { step: 2, text: 'Ambil moisturizer secukupnya dan aplikasikan merata pada wajah.' },
      { step: 3, text: 'Gunakan pagi sebelum sunscreen dan malam hari sebelum tidur.' },
    ],
    keyIngredients: ['Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Hyaluronic Acid', 'Glycerin'],
    containsPotentialIrritants: [],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=CeraVe%20Moisturizing%20Cream',
      tokopedia: 'https://www.tokopedia.com/search?q=CeraVe%20Moisturizing%20Cream',
      lazada: 'https://www.lazada.co.id/catalog/?q=CeraVe%20Moisturizing%20Cream',
    },
  },
  {
    id: 'moist-skintific',
    name: 'Skintific 5X Ceramide Barrier Repair Moisture Gel',
    brand: 'Skintific',
    category: 'Moisturizer',
    price: 129000,
    formattedPrice: 'Rp 129.000',
    matchScore: 95,
    rating: 4.9,
    reviewCount: '24.6k ulasan',
    isBestSeller: true,
    imageUrl: '/assets/facewish/prod_skintific_moist.jpg',
    benefits: ['Melembapkan & memperbaiki skin barrier', 'Tekstur gel ringan, cepat meresap'],
    description:
      'Moisturizer bertekstur water-gel ringan yang menggabungkan 5 jenis Ceramide, Hyaluronic Acid, Centella Asiatica, dan Marine Collagen untuk menenangkan jerawat ringan dan menghidrasi kulit kombinasi.',
    highlights: [
      { icon: 'shield', label: '5X Ceramide' },
      { icon: 'feather', label: 'Tekstur Water-Gel' },
      { icon: 'droplet', label: 'Oil Control 24 Jam' },
      { icon: 'spf', label: 'Calming Centella' },
    ],
    whySuitable: [
      'Menjaga kelembapan kulit tanpa membuat wajah berminyak.',
      'Membantu memperbaiki skin barrier yang sensitif.',
      'Tekstur ringan dan cepat meresap, tidak menyumbat pori.',
      'Cocok untuk kulit kombinasi dan cenderung berminyak.',
    ],
    howToUse: [
      { step: 1, text: 'Bersihkan wajah terlebih dahulu dan pastikan kulit setengah lembap.' },
      { step: 2, text: 'Oleskan gel moisturizer sebesar biji jagung ke 5 titik wajah.' },
      { step: 3, text: 'Ratakan dan tepuk lembut hingga meresap sempurna.' },
    ],
    keyIngredients: ['5X Ceramides', 'Centella Asiatica', 'Hyaluronic Acid', 'Marine Collagen'],
    containsPotentialIrritants: [],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=Skintific%205X%20Ceramide%20Moisturizer',
      tokopedia: 'https://www.tokopedia.com/search?q=Skintific%205X%20Ceramide%20Moisturizer',
      lazada: 'https://www.lazada.co.id/catalog/?q=Skintific%205X%20Ceramide%20Moisturizer',
    },
  },
  {
    id: 'moist-wardah',
    name: 'Wardah Acnederm Day Moisturizer',
    brand: 'Wardah',
    category: 'Moisturizer',
    price: 68000,
    formattedPrice: 'Rp 68.000',
    matchScore: 88,
    rating: 4.7,
    reviewCount: '8.1k ulasan',
    imageUrl: '/assets/facewish/prod_wardah_moist.jpg',
    benefits: ['Menjaga kelembapan kulit', 'Mengontrol minyak berlebih'],
    description:
      'Pelembap khusus kulit rentan berjerawat dengan Derma Treat Actives, Salicylic Acid, dan Zinc Gluconate untuk menghidrasi sekaligus membantu merawat kulit berjerawat dan komedo.',
    highlights: [
      { icon: 'shield', label: 'Salicylic + Zinc' },
      { icon: 'feather', label: 'Gel Ringan' },
      { icon: 'droplet', label: 'Tidak Lengket' },
      { icon: 'spf', label: 'UV Protection' },
    ],
    whySuitable: [
      'Mengandung Zinc PCA dan Salicylic Acid untuk merawat jerawat & komedo (45%).',
      'Menjaga kelembapan kulit tanpa membuat wajah berminyak.',
      'Tekstur ringan dan cepat meresap, tidak menyumbat pori.',
      'Cocok untuk kulit kombinasi dan cenderung berminyak.',
    ],
    howToUse: [
      { step: 1, text: 'Bersihkan wajah terlebih dahulu.' },
      { step: 2, text: 'Gunakan pelembap secara merata pada wajah dan leher di pagi hari.' },
      { step: 3, text: 'Lanjutkan dengan sunscreen 15 menit sebelum beraktivitas.' },
    ],
    keyIngredients: ['Salicylic Acid', 'Zinc Gluconate', 'Aloe Vera Extract', 'Witch Hazel'],
    containsPotentialIrritants: [],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=Wardah%20Acnederm%20Day%20Moisturizer',
      tokopedia: 'https://www.tokopedia.com/search?q=Wardah%20Acnederm%20Day%20Moisturizer',
      lazada: 'https://www.lazada.co.id/catalog/?q=Wardah%20Acnederm%20Day%20Moisturizer',
    },
  },

  // Sunscreen
  {
    id: 'sun-lrp',
    name: 'La Roche-Posay Anthelios UVMune 400 SPF 50+',
    brand: 'La Roche-Posay',
    category: 'Sunscreen',
    price: 195000,
    formattedPrice: 'Rp 199.000',
    originalPrice: 'Rp 245.000',
    discountBadge: '20% OFF',
    matchScore: 90,
    rating: 4.8,
    reviewCount: '12.3k ulasan',
    isBestSeller: true,
    imageUrl: '/assets/facewish/prod_lrp_sun.jpg',
    benefits: [
      'Perlindungan maksimal dari sinar UV',
      'Tekstur ringan, tidak lengket',
    ],
    description:
      'La Roche-Posay Anthelios UVMune 400 SPF 50+ adalah sunscreen dengan perlindungan tinggi terhadap sinar UVA dan UVB. Diformulasikan dengan tekstur ringan, cepat meresap, dan cocok untuk kulit sensitif. Membantu melindungi kulit dari dampak buruk sinar matahari serta menjaga kulit tetap sehat dan terhidrasi.',
    highlights: [
      { icon: 'spf', label: 'SPF 50+ PA++++' },
      { icon: 'feather', label: 'Ringan & cepat meresap' },
      { icon: 'droplet', label: 'Tidak lengket' },
      { icon: 'shield', label: 'Cocok untuk kulit sensitif' },
    ],
    whySuitable: [
      'Melindungi dari sinar UVA & UVB.',
      'Membantu menjaga kelembapan kulit.',
      'Tidak menyumbat pori-pori.',
      'Cocok untuk kulit kombinasi dan cenderung berminyak.',
    ],
    howToUse: [
      { step: 1, text: 'Bersihkan wajah terlebih dahulu.' },
      { step: 2, text: 'Gunakan sunscreen secara merata ke seluruh wajah dan leher.' },
      { step: 3, text: 'Gunakan 15–20 menit sebelum terpapar sinar matahari.' },
    ],
    keyIngredients: ['Mexoryl 400', 'Airlicium', 'La Roche-Posay Thermal Spring Water', 'Vitamin E'],
    containsPotentialIrritants: [],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=La%20Roche-Posay%20Anthelios%20UVMune%20400',
      tokopedia: 'https://www.tokopedia.com/search?q=La%20Roche-Posay%20Anthelios%20UVMune%20400',
      lazada: 'https://www.lazada.co.id/catalog/?q=La%20Roche-Posay%20Anthelios%20UVMune%20400',
    },
  },
  {
    id: 'sun-biore',
    name: 'Biore UV Aqua Rich Watery Essence SPF 50+ PA++++',
    brand: 'Biore',
    category: 'Sunscreen',
    price: 125000,
    formattedPrice: 'Rp 125.000',
    discountBadge: '20% OFF',
    matchScore: 88,
    rating: 4.8,
    reviewCount: '12.3k ulasan',
    isBestSeller: true,
    imageUrl: '/assets/facewish/prod_biore_sun.jpg',
    benefits: [
      'Melembapkan dan tidak berat',
      'Finish natural, cocok untuk daily use',
    ],
    description:
      'Biore UV Aqua Rich Watery Essence adalah sunscreen dengan tekstur ringan seperti air yang cepat meresap ke kulit. Diformulasikan dengan SPF 50+ PA++++ untuk perlindungan maksimal dari sinar UVA dan UVB, serta memberikan kelembapan pada kulit tanpa rasa lengket. Cocok digunakan sehari-hari, bahkan untuk kulit berminyak dan sensitif.',
    highlights: [
      { icon: 'spf', label: 'SPF 50+ PA++++' },
      { icon: 'feather', label: 'Ringan & cepat serap' },
      { icon: 'droplet', label: 'Tidak lengket' },
      { icon: 'shield', label: 'Cocok untuk kulit sensitif' },
    ],
    whySuitable: [
      'Melindungi kulit dari sinar UVA & UVB.',
      'Mencegah kulit kusam dan penuaan dini.',
      'Tekstur ringan, tidak menyumbat pori.',
      'Cocok untuk kulit kombinasi dan cenderung berminyak.',
    ],
    howToUse: [
      { step: 1, text: 'Bersihkan wajah terlebih dahulu.' },
      { step: 2, text: 'Gunakan sunscreen sebanyak 2 ruas jari secara merata ke wajah dan leher.' },
      { step: 3, text: 'Gunakan 15–20 menit sebelum terpapar sinar matahari.' },
    ],
    keyIngredients: ['Hyaluronic Acid', 'Royal Jelly Extract', 'Water Capsule', 'Butylene Glycol'],
    containsPotentialIrritants: ['Alkohol', 'Fragrance / Parfum'],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=Biore%20UV%20Aqua%20Rich%20Watery%20Essence',
      tokopedia: 'https://www.tokopedia.com/search?q=Biore%20UV%20Aqua%20Rich%20Watery%20Essence',
      lazada: 'https://www.lazada.co.id/catalog/?q=Biore%20UV%20Aqua%20Rich%20Watery%20Essence',
    },
  },
  {
    id: 'sun-skintific',
    name: 'SKINTIFIC 5X Ceramide Serum Sunscreen SPF 50+ PA++++',
    brand: 'Skintific',
    category: 'Sunscreen',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    matchScore: 85,
    rating: 4.8,
    reviewCount: '10.9k ulasan',
    imageUrl: '/assets/facewish/prod_skintific_sun.jpg',
    benefits: [
      'Menjaga skin barrier kulit',
      'Ringan, tidak white cast',
    ],
    description:
      'Serum sunscreen dengan 5X Ceramide dan Tinosorb S/M yang melindungi dari UVA, UVB, dan Blue Light sekaligus memperbaiki skin barrier tanpa rasa berminyak atau white cast.',
    highlights: [
      { icon: 'spf', label: 'SPF 50+ PA++++' },
      { icon: 'feather', label: 'Zero White Cast' },
      { icon: 'droplet', label: 'Tidak lengket' },
      { icon: 'shield', label: '5X Ceramide Barrier' },
    ],
    whySuitable: [
      'Melindungi kulit dari sinar UVA & UVB.',
      'Mencegah kulit kusam dan penuaan dini.',
      'Tekstur ringan, tidak menyumbat pori.',
      'Cocok untuk kulit kombinasi dan cenderung berminyak.',
    ],
    howToUse: [
      { step: 1, text: 'Bersihkan wajah terlebih dahulu.' },
      { step: 2, text: 'Gunakan sunscreen secara merata ke seluruh wajah dan leher.' },
      { step: 3, text: 'Gunakan 15–20 menit sebelum terpapar sinar matahari.' },
    ],
    keyIngredients: ['5X Ceramides', 'Tinosorb S/M', 'Hyaluronic Acid', 'Centella Asiatica'],
    containsPotentialIrritants: [],
    marketplaces: {
      shopee: 'https://shopee.co.id/search?keyword=Skintific%205X%20Ceramide%20Sunscreen',
      tokopedia: 'https://www.tokopedia.com/search?q=Skintific%205X%20Ceramide%20Sunscreen',
      lazada: 'https://www.lazada.co.id/catalog/?q=Skintific%205X%20Ceramide%20Sunscreen',
    },
  },
];

export const HEALTHY_FOODS: HealthyFoodItem[] = [
  {
    id: 'food-alpukat',
    name: 'Alpukat',
    description: 'Menjaga kelembapan kulit dan kaya akan vitamin E.',
    detailedBenefit:
      'Kandungan asam lemak tak jenuh tunggal dan Vitamin E tinggi pada alpukat membantu meningkatkan kelembapan alami kulit (yang saat ini 48%) dan memperkuat elastisitas skin barrier.',
    imageUrl: '/assets/facewish/food_alpukat.jpg',
    nutrients: ['Vitamin E', 'Lemak Sehat'],
    categories: ['Semua', 'Untuk Kulit Kering', 'Untuk Kulit Sensitif'],
    allergenTriggers: [],
    dietaryTags: ['Vegetarian', 'Vegan', 'Rendah gula', 'Tidak suka seafood', 'Tidak mengonsumsi susu'],
    servingSuggestion: 'Konsumsi 1/2 buah alpukat segar saat sarapan atau campurkan ke dalam salad hijau tanpa gula tambahan.',
    calories: '160 kkal / 100g',
  },
  {
    id: 'food-salmon',
    name: 'Ikan Salmon',
    description: 'Mengurangi peradangan dan menjaga elastisitas kulit.',
    detailedBenefit:
      'Kaya akan asam lemak Omega-3 (EPA & DHA) dan Astaxanthin yang bekerja meredakan kemerahan, mengontrol peradangan jerawat, serta menjaga kekenyalan kolagen kulit.',
    imageUrl: '/assets/facewish/food_salmon.jpg',
    nutrients: ['Omega-3', 'Protein'],
    categories: ['Semua', 'Untuk Jerawat', 'Untuk Kulit Sensitif'],
    allergenTriggers: ['Ikan', 'Seafood'],
    dietaryTags: ['Rendah gula', 'Tinggi protein', 'Tidak mengonsumsi susu'],
    servingSuggestion: 'Panggang 120g fillet salmon dengan minyak zaitun, lemon, dan kukusan brokoli 2-3 kali seminggu.',
    calories: '208 kkal / 100g',
  },
  {
    id: 'food-berry',
    name: 'Buah Berry',
    description: 'Melawan radikal bebas dan mencerahkan kulit.',
    detailedBenefit:
      'Blueberry, strawberry, dan raspberry mengandung antosianin dan Vitamin C tinggi yang mempercepat regenerasi tekstur kulit kasar dan memudarkan bekas jerawat (PIE/PIH).',
    imageUrl: '/assets/facewish/food_berry.jpg',
    nutrients: ['Antioksidan', 'Vitamin C'],
    categories: ['Semua', 'Untuk Jerawat', 'Untuk Kulit Kering'],
    allergenTriggers: ['Buah-buahan Tertentu'],
    dietaryTags: ['Vegetarian', 'Vegan', 'Rendah gula', 'Tidak suka seafood', 'Tidak mengonsumsi susu'],
    servingSuggestion: 'Nikmati 1 mangkuk kecil (100g) campuran buah berry segar sebagai camilan pagi atau sore.',
    calories: '57 kkal / 100g',
  },
  {
    id: 'food-kacang',
    name: 'Kacang-Kacangan',
    description: 'Menjaga skin barrier dan menutrisi kulit.',
    detailedBenefit:
      'Almond, walnut, dan kacang mete kaya akan Zinc, Selenium, serta Vitamin E yang mengontrol produksi sebum berlebih pada area T-zone dan mempercepat penyembuhan komedo.',
    imageUrl: '/assets/facewish/food_kacang.jpg',
    nutrients: ['Zinc', 'Vitamin E'],
    categories: ['Semua', 'Untuk Jerawat', 'Untuk Kulit Kering', 'Untuk Kulit Sensitif'],
    allergenTriggers: ['Kacang-kacangan'],
    dietaryTags: ['Vegetarian', 'Vegan', 'Rendah gula', 'Tinggi protein', 'Tidak suka seafood', 'Tidak mengonsumsi susu'],
    servingSuggestion: 'Konsumsi 1 genggam kecil (25-30g) kacang almond atau walnut panggang tanpa garam setiap hari.',
    calories: '170 kkal / 30g',
  },
];

/**
 * Pure calculation of overall Skin Score (0-100) from the 6 skin metrics.
 * Higher kelembapan is better; lower minyak, tekstur, pori, jerawat, kemerahan is better.
 */
export function calculateSkinScore(metrics: {
  kelembapan: number;
  minyak: number;
  tekstur: number;
  pori: number;
  jerawat: number;
  kemerahan: number;
}): { score: number; label: string } {
  const hydrationScore = Math.max(0, Math.min(100, metrics.kelembapan));
  const oilBalanceScore = 100 - Math.abs(metrics.minyak - 35);
  const textureScore = 100 - metrics.tekstur * 0.55;
  const poreScore = 100 - metrics.pori * 0.5;
  const acneScore = 100 - metrics.jerawat * 0.65;
  const rednessScore = 100 - metrics.kemerahan * 0.5;

  const raw =
    hydrationScore * 0.22 +
    oilBalanceScore * 0.18 +
    textureScore * 0.15 +
    poreScore * 0.15 +
    acneScore * 0.18 +
    rednessScore * 0.12;

  const score = Math.max(10, Math.min(99, Math.round(raw)));
  let label = 'Perlu Perhatian';
  if (score >= 80) label = 'Sangat Baik';
  else if (score >= 65) label = 'Cukup baik';
  else if (score >= 50) label = 'Sedang';

  return { score, label };
}

/**
 * Evaluates a skincare product's compatibility against the user's sensitivities and avoided ingredients.
 */
export function evaluateProductCompatibility(
  product: SkincareProduct,
  preferences: HealthPreferences
): {
  adjustedMatchScore: number;
  isSafeForSensitivity: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  const productIrritants = product.containsPotentialIrritants || [];

  for (const sens of preferences.skinSensitivities) {
    if (productIrritants.some((irr) => irr.toLowerCase() === sens.toLowerCase())) {
      warnings.push(`Mengandung ${sens} (sesuai daftar sensitivitas kulitmu)`);
    }
  }

  for (const avoided of preferences.avoidedIngredients) {
    const clean = avoided.trim().toLowerCase();
    if (!clean) continue;
    const foundInKey = product.keyIngredients.some((ing) => ing.toLowerCase().includes(clean));
    const foundInIrr = productIrritants.some((irr) => irr.toLowerCase().includes(clean));
    if (foundInKey || foundInIrr) {
      warnings.push(`Mengandung bahan yang dihindari: ${avoided}`);
    }
  }

  const penalty = warnings.length * 8;
  const adjustedMatchScore = Math.max(60, Math.min(99, product.matchScore - penalty));

  return {
    adjustedMatchScore,
    isSafeForSensitivity: warnings.length === 0,
    warnings,
  };
}

/**
 * Filters healthy food items by category and flags any food allergies from user preferences.
 */
export function filterFoodsByCategoryAndPreferences(
  foods: HealthyFoodItem[],
  category: FoodCategory,
  preferences: HealthPreferences
): Array<HealthyFoodItem & { hasAllergyWarning: boolean; matchedAllergens: string[] }> {
  return foods
    .filter((item) => category === 'Semua' || item.categories.includes(category))
    .map((item) => {
      const matchedAllergens = item.allergenTriggers.filter((trig) =>
        preferences.foodAllergies.some((alg) => alg.toLowerCase() === trig.toLowerCase())
      );
      return {
        ...item,
        hasAllergyWarning: matchedAllergens.length > 0,
        matchedAllergens,
      };
    });
}

/**
 * Deterministic ingredient checker logic so users get immediate, accurate analysis
 * of any skincare ingredient list against their skin profile and sensitivities.
 */
export function analyzeIngredientsDeterministic(
  rawInput: string,
  preferences: HealthPreferences,
  skinProfile = 'Kombinasi'
): IngredientCheckResult {
  const tokens = rawInput
    .split(/[,;\n]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  if (tokens.length === 0) {
    return {
      overallScore: 0,
      verdict: 'Tidak Disarankan',
      summary: 'Masukkan minimal 1 nama kandungan bahan aktif atau komposisi produk.',
      items: [],
    };
  }

  const beneficialDictionary: Record<string, { fn: string; note: string }> = {
    niacinamide: {
      fn: 'Oil Control & Barrier Support',
      note: 'Sangat baik untuk mengontrol minyak di T-zone dan menyamarkan pori-pori besar.',
    },
    ceramide: {
      fn: 'Skin Barrier Repair',
      note: 'Memperkuat pelindung kulit sensitif dan mengunci kelembapan.',
    },
    'hyaluronic acid': {
      fn: 'Humektan / Hidrasi',
      note: 'Meningkatkan kadar air kulit (48%) tanpa membuat wajah berminyak.',
    },
    'salicylic acid': {
      fn: 'Eksfoliasi BHA',
      note: 'Membersihkan komedo dan sebum di dalam pori-pori.',
    },
    'centella asiatica': {
      fn: 'Soothing & Anti-Inflamasi',
      note: 'Menenangkan kemerahan dan jerawat ringan pada kulit sensitif.',
    },
    glycerin: {
      fn: 'Pelembap Alami',
      note: 'Aman untuk semua jenis kulit termasuk kombinasi-sensitif.',
    },
    panthenol: {
      fn: 'Pro-Vitamin B5 Soothing',
      note: 'Melembapkan dan meredakan iritasi kulit.',
    },
    'zinc pca': {
      fn: 'Sebum Regulator',
      note: 'Mengurangi produksi minyak berlebih dan bakteri penyebab jerawat.',
    },
  };

  const irritantDictionary: Record<string, { sensKey: string; fn: string; note: string }> = {
    fragrance: {
      sensKey: 'Fragrance / Parfum',
      fn: 'Pewangi Tambahan',
      note: 'Dapat memicu kemerahan atau iritasi pada kulit sensitif.',
    },
    parfum: {
      sensKey: 'Fragrance / Parfum',
      fn: 'Pewangi Tambahan',
      note: 'Dapat memicu kemerahan atau iritasi pada kulit sensitif.',
    },
    'alcohol denat': {
      sensKey: 'Alkohol',
      fn: 'Pelarut Cepat Kering',
      note: 'Bisa mengikis kelembapan alami kulit jika digunakan berlebihan.',
    },
    alcohol: {
      sensKey: 'Alkohol',
      fn: 'Pelarut / Astringent',
      note: 'Perhatikan konsentrasi jika kulitmu sensitif terhadap alkohol.',
    },
    'sodium lauryl sulfate': {
      sensKey: 'Sulfate',
      fn: 'Surfaktan Kuat',
      note: 'Berisiko membuat area pipi kering dan merusak skin barrier.',
    },
    sls: {
      sensKey: 'Sulfate',
      fn: 'Surfaktan Kuat',
      note: 'Berisiko membuat kulit terasa ketarik dan iritasi.',
    },
    paraben: {
      sensKey: 'Paraben',
      fn: 'Pengawet Kosmetik',
      note: 'Tercatat dalam preferensi sensitivitas kulit yang ingin kamu hindari.',
    },
  };

  let penalty = 0;
  let bonus = 0;

  const items: IngredientAnalysisItem[] = tokens.map((token) => {
    const lower = token.toLowerCase();

    // Check custom avoided ingredients
    const isCustomAvoided = preferences.avoidedIngredients.some(
      (av) => av.trim() && lower.includes(av.trim().toLowerCase())
    );
    if (isCustomAvoided) {
      penalty += 25;
      return {
        name: token,
        status: 'Hindari (Sensitif/Alergi)',
        function: 'Bahan yang Dihindari Pengguna',
        note: 'Cocok dengan daftar bahan yang kamu tandai untuk dihindari di Kesehatan & Preferensi.',
      };
    }

    // Check irritant dictionary
    for (const [key, info] of Object.entries(irritantDictionary)) {
      if (lower.includes(key)) {
        const userSensitive = preferences.skinSensitivities.some(
          (s) => s.toLowerCase() === info.sensKey.toLowerCase()
        );
        if (userSensitive) {
          penalty += 22;
          return {
            name: token,
            status: 'Hindari (Sensitif/Alergi)',
            function: info.fn,
            note: `${info.note} (Tercatat pada sensitivitas kulitmu: ${info.sensKey}).`,
          };
        } else {
          penalty += 10;
          return {
            name: token,
            status: 'Perlu Perhatian',
            function: info.fn,
            note: info.note,
          };
        }
      }
    }

    // Check beneficial dictionary
    for (const [key, info] of Object.entries(beneficialDictionary)) {
      if (lower.includes(key)) {
        bonus += 6;
        return {
          name: token,
          status: 'Aman & Direkomendasikan',
          function: info.fn,
          note: info.note,
        };
      }
    }

    return {
      name: token,
      status: 'Aman & Direkomendasikan',
      function: 'Komponen Formulasi Standar',
      note: `Umumnya aman digunakan untuk profil kulit ${skinProfile}.`,
    };
  });

  const overallScore = Math.max(25, Math.min(98, 84 + bonus - penalty));
  let verdict: IngredientCheckResult['verdict'] = 'Sangat Cocok';
  if (overallScore < 60) verdict = 'Tidak Disarankan';
  else if (overallScore < 80) verdict = 'Cukup Aman (Perhatikan Dosis)';

  const dangerCount = items.filter((i) => i.status === 'Hindari (Sensitif/Alergi)').length;
  const summary =
    dangerCount > 0
      ? `Ditemukan ${dangerCount} bahan yang berisiko memicu sensitivitas pada kulit ${skinProfile.toLowerCase()}mu. Sebaiknya pilih alternatif bebas iritan.`
      : `Komposisi ini ramah untuk kulit ${skinProfile.toLowerCase()} dan mendukung hidrasi serta kontrol sebum.`;

  return {
    overallScore,
    verdict,
    summary,
    items,
  };
}

/**
 * Validates Login or Register form fields without silently bypassing empty inputs.
 */
export function validateAuthInput(
  mode: 'login' | 'register',
  emailOrPhone: string,
  password: string,
  fullName?: string
): { valid: boolean; error?: string } {
  if (mode === 'register' && (!fullName || fullName.trim().length < 2)) {
    return { valid: false, error: 'Nama lengkap wajib diisi (minimal 2 karakter).' };
  }
  if (!emailOrPhone || emailOrPhone.trim().length < 5) {
    return { valid: false, error: 'Masukkan email atau nomor telepon yang valid.' };
  }
  if (!password || password.trim().length < 4) {
    return { valid: false, error: 'Password wajib diisi (minimal 4 karakter).' };
  }
  return { valid: true };
}
