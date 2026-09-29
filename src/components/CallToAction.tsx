import React from 'react';
import { ArrowRight, PlusCircle, Sparkles } from 'lucide-react';

interface CallToActionProps {
  onStartRenting: () => void;
  onListItem: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onStartRenting, onListItem }) => {
  return (
    <section className="py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-blue-500/30 px-6 py-16 sm:px-12 sm:py-20 text-center overflow-hidden shadow-2xl shadow-blue-950/60">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Join Your Local Neighborhood Grid</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              Ready to Share?
            </h2>

            <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed [text-wrap:balance]">
              Join ShareGrid and make everyday resources more accessible.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartRenting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-2xl transition-all shadow-xl shadow-blue-600/30 cursor-pointer whitespace-nowrap border border-blue-400/40"
              >
                <span>Start Renting</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onListItem}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-200 bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 backdrop-blur-xl rounded-2xl transition-all cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4 text-blue-400" />
                <span>List an Item</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
