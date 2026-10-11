import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { 
  ArrowLeft, Gem, Sparkles, CheckCircle2, Copy, 
  ExternalLink, Check, Store, Gift, Tag 
} from 'lucide-react';

export const VoucherScreen: React.FC = () => {
  const { pointsBalance, redeemVoucher, activeScreen, setActiveScreen, appliedVoucherCode } = useAppStore();
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; title: string; cost: number; code: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const vouchers = [
    {
      id: 'v1',
      title: 'Diskon 10% Tur Berikutnya',
      points: 500,
      validUntil: '31 Des 2026',
      desc: 'Mendukung pelestarian tradisi lokal di Desa Wisata melalui program pemberdayaan masyarakat.',
      code: 'ZAMZAM10TUR'
    },
    {
      id: 'v2',
      title: 'Gratis Souvenir Kerajinan Tangan',
      points: 800,
      validUntil: 'Tersedia di lokasi pilihan',
      desc: 'Membantu pengrajin bambu lokal untuk terus berkarya dan menjaga warisan leluhur kita.',
      code: 'ZAMZAMSOUVENIR'
    },
    {
      id: 'v3',
      title: 'Potongan Harga Makan Siang',
      points: 300,
      validUntil: 'Min. Transaksi Rp 100rb',
      desc: 'Setiap potongan harga membantu UMKM kuliner lokal menyajikan cita rasa otentik nusantara.',
      code: 'ZAMZAMKULINER'
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Page Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <button
            onClick={() => setActiveScreen('home')}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#19324d] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <h1 className="text-base sm:text-lg font-black text-[#19324d]">
            Voucher & Hadiah
          </h1>

          <div className="w-8" />
        </div>
        
        {/* SUCCESS REDEMPTION VIEW (exact as Figma Page 29) */}
        {activeScreen === 'voucher-success' ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-sm animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#19324d]">Penukaran Berhasil!</h2>
              <p className="text-xs text-slate-500 mt-1">Voucher Anda siap digunakan untuk tur berikutnya.</p>
            </div>

            {/* Voucher Ticket Box (exact as Figma Page 29) */}
            <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl space-y-3 max-w-sm mx-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                KODE VOUCHER
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-black text-[#19324d] font-mono">
                  {appliedVoucherCode || 'ZAMZAM50K'}
                </span>
                <button
                  onClick={() => handleCopy(appliedVoucherCode || 'ZAMZAM50K')}
                  className="p-1 text-slate-500 hover:text-[#19324d]"
                  title="Salin Kode"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-xs font-mono text-slate-400 pt-1 tracking-widest">
                ||||| | |||| ||| |||| | ||
              </div>
            </div>

            <button
              onClick={() => setActiveScreen('home')}
              className="w-full max-w-sm py-3.5 bg-[#19324d] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md mx-auto block"
            >
              Ke Beranda Sekarang
            </button>
          </div>
        ) : (
          /* VOUCHER LIST (exact as Figma Page 27 & 28) */
          <>
            {/* SALDO POIN CARD (exact as Figma Page 27) */}
            <div className="bg-gradient-to-br from-[#19324d] to-[#122438] rounded-3xl p-6 text-white space-y-2 shadow-lg">
              <span className="text-xs text-sky-200 block font-medium">Saldo Poin Anda</span>
              <div className="text-3xl sm:text-4xl font-extrabold flex items-center gap-2">
                <span>{pointsBalance.toLocaleString('id-ID')}</span>
                <span className="text-sm font-normal text-sky-200">Poin</span>
              </div>
              <div className="text-xs text-sky-200/90 pt-1 flex items-center gap-1.5">
                <span>$ Setara dengan</span>
                <strong className="text-white">Rp {(pointsBalance * 10).toLocaleString('id-ID')}</strong>
              </div>
            </div>

            {/* VOUCHER LIST (exact as Figma Page 27) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#19324d]">
                  Voucher Tersedia
                </h3>
                <span className="text-xs text-slate-500 hover:underline cursor-pointer">
                  Lihat Riwayat
                </span>
              </div>

              <div className="space-y-4">
                {vouchers.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3.5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-[#19324d]">
                          {v.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                          {v.validUntil}
                        </span>
                      </div>

                      <div className="p-2 bg-sky-50 rounded-2xl text-center min-w-[58px] border border-sky-100">
                        <span className="text-sm font-black text-[#19324d] block">{v.points}</span>
                        <span className="text-[9px] text-slate-500 uppercase font-bold">Pts</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{v.desc}"
                    </p>

                    <button
                      type="button"
                      onClick={() => setConfirmModal({ open: true, title: v.title, cost: v.points, code: v.code })}
                      className="w-full py-3 bg-[#19324d] hover:bg-[#122438] text-white font-bold text-xs rounded-full shadow-sm active:scale-98 transition-all"
                    >
                      Tukarkan Voucher
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* CONFIRM REDEMPTION MODAL (exact as Figma Page 58) */}
      {confirmModal?.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-5 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-xl">
              🍴
            </div>

            <div>
              <h3 className="font-extrabold text-base text-[#19324d]">
                {confirmModal.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">Kuliner & Kemitraan UMKM Pilihan</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Saldo Poin Anda</span>
                <span className="font-bold text-slate-900">{pointsBalance} 💎</span>
              </div>
              <div className="flex justify-between text-red-600 font-semibold">
                <span>Harga Voucher</span>
                <span>- {confirmModal.cost} 💎</span>
              </div>
              <div className="flex justify-between text-[#19324d] font-extrabold pt-1 border-t border-slate-200">
                <span>Sisa Poin</span>
                <span>{Math.max(0, pointsBalance - confirmModal.cost)} 💎</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  redeemVoucher(confirmModal.cost, confirmModal.code);
                  setConfirmModal(null);
                }}
                className="w-full py-3 bg-[#19324d] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md"
              >
                Konfirmasi Penukaran
              </button>
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="w-full py-2 text-xs text-slate-500 font-semibold hover:underline"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
