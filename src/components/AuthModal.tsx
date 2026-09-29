import React, { useState } from 'react';
import { X, Lock, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-white/15 text-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-blue-500/20 text-blue-400 border border-blue-400/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              You&apos;re on the Priority Access List!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We&apos;ve reserved your handle for <strong>{email}</strong>. When full user logins go live next month, you&apos;ll be the first in your neighborhood to receive your verified host badge.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-lg shadow-blue-600/30"
              >
                Back to ShareGrid
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {mode === 'login' ? 'Welcome Back to ShareGrid' : 'Join Your Neighborhood Grid'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Access your rental history, host earnings, and saved items.
              </p>
            </div>

            {/* Prototype notice banner */}
            <div className="mb-5 p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-start gap-2.5 text-xs text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Prototype Notice:</strong> Authentication coming soon. Enter your email below to reserve early access.
              </div>
            </div>

            {/* Tab switch */}
            <div className="flex p-1 bg-slate-950/80 rounded-xl mb-4 text-xs font-semibold border border-white/10">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Rao"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 outline-none placeholder:text-slate-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 outline-none placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950/70 border border-white/15 text-white rounded-xl focus:border-blue-400 outline-none placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer mt-2 border border-blue-400/30"
              >
                {mode === 'login' ? 'Continue to Account' : 'Create Free Account'}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Bank-grade 256-bit encryption. Zero spam policy.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
