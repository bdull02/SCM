import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Star, ArrowLeft, QrCode, CheckCircle2 } from 'lucide-react';

export const ReviewScreen: React.FC = () => {
  const { activeBooking, setActiveScreen, completeTourCheckOut } = useAppStore();
  const [rating, setRating] = useState(activeBooking.reviewRating || 5);
  const [reviewText, setReviewText] = useState(
    activeBooking.reviewComment || 
    'Pemandu sangat ramah, menjelaskan nilai sejarah dan cagar budaya dengan sangat mendalam. Sate Maranggi UMKM mitra juga sangat lezat!'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeTourCheckOut(rating, reviewText, activeBooking.id);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between p-6 sm:p-8 max-w-lg mx-auto">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={() => setActiveScreen('live-tour')}
          className="p-1 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold uppercase tracking-wider text-[#19324d]">
          Beri Ulasan & Selesaikan Tur
        </h1>
        <div className="w-5" />
      </div>

      {isSuccess ? (
        <div className="my-auto py-10 text-center space-y-4 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#19324d]">Tur Selesai & Sukses!</h2>
          <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            Ulasan Anda telah tersimpan. Dana Escrow sebesar <strong>Rp {activeBooking.totalAmount.toLocaleString('id-ID')}</strong> resmi dicairkan ke Pemandu <strong>{activeBooking.guide?.name}</strong>.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 font-bold max-w-xs mx-auto">
            🎉 +100 Poin Gamifikasi Ditambahkan ke Akun Anda!
          </div>
          <div className="space-y-2 pt-2 max-w-xs mx-auto">
            <button
              onClick={() => setActiveScreen('booking-detail')}
              className="w-full py-3.5 bg-[#19324d] hover:bg-[#122438] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md block transition-all"
            >
              Lihat Riwayat Booking
            </button>
            <button
              onClick={() => setActiveScreen('home')}
              className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-full hover:bg-slate-50 block transition-all"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="my-auto space-y-6">
          
          {/* Guide Avatar & Name (exact as Figma Page 55 & 56) */}
          <div className="text-center space-y-2">
            <img
              src={activeBooking.guide?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt="Guide"
              className="w-20 h-20 rounded-full object-cover border-4 border-[#19324d] mx-auto shadow-md"
            />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              PEMANDU WISATA ANDA
            </span>
            <h3 className="text-lg font-extrabold text-[#19324d]">
              {activeBooking.guide?.name || 'Bambang Pamungkas'}
            </h3>
          </div>

          {/* 5 STARS (exact as Figma Page 56) */}
          <div className="text-center space-y-1">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 transition-transform hover:scale-125 ${
                    rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                  }`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-600 block pt-1">
              {rating === 5 ? 'Sangat Memuaskan!' : rating === 4 ? 'Memuaskan' : 'Cukup Baik'}
            </span>
          </div>

          {/* Review Textarea (exact as Figma Page 55) */}
          <div className="space-y-1.5">
            <textarea
              rows={4}
              required
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Ceritakan pengalaman Anda bersama pemandu..."
              className="w-full p-4 bg-white border border-slate-300 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#19324d] shadow-sm leading-relaxed"
            />
            <p className="text-[11px] text-center text-slate-400 italic">
              "Ulasan Anda membantu UMKM lokal dan memperkuat reputasi pemandu!"
            </p>
          </div>

          {/* TIP QRIS OPTIONAL (exact as Figma Page 72) */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center space-y-2 shadow-sm">
            <span className="text-[11px] font-bold text-[#19324d] uppercase tracking-wider block">
              Tip untuk Pemandu (Opsional)
            </span>
            <div className="w-24 h-24 bg-slate-50 border border-slate-200 rounded-xl mx-auto flex flex-col items-center justify-center">
              <QrCode className="w-16 h-16 text-slate-800" />
              <span className="text-[8px] font-mono text-slate-400 uppercase">QRIS TIP</span>
            </div>
            <span className="text-[10px] text-slate-500 block">
              Scan QRIS untuk memberi apresiasi tip langsung
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#19324d] hover:bg-[#122438] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md active:scale-98 transition-all"
            >
              Kirim Ulasan
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen('home')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
            >
              Nanti Saja
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
