import React from 'react';
import { X, Star, MapPin, ShieldCheck, Check, CalendarCheck, HelpCircle } from 'lucide-react';
import { RentalItem } from '../types.ts';
import { ItemIllustration } from './ItemIllustration.tsx';

interface ItemDetailModalProps {
  item: RentalItem | null;
  onClose: () => void;
  onRentNow: (item: RentalItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onRentNow }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-white/15 text-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white shadow-md backdrop-blur-sm transition-colors cursor-pointer border border-white/10"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 rounded-t-3xl overflow-hidden">
          <ItemIllustration type={item.imageSvgType} name={item.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white border border-white/20">
              {item.category}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-600/90 text-white border border-blue-400/30">
              {item.condition}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header & Price */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.location}</span>
                <span aria-hidden="true">·</span>
                <span>{item.distanceKm} km away</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{item.name}</h3>
              <div className="flex items-center gap-2 mt-1.5 text-xs">
                <div className="flex items-center gap-1 font-semibold text-slate-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-400">({item.reviewCount} neighbor reviews)</span>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-slate-400 block">Daily Rental</span>
              <div className="text-2xl font-bold text-blue-400 tabular-nums">
                ₹{item.pricePerDay}
                <span className="text-xs font-normal text-slate-400"> / day</span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                + ₹{item.securityDeposit} refundable deposit
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Item Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Features / Inclusions */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Included with this Rental
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-950/60 p-3 rounded-xl border border-white/10">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Owner Card */}
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-600/30">
                {item.owner.avatarInitials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">{item.owner.name}</span>
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xs text-slate-400">
                  Member since {item.owner.memberSince} · Response time {item.owner.responseRate}
                </div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-semibold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                Verified Neighbor
              </span>
            </div>
          </div>

          {/* Protection note */}
          <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-white/10">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Your security deposit is safeguarded in escrow by ShareGrid and returned immediately once the gear is safely returned.
            </span>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => {
                onClose();
                onRentNow(item);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Rent Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
