import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { LogoZH } from '../LogoZH';
import { ShieldCheck, CheckCircle2, ArrowRight, Delete } from 'lucide-react';

export const RegisterScreen: React.FC = () => {
  const { login, setActiveScreen } = useAppStore();
  const [roleTab, setRoleTab] = useState<'Wisatawan' | 'Pemandu'>('Wisatawan');
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('081234567890');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // OTP 6 Digits
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(297); // 04:57

  useEffect(() => {
    if (step === 'otp' && secondsLeft > 0) {
      const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, secondsLeft]);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeypadPress = (val: string) => {
    if (val === 'backspace') {
      const idx = otp.map(x => !!x).lastIndexOf(true);
      if (idx !== -1) {
        const next = [...otp];
        next[idx] = '';
        setOtp(next);
      }
      return;
    }

    const firstEmpty = otp.findIndex(x => x === '');
    if (firstEmpty !== -1) {
      const next = [...otp];
      next[firstEmpty] = val;
      setOtp(next);

      // Auto submit if 6th digit entered
      if (firstEmpty === 5) {
        setTimeout(() => setStep('success'), 400);
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col justify-between p-6 sm:p-8 max-w-md mx-auto">
      
      {/* STEP 1: FORM PENDAFTARAN (Figma Page 8) */}
      {step === 'form' && (
        <>
          <div className="flex flex-col items-center pt-2">
            <div className="mb-2">
              <LogoZH size={72} withContainer={false} />
            </div>
            <h1 className="text-xl font-extrabold text-[#19324d] tracking-tight uppercase">
              ZAMZAM HIDDEN SPOT
            </h1>

            {/* Role Switcher */}
            <div className="w-full mt-4 bg-[#f1f5f9] border border-[#19324d] rounded-full p-1 flex">
              <button
                type="button"
                onClick={() => setRoleTab('Wisatawan')}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
                  roleTab === 'Wisatawan'
                    ? 'bg-[#19324d] text-white shadow-md'
                    : 'text-[#19324d] hover:bg-slate-200'
                }`}
              >
                Wisatawan
              </button>
              <button
                type="button"
                onClick={() => setRoleTab('Pemandu')}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
                  roleTab === 'Pemandu'
                    ? 'bg-[#19324d] text-white shadow-md'
                    : 'text-[#19324d] hover:bg-slate-200'
                }`}
              >
                Pemandu
              </button>
            </div>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-3 my-4 flex-1">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                NAMA LENGKAP
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#19324d]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                EMAIL/USERNAME
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email atau username"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#19324d]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                NO TELEPON
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812XXXXXX"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#19324d]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#19324d]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                KONFIRMASI PASSWORD
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#19324d]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#19324d] hover:bg-[#122438] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md active:scale-98 transition-all mt-4"
            >
              DAFTAR
            </button>
          </form>

          <div className="text-center pb-2">
            <p className="text-xs text-slate-600">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => setActiveScreen('login')}
                className="font-bold text-slate-900 underline ml-1"
              >
                Masuk
              </button>
            </p>
          </div>
        </>
      )}

      {/* STEP 2: VERIFIKASI OTP 6 DIGIT & KEYPAD (Figma Page 9) */}
      {step === 'otp' && (
        <div className="flex flex-col justify-between h-full py-4 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 border-2 border-slate-300 rounded-xl mx-auto flex items-center justify-center text-slate-400">
              📱
            </div>
            <h2 className="text-xl font-bold text-[#19324d]">Verifikasi OTP</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Masukkan 6 digit kode yang telah dikirimkan ke perangkat Anda.
            </p>

            {/* 6 Digit Display Boxes */}
            <div className="flex justify-center gap-2 pt-4">
              {otp.map((digit, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-12 rounded-lg border-b-2 flex items-center justify-center text-xl font-bold transition-all ${
                    digit ? 'border-[#19324d] text-[#19324d]' : 'border-slate-300 text-transparent'
                  }`}
                >
                  {digit || '—'}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="text-base font-bold text-[#19324d]">{formatTimer(secondsLeft)}</div>
              <button
                type="button"
                onClick={() => setSecondsLeft(297)}
                className="text-xs text-slate-500 hover:text-slate-800 underline mt-0.5"
              >
                Kirim ulang kode
              </button>
            </div>
          </div>

          {/* Numeric Keypad (exact layout from Figma Page 9) */}
          <div className="grid grid-cols-3 gap-y-4 gap-x-6 px-6 max-w-xs mx-auto w-full pt-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeypadPress(num)}
                className="h-14 text-2xl font-semibold text-slate-800 hover:bg-slate-200/60 rounded-2xl transition-colors active:scale-90"
              >
                {num}
              </button>
            ))}
            <div />
            <button
              type="button"
              onClick={() => handleKeypadPress('0')}
              className="h-14 text-2xl font-semibold text-slate-800 hover:bg-slate-200/60 rounded-2xl transition-colors active:scale-90"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleKeypadPress('backspace')}
              className="h-14 flex items-center justify-center text-slate-800 hover:bg-slate-200/60 rounded-2xl transition-colors active:scale-90"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: OTP BERHASIL & MASUK KE DASHBOARD (Figma Page 10 & 11) */}
      {step === 'success' && (
        <div className="flex flex-col items-center justify-center my-auto py-12 space-y-6 text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/30">
              <ShieldCheck className="w-14 h-14" />
            </div>
          </div>

          <div className="space-y-2 max-w-xs">
            <h2 className="text-2xl font-extrabold text-[#19324d]">Verifikasi OTP Berhasil!</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Identitas Anda telah dikonfirmasi dan akun sudah aktif siap digunakan.
            </p>
          </div>

          <div className="w-full max-w-xs pt-4 space-y-3">
            <button
              type="button"
              onClick={() => login(roleTab === 'Wisatawan' ? 'wisatawan' : 'pemandu', email || name)}
              className="w-full py-3.5 bg-[#19324d] hover:bg-[#122438] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
