import React from 'react';
import { Camera, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Background radial glow */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Illustration Canvas Frame */}
      <div className="relative rounded-3xl bg-slate-900/75 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden p-6 md:p-8">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#60a5fa 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Top Neighborhood Header */}
        <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Indiranagar Community Grid</div>
              <div className="text-[11px] text-slate-400">140+ active items available today</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Circle
          </div>
        </div>

        {/* Central Graphic: Peer-to-Peer Exchange Scene */}
        <div className="relative z-10 my-6">
          <svg viewBox="0 0 480 260" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="podiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Platform / Floor */}
            <ellipse cx="240" cy="220" rx="200" ry="32" fill="url(#podiumGrad)" stroke="#334155" strokeWidth="1" />
            <ellipse cx="240" cy="216" rx="160" ry="22" fill="#1e293b" fillOpacity="0.8" />

            {/* Sharing Flow Curved Dotted Arc */}
            <path d="M 120 130 C 180 50, 300 50, 360 130" stroke="url(#arcGrad)" strokeWidth="3" strokeDasharray="6 6" />

            {/* Exchange Symbol in Center */}
            <circle cx="240" cy="85" r="24" fill="#0f172a" stroke="#334155" strokeWidth="2" filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.5))" />
            <path d="M232 82L248 82M248 82L242 76M248 82L242 88" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M248 90L232 90M232 90L238 96M232 90L238 84" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Person A (Left - Item Owner) */}
            <g transform="translate(60, 60)">
              <circle cx="50" cy="40" r="18" fill="#fde68a" />
              <path d="M 36 28 C 36 18, 64 18, 64 28 C 64 34, 58 35, 50 35 C 42 35, 36 34, 36 28 Z" fill="#0f172a" />
              <path d="M 28 85 C 28 62, 72 62, 72 85 L 75 140 H 25 Z" fill="#2563eb" rx="10" />
              <path d="M 68 76 Q 95 85 110 100" stroke="#fde68a" strokeWidth="9" strokeLinecap="round" />
              <rect x="100" y="85" width="34" height="26" rx="5" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
              <circle cx="117" cy="98" r="6" fill="#38bdf8" />
              <rect x="15" y="148" width="70" height="22" rx="11" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="50" y="163" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f8fafc">Rohan (Lender)</text>
            </g>

            {/* Person B (Right - Item Borrower) */}
            <g transform="translate(280, 60)">
              <circle cx="90" cy="40" r="18" fill="#fed7aa" />
              <path d="M 72 32 C 70 16, 108 16, 108 32 C 108 40, 102 44, 90 44 C 78 44, 72 40, 72 32 Z" fill="#334155" />
              <path d="M 68 85 C 68 62, 112 62, 112 85 L 115 140 H 65 Z" fill="#0d9488" rx="10" />
              <path d="M 72 76 Q 45 85 30 100" stroke="#fed7aa" strokeWidth="9" strokeLinecap="round" />
              <rect x="55" y="148" width="70" height="22" rx="11" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="90" y="163" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f8fafc">Priya (Renter)</text>
            </g>
          </svg>
        </div>

        {/* Floating Community Stat Badges */}
        <div className="relative z-10 grid grid-cols-2 gap-3 pt-2">
          {/* Card 1 */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-blue-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 border border-blue-400/30">
              <Camera className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">DSLR Kit Rented</div>
              <div className="text-[11px] text-slate-400 truncate">₹1,000 saved vs buying</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-emerald-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-400/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">100% Verified Users</div>
              <div className="text-[11px] text-slate-400 truncate">Zero security deposit risks</div>
            </div>
          </div>
        </div>

        {/* Bottom micro-banner */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <HeartHandshake className="w-3.5 h-3.5 text-blue-400" />
            Neighbor-to-Neighbor Trust
          </span>
          <span className="text-slate-500">Bangalore · Delhi · Mumbai</span>
        </div>
      </div>
    </div>
  );
};
