import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DEFAULT_USER_PROFILE,
  DEFAULT_PREFERENCES,
  DEFAULT_SCAN_RESULT,
  SKINCARE_PRODUCTS,
  HEALTHY_FOODS,
  calculateSkinScore,
  evaluateProductCompatibility,
  filterFoodsByCategoryAndPreferences,
  analyzeIngredientsDeterministic,
  validateAuthInput,
  HealthPreferences,
  SkinScanResult,
  UserProfile,
  ProductCategory,
  FoodCategory,
} from './src/utils/skinLogic';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory store for session persistence (can be swapped with PostgreSQL / Firestore in production)
let serverUser: UserProfile = { ...DEFAULT_USER_PROFILE };
let serverPreferences: HealthPreferences = { ...DEFAULT_PREFERENCES };
let serverScanHistory: SkinScanResult[] = [{ ...DEFAULT_SCAN_RESULT }];

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // 0. Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'FaceWish AI Skin & Recommendation Engine',
      timestamp: new Date().toISOString(),
    });
  });

  // 1. Auth Endpoints (/api/auth/login & /api/auth/register)
  app.post('/api/auth/:mode', (req, res) => {
    const mode = req.params.mode === 'register' ? 'register' : 'login';
    const { emailOrPhone, password, fullName } = req.body || {};
    const validation = validateAuthInput(mode, emailOrPhone, password, fullName);

    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    if (mode === 'register' && fullName) {
      serverUser = {
        ...serverUser,
        fullName: fullName.trim(),
        email: emailOrPhone.includes('@') ? emailOrPhone.trim() : serverUser.email,
        phone: !emailOrPhone.includes('@') ? emailOrPhone.trim() : serverUser.phone,
      };
    }

    return res.json({
      user: serverUser,
      preferences: serverPreferences,
      latestScan: serverScanHistory[0] || DEFAULT_SCAN_RESULT,
    });
  });

  // 2. User Profile & Health Preferences Endpoints
  app.get('/api/profile', (_req, res) => {
    res.json({
      user: serverUser,
      preferences: serverPreferences,
      scanHistory: serverScanHistory,
    });
  });

  app.put('/api/profile', (req, res) => {
    serverUser = { ...serverUser, ...(req.body || {}) };
    res.json({ user: serverUser });
  });

  app.put('/api/preferences', (req, res) => {
    const { skinSensitivities, foodAllergies, foodPreferences, avoidedIngredients } =
      req.body || {};
    serverPreferences = {
      skinSensitivities: Array.isArray(skinSensitivities)
        ? skinSensitivities
        : serverPreferences.skinSensitivities,
      foodAllergies: Array.isArray(foodAllergies)
        ? foodAllergies
        : serverPreferences.foodAllergies,
      foodPreferences: Array.isArray(foodPreferences)
        ? foodPreferences
        : serverPreferences.foodPreferences,
      avoidedIngredients: Array.isArray(avoidedIngredients)
        ? avoidedIngredients
        : serverPreferences.avoidedIngredients,
    };
    res.json({ preferences: serverPreferences });
  });

  // 3. Hybrid AI Skin Scan Analysis Endpoint
  // Pipeline: Image Vision Extraction (Gemini) -> Weighted Skin Score Normalization -> Scan History Persistence
  app.post('/api/analyze-skin', async (req, res) => {
    try {
      const { imageBase64, mimeType, preferences, notes } = req.body || {};
      const activePrefs: HealthPreferences = preferences || serverPreferences;
      const ai = getGenAIClient();

      if (!ai) {
        const calc = calculateSkinScore({
          kelembapan: 48,
          minyak: 72,
          tekstur: 62,
          pori: 68,
          jerawat: 45,
          kemerahan: 28,
        });
        return res.status(200).json({
          usedFallback: true,
          skinScore: calc.score,
          scoreLabel: calc.label,
          skinProfile: 'Kombinasi',
          skinTag: 'Sensitif',
          mainCondition: 'Jerawat ringan, minyak berlebih (T-zone), pori-pori besar.',
          kelembapan: 48,
          minyak: 72,
          tekstur: 62,
          pori: 68,
          jerawat: 45,
          kemerahan: 28,
          findings: [
            'Area T-zone terlihat berminyak.',
            'Terdapat beberapa jerawat ringan dan komedo',
            'Pori-pori pada area hidung dan pipi tampak besar.',
            'Tekstur kulit tidak merata.',
          ],
        });
      }

      const parts: any[] = [];
      if (imageBase64 && typeof imageBase64 === 'string') {
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        parts.push({
          inlineData: {
            mimeType: mimeType || 'image/jpeg',
            data: cleanBase64,
          },
        });
      }

      parts.push({
        text: `Analisis kondisi kulit wajah ini untuk aplikasi FaceWish dalam Bahasa Indonesia.
Preferensi sensitivitas pengguna: ${JSON.stringify(activePrefs)}.
Catatan tambahan: ${notes || 'Scan wajah standar'}.
Berikan output JSON sesuai skema.`,
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              skinScore: { type: Type.INTEGER },
              scoreLabel: { type: Type.STRING },
              skinProfile: { type: Type.STRING },
              skinTag: { type: Type.STRING },
              mainCondition: { type: Type.STRING },
              kelembapan: { type: Type.INTEGER },
              minyak: { type: Type.INTEGER },
              tekstur: { type: Type.INTEGER },
              pori: { type: Type.INTEGER },
              jerawat: { type: Type.INTEGER },
              kemerahan: { type: Type.INTEGER },
              findings: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              'skinScore',
              'scoreLabel',
              'skinProfile',
              'skinTag',
              'mainCondition',
              'kelembapan',
              'minyak',
              'tekstur',
              'pori',
              'jerawat',
              'kemerahan',
              'findings',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      // Normalize score using server-side deterministic formula so AI output stays calibrated
      const normalized = calculateSkinScore({
        kelembapan: parsed.kelembapan ?? 48,
        minyak: parsed.minyak ?? 72,
        tekstur: parsed.tekstur ?? 62,
        pori: parsed.pori ?? 68,
        jerawat: parsed.jerawat ?? 45,
        kemerahan: parsed.kemerahan ?? 28,
      });

      return res.json({
        usedFallback: false,
        ...parsed,
        skinScore: normalized.score,
        scoreLabel: normalized.label,
      });
    } catch (error: any) {
      return res.status(200).json({
        usedFallback: true,
        errorNotice: error?.message || 'Fallback analysis used',
        skinScore: 68,
        scoreLabel: 'Cukup baik',
        skinProfile: 'Kombinasi',
        skinTag: 'Sensitif',
        mainCondition: 'Jerawat ringan, minyak berlebih (T-zone), pori-pori besar.',
      });
    }
  });

  // 4. Unified Recommendation Engine Endpoint (/api/recommendations)
  // Combines Skin Scan Metrics + Health/Allergy Preferences to rank Skincare & Healthy Foods
  app.post('/api/recommendations', (req, res) => {
    const {
      category = 'Face Wash',
      foodCategory = 'Semua',
      preferences = serverPreferences,
    } = req.body || {};

    const rankedProducts = SKINCARE_PRODUCTS.filter(
      (p) => !category || p.category === (category as ProductCategory)
    )
      .map((product) => {
        const compatibility = evaluateProductCompatibility(product, preferences);
        return {
          ...product,
          ...compatibility,
        };
      })
      .sort((a, b) => b.adjustedMatchScore - a.adjustedMatchScore);

    const filteredFoods = filterFoodsByCategoryAndPreferences(
      HEALTHY_FOODS,
      foodCategory as FoodCategory,
      preferences
    );

    return res.json({
      products: rankedProducts,
      foods: filteredFoods,
    });
  });

  // 5. Ingredient Checker Endpoint (/api/check-ingredients)
  app.post('/api/check-ingredients', (req, res) => {
    const { rawIngredients = '', preferences = serverPreferences, skinProfile = 'Kombinasi' } =
      req.body || {};
    const result = analyzeIngredientsDeterministic(rawIngredients, preferences, skinProfile);
    return res.json(result);
  });

  // 6. AI Skin Assistant Consultation Endpoint (/api/skin-assistant)
  app.post('/api/skin-assistant', async (req, res) => {
    try {
      const { message, skinProfile, preferences, latestScan } = req.body || {};
      const ai = getGenAIClient();

      if (!ai) {
        return res.json({
          reply:
            'Berdasarkan hasil scan kulitmu (Skor 68/100, tipe Kombinasi & Sensitif dengan minyak T-zone 72% dan kelembapan 48%), fokuskan rutinitas pada: 1) Gentle Cleanser rendah pH seperti CeraVe Foaming Cleanser, 2) Gel Moisturizer dengan 5X Ceramide untuk mengunci hidrasi tanpa menyumbat pori, dan 3) Sunscreen ringan SPF 50+ setiap pagi. Hindari produk dengan alkohol tinggi dan parfum.',
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Kamu adalah AI Skin Assistant dari aplikasi FaceWish ("Healthy Skin, Better You").
Profil kulit pengguna: ${skinProfile || 'Kombinasi & Sensitif'}.
Hasil scan terakhir: ${JSON.stringify(latestScan || {})}.
Preferensi & Alergi: ${JSON.stringify(preferences || {})}.
Pertanyaan pengguna: ${message}
Jawab dalam Bahasa Indonesia yang ramah, terstruktur, singkat (maksimal 3 paragraf pendek), dan praktis.`,
      });

      return res.json({
        reply:
          response.text ||
          'Pastikan wajah tetap terhidrasi dengan moisturizer berbahan Ceramide dan gunakan sunscreen SPF 50+ setiap pagi.',
      });
    } catch {
      return res.json({
        reply:
          'Untuk kulit Kombinasi & Sensitif (Skor 68/100), gunakan CeraVe Foaming Cleanser atau COSRX Low pH di pagi & malam hari, lanjutkan dengan Skintific 5X Ceramide Moisture Gel untuk menaikkan kelembapan dari 48%, dan lindungi dengan La Roche-Posay Anthelios SPF 50+.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FaceWish server listening on http://localhost:${PORT}`);
  });
}

startServer();
