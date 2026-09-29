import React, { useState } from 'react';
import { X, Calendar, Clock, ShieldCheck, CheckCircle2, IndianRupee, MapPin, ArrowRight } from 'lucide-react';
import { RentalItem } from '../types.ts';

interface RentModalProps {
  item: RentalItem | null;
  onClose: () => void;
  onConfirmed: (bookingRef: string) => void;
}

export const RentModal: React.FC<RentModalProps> = ({ item, onClose, onConfirmed }) => {
  const [days, setDays] = useState(2);
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [renterName, setRenterName] = useState('');
  const [renterPhone, setRenterPhone] = useState('');
  const [pickupNote, setPickupNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  if (!item) return null;

  const rentalSubtotal = item.pricePerDay * days;
  const deposit = item.securityDeposit;
  const totalPayable = rentalSubtotal + deposit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `SG-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(refCode);
    setIsSuccess(true);
    onConfirmed(refCode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-white/15 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close rental dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Rental Request Submitted!
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                You&apos;re All Set to Rent
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Booking Reference: <strong className="font-mono text-white bg-slate-950 px-2 py-0.5 rounded border border-white/10">{bookingCode}</strong>
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-slate-950/60 rounded-2xl p-5 border border-white/10 text-left text-xs space-y-2.5">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Item:</span>
                <span className="font-semibold text-white">{item.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Duration:</span>
                <span className="font-semibold text-white">{days} day(s) starting {startDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Pickup Location:</span>
                <span className="font-semibold text-white">{item.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Owner Contact:</span>
                <span className="font-semibold text-white">{item.owner.name} (Verified)</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-sm text-white pt-1">
                <span>Total Amount:</span>
                <span className="text-blue-400 tabular-nums">₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              We&apos;ve sent an instant SMS confirmation to {renterPhone || 'your mobile'}. The owner has received your request and typically confirms in under {item.owner.responseRate}.
            </p>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30"
              >
                Back to ShareGrid
              </button>
            </div>
          </div>
        ) : (
          /* Rental Form */
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Instant Rental Request
              </span>
              <h3 className="text-2xl font-bold text-white mt-0.5">
                Rent {item.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.location}</span>
                <span>· Hosted by {item.owner.name}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Duration and Date Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Rental Duration *
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  >
                    <option value={1} className="bg-slate-900 text-white">1 Day (₹{item.pricePerDay})</option>
                    <option value={2} className="bg-slate-900 text-white">2 Days (₹{item.pricePerDay * 2})</option>
                    <option value={3} className="bg-slate-900 text-white">3 Days (₹{item.pricePerDay * 3})</option>
                    <option value={5} className="bg-slate-900 text-white">5 Days (₹{item.pricePerDay * 5})</option>
                    <option value={7} className="bg-slate-900 text-white">1 Week (₹{item.pricePerDay * 7})</option>
                  </select>
                </div>
              </div>

              {/* Renter Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={renterName}
                    onChange={(e) => setRenterName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={renterPhone}
                    onChange={(e) => setRenterPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Note to owner */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Note to Owner (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Can pick up tomorrow at 10 AM, will return by Sunday noon"
                  value={pickupNote}
                  onChange={(e) => setPickupNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none placeholder:text-slate-500"
                />
              </div>

              {/* Pricing Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-blue-500/20 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Rental Fee ({days} days × ₹{item.pricePerDay})</span>
                  <span className="font-semibold text-white tabular-nums">₹{rentalSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1">
                    <span>Refundable Deposit</span>
                    <span className="text-[10px] text-slate-400">(Returned after handoff)</span>
                  </span>
                  <span className="font-semibold text-white tabular-nums">₹{deposit}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>ShareGrid Community Fee</span>
                  <span className="font-semibold text-emerald-400">FREE (0% Promo)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-white">
                  <span>Total Payable at Pickup:</span>
                  <span className="text-blue-400 tabular-nums">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero advance card payment required. Pay upon inspecting gear.</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
                >
                  <span>Confirm Rental Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
