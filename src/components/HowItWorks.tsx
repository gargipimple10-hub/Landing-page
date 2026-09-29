import React from 'react';
import { Search, ShieldCheck, Star, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartBrowsing: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartBrowsing }) => {
  const steps = [
    {
      number: '01',
      title: 'Find an Item',
      description: 'Search for something you need nearby.',
      detail: 'Browse cameras, tools, projectors, camping gear and more from verified neighbors within walking or short driving distance.',
      icon: Search,
      badgeColor: 'text-blue-400 bg-blue-500/20 border-blue-400/30',
    },
    {
      number: '02',
      title: 'Rent Safely',
      description: 'Choose an item and send a rental request.',
      detail: 'Select your preferred dates, review the refundable security deposit, and coordinate a hassle-free doorstep or neighborhood meetup.',
      icon: ShieldCheck,
      badgeColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-400/30',
    },
    {
      number: '03',
      title: 'Return & Review',
      description: 'Return the item after use and leave a review.',
      detail: 'Hand back the gear in great condition, get your deposit automatically released, and rate the owner to strengthen community trust.',
      icon: Star,
      badgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-400/30',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-400/20">
            Simple 3-Step Process
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            How ShareGrid Works
          </h2>
          <p className="mt-3 text-base text-slate-300">
            A safe, transparent and straightforward way to borrow and share items without ownership headaches.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-900/65 backdrop-blur-2xl rounded-3xl p-8 border border-white/15 shadow-2xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-extrabold text-white/20 font-mono tracking-tighter">
                      {step.number}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${step.badgeColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Core Subheading */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm font-semibold text-blue-400 mb-3">
                    {step.description}
                  </p>

                  {/* Detailed Description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                {/* Step Connector Indicator */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center text-xs font-semibold text-slate-400">
                  <span>Step {index + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartBrowsing}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
          >
            <span>Ready to explore? Browse available rentals now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
