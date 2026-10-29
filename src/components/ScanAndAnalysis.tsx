import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  Zap,
  Camera,
  Lightbulb,
  CheckCircle2,
  User,
  Droplets,
  Flame,
  Layers,
  CircleDot,
  AlertCircle,
  Sun,
  ArrowRight,
  Upload,
  BarChart3,
} from 'lucide-react';
import {
  SkinScanResult,
  HealthPreferences,
  DEFAULT_SCAN_RESULT,
  calculateSkinScore,
} from '../utils/skinLogic';

interface ScanViewProps {
  preferences: HealthPreferences;
  onBack: () => void;
  onScanComplete: (result: SkinScanResult) => void;
}

export const AISkinScanView: React.FC<ScanViewProps> = ({
  preferences,
  onBack,
  onScanComplete,
}) => {
  const [flashOn, setFlashOn] = useState(false);
  const [cameraSource, setCameraSource] = useState<'sample' | 'webcam' | 'upload'>('sample');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [cameraNotice, setCameraNotice] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    if (cameraSource === 'webcam') {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'user' } })
          .then((stream) => {
            activeStream = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
            setCameraNotice(null);
          })
          .catch(() => {
            setCameraNotice('Kamera perangkat tidak terdeteksi, menggunakan potret wajah Rangga.');
            setCameraSource('sample');
          });
      } else {
        setCameraNotice('Browser tidak mendukung webcam langsung, menggunakan potret wajah Rangga.');
        setCameraSource('sample');
      }
    }
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraSource]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomImage(reader.result);
        setCameraSource('upload');
        setCameraNotice('Foto wajah berhasil dimuat. Tekan Mulai Scan untuk menganalisis.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleCamera = () => {
    if (cameraSource === 'sample') {
      setCameraSource('webcam');
    } else {
      setCameraSource('sample');
      setCameraNotice(null);
    }
  };

  const handleStartScan = async () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(15);

    const progressTimer = setInterval(() => {
      setScanProgress((prev) => (prev < 90 ? prev + 15 : prev));
    }, 180);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch('/api/analyze-skin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: customImage || undefined,
          preferences,
          notes: flashOn ? 'Pencahayaan flash aktif' : 'Pencahayaan normal',
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      clearInterval(progressTimer);
      setScanProgress(100);

      const kelembapanVal = typeof data.kelembapan === 'number' ? data.kelembapan : 48;
      const minyakVal = typeof data.minyak === 'number' ? data.minyak : 72;
      const teksturVal = typeof data.tekstur === 'number' ? data.tekstur : 62;
      const poriVal = typeof data.pori === 'number' ? data.pori : 68;
      const jerawatVal = typeof data.jerawat === 'number' ? data.jerawat : 45;
      const kemerahanVal = typeof data.kemerahan === 'number' ? data.kemerahan : 28;

      const calc = calculateSkinScore({
        kelembapan: kelembapanVal,
        minyak: minyakVal,
        tekstur: teksturVal,
        pori: poriVal,
        jerawat: jerawatVal,
        kemerahan: kemerahanVal,
      });

      const now = new Date();
      const newScan: SkinScanResult = {
        ...DEFAULT_SCAN_RESULT,
        id: `scan-${Date.now()}`,
        date: '8 September 2026',
        time: now.toTimeString().slice(0, 5) || '16:24',
        imageUrl: customImage || DEFAULT_SCAN_RESULT.imageUrl,
        skinScore: data.skinScore || calc.score || 68,
        scoreLabel: data.scoreLabel || calc.label || 'Cukup baik',
        skinProfile: data.skinProfile || 'Kombinasi',
        skinTag: data.skinTag || 'Sensitif',
        mainCondition:
          data.mainCondition || 'Jerawat ringan, minyak berlebih (T-zone), pori-pori besar.',
      };

      setTimeout(() => {
        setIsScanning(false);
        onScanComplete(newScan);
      }, 250);
    } catch {
      clearInterval(progressTimer);
      setScanProgress(100);
      setTimeout(() => {
        setIsScanning(false);
        onScanComplete({
          ...DEFAULT_SCAN_RESULT,
          id: `scan-${Date.now()}`,
          imageUrl: customImage || DEFAULT_SCAN_RESULT.imageUrl,
        });
      }, 250);
    }
  };

  const displayImage =
    cameraSource === 'upload' && customImage
      ? customImage
      : '/assets/facewish/scan_face_rangga.jpg';

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header matching PDF Page 15 */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            aria-label="Kembali"
            onClick={onBack}
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-[#2D2A6E] hover:bg-indigo-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
            AI Skin Scan
          </h1>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl bg-white border border-indigo-100 text-xs font-semibold text-[#5B56E0] hover:bg-indigo-50 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Foto</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {cameraNotice && (
          <div className="mb-4 p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs font-medium text-[#3B3486]">
            {cameraNotice}
          </div>
        )}

        {/* Main Scan Card matching PDF Page 15 */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-indigo-100/80 mb-5">
          <p className="text-center text-sm sm:text-base font-semibold text-[#4F46E5] mb-4">
            Pindai wajahmu untuk analisis kulit
          </p>

          {/* Square Portrait Viewfinder with Corner Brackets */}
          <div
            data-testid="skin-scan-viewfinder"
            className={`relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden bg-neutral-700 transition-all ${
              flashOn ? 'ring-4 ring-amber-300 brightness-110' : ''
            }`}
          >
            {cameraSource === 'webcam' ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={displayImage}
                alt="Wajah untuk AI Skin Scan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}

            {/* 4 Corner Framing Brackets */}
            <div
              aria-hidden="true"
              className="w-14 h-14 border-t-4 border-l-4 border-white rounded-tl-2xl absolute top-5 left-5 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="w-14 h-14 border-t-4 border-r-4 border-white rounded-tr-2xl absolute top-5 right-5 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="w-14 h-14 border-b-4 border-l-4 border-white rounded-bl-2xl absolute bottom-5 left-5 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="w-14 h-14 border-b-4 border-r-4 border-white rounded-br-2xl absolute bottom-5 right-5 pointer-events-none"
            />

            {/* Active Laser Scan Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-indigo-950/35 flex flex-col items-center justify-center">
                <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-[#A5A1FF] to-transparent shadow-lg shadow-indigo-400 animate-scan-laser absolute top-6" />
                <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl text-center">
                  <p className="text-xs font-bold text-[#4F46E5] tabular-nums">
                    Menganalisis Kondisi Kulit... {scanProgress}%
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Mendeteksi kelembapan, minyak T-zone, pori & tekstur
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Card matching PDF Page 15 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 mb-5">
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#5B56E0] shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#1E1B4B]">
              Tips untuk hasil terbaik
            </h2>
          </div>

          <ol className="space-y-2.5 text-xs sm:text-sm text-[#2D2A6E] font-medium">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#6C67F0] shrink-0" />
              <span>1. Pastikan wajah dalam pencahayaan yang baik</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#6C67F0] shrink-0" />
              <span>2. Hindari memakai makeup tebal</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#6C67F0] shrink-0" />
              <span>3. Posisi wajah menghadap kamera</span>
            </li>
          </ol>
        </div>

        {/* Bottom Camera Controls Bar matching PDF Page 15 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 flex items-center justify-around">
          <button
            type="button"
            onClick={() => setFlashOn((prev) => !prev)}
            className="flex flex-col items-center gap-2 group min-w-[76px]"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors border ${
                flashOn
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md'
                  : 'bg-[#F5F4FF] text-[#5B56E0] border-indigo-100 group-hover:bg-indigo-100/60'
              }`}
            >
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-[#3B3486]">
              {flashOn ? 'Flash Aktif' : 'Flash'}
            </span>
          </button>

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              disabled={isScanning}
              onClick={handleStartScan}
              aria-label="Mulai Scan"
              className="w-20 h-20 rounded-full border-[6px] border-[#5B56E0] bg-white hover:bg-indigo-50 active:scale-95 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center"
            >
              <span className="w-14 h-14 rounded-full bg-indigo-50/50 block" />
            </button>
            <span className="text-sm font-extrabold text-[#3B3486]">
              {isScanning ? 'Memindai...' : 'Mulai Scan'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleCamera}
            className="flex flex-col items-center gap-2 group min-w-[76px]"
          >
            <div className="w-14 h-14 rounded-full bg-[#F5F4FF] text-[#5B56E0] border border-indigo-100 group-hover:bg-indigo-100/60 flex items-center justify-center transition-colors">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-[#3B3486] whitespace-nowrap">
              Ganti Kamera
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface AnalysisResultViewProps {
  result: SkinScanResult;
  onBack: () => void;
  onViewRecommendations: () => void;
  onRescan: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  result,
  onBack,
  onViewRecommendations,
  onRescan,
}) => {
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(null);

  const metricCards = [
    {
      ...result.metrics.kelembapan,
      icon: Droplets,
      iconBg: 'bg-emerald-50 text-emerald-600',
      barColor: 'bg-emerald-500',
    },
    {
      ...result.metrics.minyak,
      icon: Flame,
      iconBg: 'bg-rose-50 text-rose-500',
      barColor: 'bg-rose-500',
    },
    {
      ...result.metrics.tekstur,
      icon: Layers,
      iconBg: 'bg-amber-50 text-amber-500',
      barColor: 'bg-amber-400',
    },
    {
      ...result.metrics.pori,
      icon: CircleDot,
      iconBg: 'bg-amber-50 text-amber-500',
      barColor: 'bg-amber-400',
    },
    {
      ...result.metrics.jerawat,
      icon: AlertCircle,
      iconBg: 'bg-rose-50 text-rose-500',
      barColor: 'bg-amber-400',
    },
    {
      ...result.metrics.kemerahan,
      icon: Sun,
      iconBg: 'bg-rose-50 text-rose-500',
      barColor: 'bg-emerald-500',
    },
  ];

  // SVG circle math for Skin Score 68/100
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.skinScore / 100) * circumference;

  return (
    <div className="min-h-screen w-full bg-[#F7F6FF] pb-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header matching PDF Page 16 */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
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
                Hasil Analisis
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Berikut adalah hasil analisis kulitmu berdasarkan scan wajah.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onRescan}
            className="px-3.5 py-2 rounded-xl bg-white border border-indigo-100 text-xs font-semibold text-[#5B56E0] hover:bg-indigo-50 transition-colors whitespace-nowrap shrink-0"
          >
            Scan Ulang
          </button>
        </div>

        {/* Top Section: Annotated Face Portrait + 3 Summary Cards (PDF Page 16) */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 mb-6 items-stretch">
          {/* Left: Annotated Face Portrait */}
          <div className="col-span-6 w-full h-full min-h-[250px] sm:min-h-[340px] bg-neutral-800 rounded-3xl overflow-hidden relative shadow-md">
            <img
              src={result.imageUrl}
              alt="Hasil Scan Wajah"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            {/* Corner Framing Brackets */}
            <div
              aria-hidden="true"
              className="w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-white rounded-tl-xl absolute top-3 left-3 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-white rounded-tr-xl absolute top-3 right-3 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-white rounded-bl-xl absolute bottom-3 left-3 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-white rounded-br-xl absolute bottom-3 right-3 pointer-events-none"
            />

            {/* SVG Connector Lines for the 4 Face Markers */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {result.markers.map((m) => {
                const strokeColor =
                  m.tone === 'danger'
                    ? '#FB7185'
                    : m.tone === 'warning'
                    ? '#FBBF24'
                    : '#818CF8';
                return (
                  <g key={m.id}>
                    <line
                      x1={m.x}
                      y1={m.y}
                      x2={m.targetX}
                      y2={m.targetY}
                      stroke={strokeColor}
                      strokeWidth="0.7"
                    />
                    <circle
                      cx={m.targetX}
                      cy={m.targetY}
                      r="1.6"
                      fill={strokeColor}
                      stroke="#FFFFFF"
                      strokeWidth="0.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Callout Buttons on Face matching PDF Page 16 */}
            <button
              type="button"
              onClick={() => setSelectedMetricId('jerawat')}
              className="absolute top-[13%] left-[5%] px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-rose-500/85 hover:bg-rose-500 text-white text-[9px] sm:text-[11px] font-semibold leading-tight shadow-md backdrop-blur-xs border border-white/40 text-left transition-transform active:scale-95"
            >
              Jerawat &amp;
              <br />
              Komedo
            </button>

            <button
              type="button"
              onClick={() => setSelectedMetricId('minyak')}
              className="absolute top-[18%] right-[4%] px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-500/85 hover:bg-amber-500 text-white text-[9px] sm:text-[11px] font-semibold shadow-md backdrop-blur-xs border border-white/40 whitespace-nowrap transition-transform active:scale-95"
            >
              Minyak Berlebih
            </button>

            <button
              type="button"
              onClick={() => setSelectedMetricId('tekstur')}
              className="absolute bottom-[32%] left-[4%] px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#6C67F0]/85 hover:bg-[#6C67F0] text-white text-[9px] sm:text-[11px] font-semibold shadow-md backdrop-blur-xs border border-white/40 whitespace-nowrap transition-transform active:scale-95"
            >
              Tekstur Kasar
            </button>

            <button
              type="button"
              onClick={() => setSelectedMetricId('kemerahan')}
              className="absolute bottom-[33%] right-[4%] px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-rose-500/85 hover:bg-rose-500 text-white text-[9px] sm:text-[11px] font-semibold shadow-md backdrop-blur-xs border border-white/40 whitespace-nowrap transition-transform active:scale-95"
            >
              Kemerahan
            </button>
          </div>

          {/* Right: 3 Summary Cards (Skin Score, Profil Kulit, Kondisi Utama) */}
          <div className="col-span-6 flex flex-col justify-between gap-2.5 sm:gap-3.5">
            {/* Card 1: Skin Score 68/100 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm border border-indigo-100/80 flex items-center gap-2.5 sm:gap-4">
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="#E8E6FF"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="#6C67F0"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    data-testid="skin-score-value"
                    className="text-lg sm:text-2xl font-extrabold text-[#1E1B4B] tabular-nums leading-none"
                  >
                    {result.skinScore}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-medium text-slate-400 tabular-nums mt-0.5">
                    /100
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xs sm:text-lg font-extrabold text-[#1E1B4B]">
                  Skin Score
                </h2>
                <p className="text-[11px] sm:text-sm font-medium text-slate-600 mt-0.5">
                  {result.scoreLabel}
                </p>
              </div>
            </div>

            {/* Card 2: Profil Kulit (Kombinasi · Sensitif) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm border border-indigo-100/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500">
                    Profil Kulit
                  </p>
                  <p className="text-xs sm:text-base font-extrabold text-[#1E1B4B] mt-0.5">
                    {result.skinProfile}
                  </p>
                </div>
              </div>

              <span className="text-[10px] sm:text-xs font-semibold text-[#4F46E5]">
                {result.skinTag}
              </span>
            </div>

            {/* Card 3: Kondisi Utama */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm border border-indigo-100/80 flex items-start gap-2.5 sm:gap-3.5">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-[#1E1B4B]">
                  Kondisi Utama
                </p>
                <p className="text-[10px] sm:text-sm text-slate-600 leading-snug mt-0.5">
                  {result.mainCondition}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Detail Analisis (6 Metric Cards in 3-col Grid matching PDF Page 16) */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-3.5">
            <BarChart3 className="w-5 h-5 text-[#5B56E0]" />
            <h2 className="text-base sm:text-xl font-extrabold text-[#1E1B4B]">
              Detail Analisis
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {metricCards.map((m) => {
              const IconComp = m.icon;
              const isHighlighted = selectedMetricId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMetricId(isHighlighted ? null : m.id)}
                  className={`bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-left shadow-sm border transition-all ${
                    isHighlighted
                      ? 'border-[#6C67F0] ring-2 ring-[#6C67F0]/20'
                      : 'border-indigo-100/80 hover:border-indigo-200'
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${m.iconBg} flex items-center justify-center mb-2 sm:mb-3`}
                  >
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <p className="text-[11px] sm:text-sm font-bold text-[#1E1B4B] truncate">
                    {m.label}
                  </p>
                  <p className="text-lg sm:text-2xl font-extrabold text-[#1E1B4B] tabular-nums mt-0.5">
                    {m.value}%
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 mb-2.5 truncate">
                    {m.status}
                  </p>

                  <div className="w-full h-1.5 sm:h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m.barColor}`}
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Temuan Penting Card matching PDF Page 16 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100/80 mb-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F3F1FF] text-[#5B56E0] flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#3B3486] mb-2">
              Temuan Penting
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              {result.findings.map((finding, idx) => (
                <li key={idx}>• {finding}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Primary CTA matching PDF Page 16 */}
        <button
          type="button"
          onClick={onViewRecommendations}
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#6C67F0] to-[#7C78F6] hover:from-[#5B56E0] hover:to-[#6C67F0] text-white font-bold text-base shadow-xl shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
        >
          <span>Lihat Rekomendasi</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
