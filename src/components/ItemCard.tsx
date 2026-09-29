import React from 'react';
import { Star, MapPin, Eye, CalendarCheck, ShieldCheck } from 'lucide-react';
import { RentalItem } from '../types.ts';
import { ItemIllustration } from './ItemIllustration.tsx';

interface ItemCardProps {
  item: RentalItem;
  onViewDetails: (item: RentalItem) => void;
  onRentNow: (item: RentalItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onViewDetails, onRentNow }) => {
  return (
    <article className="group bg-slate-900/65 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-2xl hover:border-blue-500/50 hover:shadow-blue-900/20 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Visual Container */}
      <div className="relative aspect-[4/3] bg-slate-950/80 overflow-hidden cursor-pointer" onClick={() => onViewDetails(item)}>
        <ItemIllustration type={item.imageSvgType} name={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        
        {/* Top metadata strip */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-slate-200 border border-white/15">
            {item.category}
          </span>
          <span className="text-[11px] font-semibold text-white bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-blue-400/40 shadow-sm">
            {item.condition}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Distance */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="shrink-0">{item.distanceKm} km away</span>
          </div>

          {/* Item Name */}
          <h3 
            onClick={() => onViewDetails(item)}
            className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {item.name}
          </h3>

          {/* Rating & Verified Owner */}
          <div className="flex items-center justify-between mt-2.5 text-xs">
            <div className="flex items-center gap-1 text-slate-200 font-semibold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({item.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Owner</span>
            </div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs text-slate-400 font-medium">Daily Rental</span>
              <div className="text-xl font-bold text-white tabular-nums">
                ₹{item.pricePerDay}
                <span className="text-xs font-normal text-slate-400"> / day</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Refundable Deposit</span>
              <span className="text-xs font-semibold text-slate-300 tabular-nums">₹{item.securityDeposit}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onViewDetails(item)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 active:bg-white/20 rounded-xl transition-colors cursor-pointer border border-white/10"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </button>
            <button
              onClick={() => onRentNow(item)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Rent Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
