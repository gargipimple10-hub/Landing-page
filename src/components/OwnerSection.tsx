import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, IndianRupee, ArrowRight, Sparkles, PlusCircle, ShieldCheck } from 'lucide-react';
import { Category, RentalItem } from '../types.ts';

interface OwnerSectionProps {
  onAddItem: (newItem: RentalItem) => void;
  onBrowseItems: () => void;
}

export const OwnerSection: React.FC<OwnerSectionProps> = ({ onAddItem, onBrowseItems }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Exclude<Category, 'All'>>('Tools');
  const [pricePerDay, setPricePerDay] = useState('350');
  const [location, setLocation] = useState('Indiranagar');
  const [condition, setCondition] = useState<'Like New' | 'Excellent' | 'Good'>('Excellent');
  const [description, setDescription] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('1000');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live Earning Calculator
  const numericPrice = parseFloat(pricePerDay) || 0;
  const daysPerMonth = 5;
  const estimatedMonthly = numericPrice * daysPerMonth;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: RentalItem = {
      id: `item-${Date.now()}`,
      name: name.trim(),
      category,
      pricePerDay: numericPrice,
      location: location.trim() || 'Neighborhood Hub',
      distanceKm: 0.8,
      rating: 5.0,
      reviewCount: 1,
      description: description.trim() || `${name} in ${condition.toLowerCase()} condition available for flexible daily rental.`,
      condition,
      securityDeposit: parseFloat(securityDeposit) || numericPrice * 2,
      owner: {
        name: 'You (Listing Owner)',
        avatarInitials: 'YO',
        memberSince: 'Today',
        verified: true,
        responseRate: 'Instant',
      },
      features: ['Verified listing', 'Flexible pickup hours', 'Deposit protected'],
      imageSvgType: category === 'Cameras' ? 'camera' : category === 'Tools' ? 'drill' : category === 'Sports' ? 'tent' : category === 'Accessories' ? 'tripod' : 'speaker',
    };

    onAddItem(newItem);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setDescription('');
      setShowForm(false);
      onBrowseItems();
    }, 1500);
  };

  return (
    <section id="list-item" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Proposition, and Flow */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Host & Earn Locally</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance] drop-shadow-md">
              Have Something You Don&apos;t Use?
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
              Turn your unused items into extra income by listing them on ShareGrid.
            </p>

            {/* Process Flow banner */}
            <div className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-white/15 shadow-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Simple Owner Workflow
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm font-bold text-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs shadow-md shadow-blue-600/30">1</span>
                  <span>List Your Item</span>
                </div>
                <ArrowRight className="hidden sm:block w-4 h-4 text-slate-500 shrink-0" />
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs shadow-md shadow-blue-600/30">2</span>
                  <span>Get Rental Requests</span>
                </div>
                <ArrowRight className="hidden sm:block w-4 h-4 text-slate-500 shrink-0" />
                <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold">
                  <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs shadow-md shadow-emerald-600/30">3</span>
                  <span>Earn Money</span>
                </div>
              </div>
            </div>

            {/* Live Earning Projection Box */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 shadow-xl">
                <div className="text-xs text-blue-300 font-medium">Average Monthly Return</div>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1 tabular-nums">
                  ₹{estimatedMonthly.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Based on just 5 rental days/month</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="text-xs text-emerald-400 font-medium">Host Protection</div>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1">100%</div>
                <div className="text-[11px] text-slate-400 mt-1">Deposit & ID verification on all gear</div>
              </div>
            </div>

            {/* Toggle Form / Trigger Button */}
            {!showForm && (
              <div className="pt-2">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all shadow-xl shadow-blue-600/30 cursor-pointer border border-blue-400/30"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List Your Item</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Listing Form */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/75 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-white">Quick Item Lister</h3>
                  <p className="text-xs text-slate-400">Test listing an item right into the live browse grid</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Instant Preview
                </span>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Item Successfully Listed!</h4>
                  <p className="text-xs text-slate-300">
                    Your {name || 'item'} has been added to the community grid. Scrolling up to view it...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Item Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sony Wireless Headphones, Pressure Washer"
                      className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                      >
                        <option value="Tools" className="bg-slate-900 text-white">Tools</option>
                        <option value="Electronics" className="bg-slate-900 text-white">Electronics</option>
                        <option value="Cameras" className="bg-slate-900 text-white">Cameras</option>
                        <option value="Accessories" className="bg-slate-900 text-white">Accessories</option>
                        <option value="Sports" className="bg-slate-900 text-white">Sports</option>
                        <option value="Home & Kitchen" className="bg-slate-900 text-white">Home & Kitchen</option>
                      </select>
                    </div>

                    {/* Condition */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Condition
                      </label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value as any)}
                        className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                      >
                        <option value="Like New" className="bg-slate-900 text-white">Like New</option>
                        <option value="Excellent" className="bg-slate-900 text-white">Excellent</option>
                        <option value="Good" className="bg-slate-900 text-white">Good</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Price Per Day */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Rent per Day (₹) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-slate-400 text-sm">₹</span>
                        <input
                          type="number"
                          required
                          min="50"
                          value={pricePerDay}
                          onChange={(e) => setPricePerDay(e.target.value)}
                          className="w-full pl-8 pr-3.5 py-3 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none tabular-nums"
                        />
                      </div>
                    </div>

                    {/* Security Deposit */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Refundable Deposit (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-slate-400 text-sm">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={securityDeposit}
                          onChange={(e) => setSecurityDeposit(e.target.value)}
                          className="w-full pl-8 pr-3.5 py-3 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none tabular-nums"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Neighborhood Location */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Neighborhood Pickup Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Koramangala 4th Block, Indiranagar"
                      className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none placeholder:text-slate-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Brief Description / Inclusions
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what's included (cables, box, manuals) and availability..."
                      className="w-full px-4 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none placeholder:text-slate-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer border border-blue-400/30"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Publish Item to ShareGrid</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
