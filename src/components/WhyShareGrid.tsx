import React from 'react';
import { Wallet, Coins, ShieldCheck, Leaf } from 'lucide-react';

export const WhyShareGrid: React.FC = () => {
  const cards = [
    {
      title: 'Affordable Access',
      description: 'Rent instead of buying expensive items for short-term use.',
      metric: 'Save up to 85%',
      subtext: 'compared to buying brand new equipment',
      icon: Wallet,
      accent: 'text-blue-400 bg-blue-500/20 border-blue-400/30',
    },
    {
      title: 'Earn From Unused Items',
      description: 'Generate extra income from things you already own.',
      metric: '₹2,500 – ₹8,000',
      subtext: 'average monthly earnings for active item owners',
      icon: Coins,
      accent: 'text-amber-400 bg-amber-500/20 border-amber-400/30',
    },
    {
      title: 'Secure & Verified',
      description: 'Build trust through verified users, ratings and reviews.',
      metric: '100% ID Checked',
      subtext: 'with full deposit protection on every rental transaction',
      icon: ShieldCheck,
      accent: 'text-emerald-400 bg-emerald-500/20 border-emerald-400/30',
    },
    {
      title: 'Sustainable Sharing',
      description: 'Share existing resources and reduce unnecessary consumption.',
      metric: '420 kg CO₂ Offset',
      subtext: 'by curbing duplicate manufacturing and e-waste',
      icon: Leaf,
      accent: 'text-teal-400 bg-teal-500/20 border-teal-400/30',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase bg-blue-500/15 px-3.5 py-1.5 rounded-full border border-blue-400/30">
            Built for Community
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            Why ShareGrid
          </h2>
          <p className="mt-3 text-base text-slate-300">
            A smarter, eco-friendly way to access tools, cameras, and gear while building real neighborly connections.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-slate-900/65 backdrop-blur-2xl rounded-3xl p-7 border border-white/15 shadow-2xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon badge */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.accent} mb-6 shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Quantitative proof metric adjacent to claim */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-base font-bold text-white tabular-nums">
                    {card.metric}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {card.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
