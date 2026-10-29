import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, Eye, EyeOff, Phone, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { validateAuthInput } from '../utils/skinLogic';

export type OnboardingStep = 'splash' | 'onboard-1' | 'onboard-2' | 'onboard-3' | 'login' | 'register';

interface OnboardingAndAuthProps {
  step: OnboardingStep;
  onChangeStep: (step: OnboardingStep) => void;
  onCompleteAuth: (userData?: { fullName?: string; emailOrPhone?: string }) => void;
}

const ONBOARD_SLIDES = [
  {
    step: 'onboard-1' as const,
    index: 0,
    title: 'Scan Wajah',
    description: 'Gunakan kamera untuk menganalisis kondisi kulit wajahmu dengan teknologi AI.',
    image: '/assets/facewish/onboard_scan.jpg',
    next: 'onboard-2' as const,
    prev: 'splash' as const,
  },
  {
    step: 'onboard-2' as const,
    index: 1,
    title: 'Rekomendasi Produk',
    description: 'Dapatkan rekomendasi facewash, skincare, dan bahan aktif yang sesuai dengan jenis kulit dan kebutuhanmu.',
    image: '/assets/facewish/onboard_product.jpg',
    next: 'onboard-3' as const,
    prev: 'onboard-1' as const,
  },
  {
    step: 'onboard-3' as const,
    index: 2,
    title: 'Saran Makanan',
    description: 'Temukan rekomendasi makanan bergizi yang sesuai dengan preferensi, alergi, dan kebutuhan kulitmu.',
    image: '/assets/facewish/onboard_food.jpg',
    next: 'login' as const,
    prev: 'onboard-2' as const,
  },
];

export const OnboardingAndAuth: React.FC<OnboardingAndAuthProps> = ({
  step,
  onChangeStep,
  onCompleteAuth,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('Venelrangga288@gmail.com');
  const [password, setPassword] = useState('facewish2026');
  const [fullName, setFullName] = useState('Rangga');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  if (step === 'splash') {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#6C67F0] via-[#7571F6] to-[#7D79F8] flex flex-col items-center justify-between px-6 py-12 text-white relative overflow-hidden">
        {/* Subtle decorative background circles matching PDF Page 1 */}
        <div
          aria-hidden="true"
          className="w-[460px] h-[460px] rounded-full bg-white/10 absolute -top-16 -right-24 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="w-[340px] h-[340px] rounded-full bg-white/5 absolute top-32 -left-24 pointer-events-none"
        />

        {/* Quick skip for desktop/demo testing */}
        <div className="w-full max-w-md flex justify-end z-10">
          <button
            type="button"
            onClick={() => onCompleteAuth({ fullName: 'Rangga', emailOrPhone: 'Venelrangga288@gmail.com' })}
            className="text-xs font-medium text-white/85 hover:text-white underline underline-offset-4 py-2 px-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Lewati ke Beranda
          </button>
        </div>

        {/* Center Logo & Brand Lockup */}
        <div className="flex flex-col items-center text-center my-auto z-10 max-w-sm">
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white/95 p-2 shadow-2xl shadow-indigo-950/25 mb-8 flex items-center justify-center overflow-hidden">
            <img
              src="/assets/facewish/logo_circle.jpg"
              alt="FaceWish AI Skin Scan Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
            FaceWish
          </h1>
          <p className="text-base sm:text-lg font-medium text-white/90">
            Healthy Skin, Better You
          </p>
        </div>

        {/* Bottom CTA Area matching PDF Page 1 */}
        <div className="w-full max-w-sm flex flex-col items-center text-center z-10 space-y-5 pb-4">
          <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed">
            Kenali Kondisi Kulitmu,
            <br />
            Dapatkan Rekomendasi Terbaik
          </p>

          <button
            type="button"
            onClick={() => onChangeStep('onboard-1')}
            className="w-full h-14 rounded-full bg-white text-[#635EE2] font-bold text-base shadow-xl shadow-indigo-950/20 hover:bg-indigo-50 active:scale-[0.99] transition-all flex items-center justify-center whitespace-nowrap shrink-0"
          >
            Mulai
          </button>
        </div>
      </div>
    );
  }

  const activeSlide = ONBOARD_SLIDES.find((s) => s.step === step);
  if (activeSlide) {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col items-center justify-between px-6 py-8">
        {/* Top Bar with Back Button & Skip */}
        <div className="w-full max-w-md flex items-center justify-between">
          <button
            type="button"
            aria-label="Kembali"
            onClick={() => onChangeStep(activeSlide.prev)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#3B3486] hover:bg-indigo-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => onChangeStep('login')}
            className="text-xs font-semibold text-[#6C67F0] hover:text-[#4F46E5] px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Lewati
          </button>
        </div>

        {/* Center Illustration & Copy matching PDF Pages 2, 3, 4 */}
        <div className="w-full max-w-md flex flex-col items-center text-center my-auto py-4">
          <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden mb-8 flex items-center justify-center bg-[#F8F7FF]">
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <h2
            className="text-2xl sm:text-3xl font-extrabold text-[#3B3486] mb-4"
            style={{ textWrap: 'balance' }}
          >
            {activeSlide.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xs">
            {activeSlide.description}
          </p>
        </div>

        {/* Bottom Pagination Dots & Lanjut Button */}
        <div className="w-full max-w-xs flex flex-col items-center space-y-7 pb-6">
          <div className="flex items-center gap-3" role="tablist" aria-label="Slide onboarding">
            {ONBOARD_SLIDES.map((s) => {
              const isCurrent = s.index === activeSlide.index;
              return (
                <button
                  key={s.step}
                  type="button"
                  aria-label={`Slide ${s.index + 1}: ${s.title}`}
                  onClick={() => onChangeStep(s.step)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    isCurrent ? 'bg-[#6C67F0]' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onChangeStep(activeSlide.next)}
            className="w-full h-13 rounded-full bg-[#6C67F0] hover:bg-[#5B56E0] text-white font-semibold text-base shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center whitespace-nowrap shrink-0"
          >
            Lanjut
          </button>
        </div>
      </div>
    );
  }

  // Login (Page 5) or Register (Page 6)
  const isRegister = step === 'register';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const validation = validateAuthInput(
      isRegister ? 'register' : 'login',
      emailOrPhone,
      password,
      fullName
    );
    if (!validation.valid) {
      setErrorMsg(validation.error || 'Mohon lengkapi data Anda.');
      return;
    }
    onCompleteAuth({
      fullName: isRegister ? fullName.trim() : 'Rangga',
      emailOrPhone: emailOrPhone.trim(),
    });
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center px-6 py-8">
      {/* Top Back Button */}
      <div className="w-full max-w-md flex items-center justify-between mb-2">
        <button
          type="button"
          aria-label="Kembali"
          onClick={() => onChangeStep(isRegister ? 'login' : 'onboard-3')}
          className="w-11 h-11 rounded-full flex items-center justify-center text-[#1E1B4B] hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={() => onCompleteAuth({ fullName: 'Rangga', emailOrPhone: 'Venelrangga288@gmail.com' })}
          className="text-xs font-semibold text-[#6C67F0] hover:text-[#4F46E5] px-3 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
        >
          <span>Masuk Instan (Rangga)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="w-full max-w-md flex flex-col items-center my-auto">
        {/* Circular Logo */}
        <div className="w-28 h-28 rounded-full overflow-hidden mb-3 flex items-center justify-center">
          <img
            src="/assets/facewish/logo_circle.jpg"
            alt="FaceWish Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#2D2A6E] to-[#746FF4] bg-clip-text text-transparent mb-2">
          FaceWish
        </h1>

        {isRegister ? (
          <div className="w-full text-left mt-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Daftar</h2>
            <p className="text-sm text-slate-500">
              Buat akun untuk mulai menggunakan FaceWish
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-600 mb-7">Masuk untuk melanjutkan</p>
        )}

        {errorMsg && (
          <div
            role="alert"
            className="w-full mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium"
          >
            {errorMsg}
          </div>
        )}

        {resetNotice && (
          <div
            role="status"
            className="w-full mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{resetNotice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {isRegister && (
            <div>
              <label htmlFor="auth-fullname" className="sr-only">
                Nama lengkap
              </label>
              <div className="relative flex items-center">
                <User className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  id="auth-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="w-full h-13 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6C67F0] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="sr-only">
              Email atau nomor telepon
            </label>
            <div className="relative flex items-center">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                id="auth-email"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Email atau nomor telepon"
                className="w-full h-13 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6C67F0] transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password" className="sr-only">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-13 pl-12 pr-12 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6C67F0] transition-colors"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                onClick={() => setShowPassword((prev) => !prev)}
                className="w-11 h-11 absolute right-1 flex items-center justify-center text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-13 rounded-2xl bg-[#6C67F0] hover:bg-[#5B56E0] text-white font-semibold text-base shadow-lg shadow-indigo-500/20 active:scale-[0.99] transition-all flex items-center justify-center whitespace-nowrap shrink-0 mt-2"
          >
            {isRegister ? 'Daftar' : 'Masuk'}
          </button>
        </form>

        {!isRegister && (
          <>
            <button
              type="button"
              onClick={() =>
                setResetNotice(
                  `Tautan reset password telah dikirim ke ${emailOrPhone || 'email Anda'}.`
                )
              }
              className="mt-4 text-xs font-medium text-[#5B56E0] hover:underline py-2"
            >
              Lupa password?
            </button>

            <div className="w-full flex items-center gap-4 my-5">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs text-slate-400">atau</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <p className="text-xs text-slate-500 mb-4">Daftar dengan</p>

            <div className="flex items-center justify-center gap-4 w-full">
              <button
                type="button"
                aria-label="Masuk dengan Google"
                onClick={() => onCompleteAuth({ fullName: 'Rangga', emailOrPhone: 'Venelrangga288@gmail.com' })}
                className="w-20 h-13 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 flex items-center justify-center transition-colors font-bold text-lg text-[#4285F4]"
              >
                G
              </button>
              <button
                type="button"
                aria-label="Masuk dengan Apple"
                onClick={() => onCompleteAuth({ fullName: 'Rangga', emailOrPhone: 'Venelrangga288@gmail.com' })}
                className="w-20 h-13 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 flex items-center justify-center transition-colors text-slate-900 font-semibold text-sm"
              >
                Apple
              </button>
              <button
                type="button"
                aria-label="Masuk dengan Nomor Telepon"
                onClick={() => onCompleteAuth({ fullName: 'Rangga', emailOrPhone: '0881038755232' })}
                className="w-20 h-13 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 flex items-center justify-center transition-colors text-[#3B3486]"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </>
        )}

        <div className="mt-8 text-xs text-slate-600">
          {isRegister ? (
            <>
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  onChangeStep('login');
                }}
                className="font-semibold text-[#5B56E0] hover:underline py-1"
              >
                Masuk
              </button>
            </>
          ) : (
            <>
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  onChangeStep('register');
                }}
                className="font-semibold text-[#5B56E0] hover:underline py-1"
              >
                Daftar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
