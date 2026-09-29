import React from 'react';
import { RentalItem } from '../types.ts';

interface ItemIllustrationProps {
  type: RentalItem['imageSvgType'];
  name: string;
  className?: string;
}

export const ItemIllustration: React.FC<ItemIllustrationProps> = ({ type, name, className = 'w-full h-48' }) => {
  switch (type) {
    case 'camera':
      return (
        <div className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center overflow-hidden ${className}`}>
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <svg viewBox="0 0 240 180" className="w-40 h-32 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Camera Body */}
            <rect x="40" y="55" width="160" height="95" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            <path d="M75 55L85 38H140L150 55H75Z" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />
            {/* Pentaprism top bump */}
            <rect x="155" y="44" width="22" height="7" rx="3" fill="#ef4444" />
            {/* Grip texture */}
            <rect x="43" y="65" width="24" height="75" rx="6" fill="#0f172a" opacity="0.8" />
            <line x1="48" y1="75" x2="62" y2="75" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="85" x2="62" y2="85" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="95" x2="62" y2="95" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="105" x2="62" y2="105" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            {/* Lens outer */}
            <circle cx="120" cy="102" r="42" fill="#0f172a" stroke="#475569" strokeWidth="4" />
            <circle cx="120" cy="102" r="34" fill="#1e293b" stroke="#2563eb" strokeWidth="2.5" />
            <circle cx="120" cy="102" r="26" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="120" cy="102" r="16" fill="#090d16" />
            {/* Glass glint */}
            <path d="M106 88 A 20 20 0 0 1 134 88" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            {/* Red badge */}
            <circle cx="178" cy="74" r="5" fill="#ef4444" />
            {/* Flash / Sensor */}
            <rect x="92" y="43" width="30" height="9" rx="2" fill="#38bdf8" fillOpacity="0.4" stroke="#60a5fa" strokeWidth="1" />
          </svg>
          <span className="sr-only">{name}</span>
        </div>
      );

    case 'drill':
      return (
        <div className={`relative bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
          <svg viewBox="0 0 240 180" className="w-40 h-32 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Drill Chuck & Bit */}
            <rect x="25" y="70" width="32" height="6" rx="1" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M25 73L15 73" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="52" y="63" width="22" height="20" rx="3" fill="#334155" stroke="#475569" strokeWidth="2" />
            {/* Motor Casing */}
            <rect x="74" y="52" width="105" height="42" rx="8" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <path d="M120 52V94" stroke="#0369a1" strokeWidth="2" />
            {/* Vents */}
            <rect x="135" y="58" width="3" height="12" rx="1.5" fill="#0f172a" />
            <rect x="142" y="58" width="3" height="12" rx="1.5" fill="#0f172a" />
            <rect x="149" y="58" width="3" height="12" rx="1.5" fill="#0f172a" />
            <rect x="156" y="58" width="3" height="12" rx="1.5" fill="#0f172a" />
            {/* Grip handle */}
            <path d="M140 92L148 142C149 146 146 150 141 150H112C107 150 103 146 104 141L114 92H140Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            {/* Trigger */}
            <path d="M110 105C102 105 100 112 105 116H112V105H110Z" fill="#ef4444" />
            {/* Battery pack */}
            <rect x="98" y="145" width="58" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <rect x="110" y="152" width="34" height="4" rx="2" fill="#22c55e" />
          </svg>
          <span className="sr-only">{name}</span>
        </div>
      );

    case 'projector':
      return (
        <div className={`relative bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-900 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
          <svg viewBox="0 0 240 180" className="w-44 h-32 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Light beam projection */}
            <polygon points="68,90 10,40 10,140" fill="url(#beamGrad)" opacity="0.4" />
            <defs>
              <linearGradient id="beamGrad" x1="68" y1="90" x2="10" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Projector Body */}
            <rect x="68" y="65" width="135" height="58" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2.5" />
            {/* Large optical lens */}
            <circle cx="88" cy="94" r="20" fill="#0f172a" stroke="#475569" strokeWidth="3" />
            <circle cx="88" cy="94" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="88" cy="94" r="8" fill="#38bdf8" opacity="0.8" />
            <circle cx="85" cy="90" r="3" fill="#ffffff" opacity="0.9" />
            {/* Top controls buttons */}
            <circle cx="160" cy="74" r="3" fill="#64748b" />
            <circle cx="172" cy="74" r="3" fill="#64748b" />
            <circle cx="184" cy="74" r="3" fill="#3b82f6" />
            {/* Front grille */}
            <line x1="120" y1="85" x2="185" y2="85" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <line x1="120" y1="93" x2="185" y2="93" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <line x1="120" y1="101" x2="185" y2="101" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            {/* Feet */}
            <rect x="80" y="123" width="14" height="6" rx="2" fill="#0f172a" />
            <rect x="175" y="123" width="14" height="6" rx="2" fill="#0f172a" />
          </svg>
          <span className="sr-only">{name}</span>
        </div>
      );

    case 'speaker':
      return (
        <div className={`relative bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-900 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
          <svg viewBox="0 0 240 180" className="w-40 h-32 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cylindrical speaker body */}
            <rect x="55" y="65" width="130" height="52" rx="26" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Mesh grill texture */}
            <path d="M80 67V115M90 67V115M100 67V115M110 67V115M120 67V115M130 67V115M140 67V115M150 67V115M160 67V115" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="2 3" />
            {/* End caps */}
            <ellipse cx="60" cy="91" rx="8" ry="24" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <ellipse cx="180" cy="91" rx="8" ry="24" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            {/* Logo Badge */}
            <rect x="105" y="82" width="30" height="18" rx="4" fill="#ef4444" />
            <text x="120" y="95" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">SHARE</text>
            {/* Play/Vol controls */}
            <polygon points="102,60 102,52 108,56" fill="#94a3b8" />
            <line x1="118" y1="52" x2="118" y2="60" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="114" y1="56" x2="122" y2="56" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="132" y1="56" x2="140" y2="56" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            {/* Sound waves subtle */}
            <path d="M194 80C198 86 198 96 194 102" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M202 75C208 84 208 98 202 107" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          </svg>
          <span className="sr-only">{name}</span>
        </div>
      );

    case 'tent':
      return (
        <div className={`relative bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          <svg viewBox="0 0 240 180" className="w-40 h-32 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ground line */}
            <line x1="30" y1="145" x2="210" y2="145" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            {/* Guy ropes */}
            <line x1="50" y1="144" x2="120" y2="55" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="190" y1="144" x2="120" y2="55" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            {/* Main Tent Outer Shell */}
            <path d="M45 144L120 52L195 144H45Z" fill="#047857" stroke="#065f46" strokeWidth="2.5" />
            {/* Dome curvature shade */}
            <path d="M70 144L120 52L170 144H70Z" fill="#059669" />
            {/* Door opening */}
            <path d="M96 144L120 85L144 144H96Z" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            {/* Inner glow / lamp */}
            <circle cx="120" cy="118" r="8" fill="#fef08a" opacity="0.75" />
            {/* Top vent cap */}
            <path d="M108 52C108 48 132 48 132 52L120 46L108 52Z" fill="#f59e0b" />
            {/* Peg pins */}
            <line x1="43" y1="142" x2="38" y2="148" stroke="#94a3b8" strokeWidth="2" />
            <line x1="197" y1="142" x2="202" y2="148" stroke="#94a3b8" strokeWidth="2" />
          </svg>
          <span className="sr-only">{name}</span>
        </div>
      );

    case 'tripod':
      return (
        <div className={`relative bg-gradient-to-br from-violet-950/20 via-slate-900 to-slate-900 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px]" />
          <svg viewBox="0 0 240 180" className="w-40 h-32 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mount plate & phone bracket */}
            <rect x="105" y="32" width="30" height="18" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <rect x="110" y="36" width="20" height="10" rx="1.5" fill="#3b82f6" opacity="0.7" />
            {/* Pan head */}
            <rect x="112" y="50" width="16" height="14" rx="2" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            {/* Tightening arm handle */}
            <line x1="128" y1="57" x2="160" y2="52" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="160" cy="52" r="4" fill="#3b82f6" />
            {/* Center column */}
            <rect x="117" y="64" width="6" height="24" fill="#cbd5e1" />
            {/* Leg collar apex */}
            <rect x="110" y="86" width="20" height="8" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            {/* 3 Legs */}
            <line x1="114" y1="94" x2="68" y2="162" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <line x1="120" y1="94" x2="120" y2="164" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            <line x1="126" y1="94" x2="172" y2="162" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            {/* Leg flip-locks */}
            <rect x="88" y="124" width="6" height="4" fill="#3b82f6" rx="1" />
            <rect x="117" y="126" width="6" height="4" fill="#3b82f6" rx="1" />
            <rect x="146" y="124" width="6" height="4" fill="#3b82f6" rx="1" />
            {/* Rubber feet */}
            <circle cx="68" cy="162" r="3" fill="#0f172a" />
            <circle cx="120" cy="164" r="3" fill="#0f172a" />
            <circle cx="172" cy="162" r="3" fill="#0f172a" />
          </svg>
          <span className="sr-only">{name}</span>
        </div>
      );

    default:
      return (
        <div className={`relative bg-gradient-to-br from-blue-950/30 via-slate-900 to-slate-900 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 font-bold text-2xl">
            SG
          </div>
        </div>
      );
  }
};
