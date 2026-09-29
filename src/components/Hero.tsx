import React from 'react';
import { ArrowRight, PlusCircle, Sparkles, ChevronDown } from 'lucide-react';
import { HeroIllustration } from './HeroIllustration.tsx';

interface HeroProps {
  onBrowseClick: () => void;
  onListClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseClick, onListClick }) => {
  return (
    <section id="home" className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden">
      {/* Ambient soft glow overlays */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-7">
            {/* Tagline pill banner */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide shadow-lg shadow-blue-950/50">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Hyperlocal Peer-to-Peer Rental Network</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] [text-wrap:balance] drop-shadow-md">
                Share More.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                  Buy Less.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-200 leading-snug drop-shadow-sm">
                Rent what you need. Earn from what you don&apos;t use.
              </p>
            </div>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl [text-wrap:balance]">
              ShareGrid connects people who need everyday items with people who have unused items, making renting simple, affordable and sustainable.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBrowseClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-2xl transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-500/40 whitespace-nowrap cursor-pointer border border-blue-400/30 group"
              >
                <span>Browse Gear</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onListClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-slate-200 bg-slate-900/70 hover:bg-slate-800/80 active:bg-slate-900 border border-white/15 backdrop-blur-xl rounded-2xl transition-all shadow-lg hover:border-white/25 whitespace-nowrap cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-blue-400" />
                <span>List Your Item</span>
              </button>
            </div>

            {/* Quick Proof Metrics adjacent to claim */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-slate-900/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/5">
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">1,200+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Active Rentals</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/5">
                <div className="text-xl sm:text-2xl font-bold text-blue-400 tabular-nums">₹8.4L+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Earned by Neighbors</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/5">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">4.9/5</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Trust Score</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full -z-10" />
              <HeroIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
