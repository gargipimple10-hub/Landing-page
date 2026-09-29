import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Grid, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigateToListForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onNavigateToListForm }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/75 backdrop-blur-2xl shadow-2xl border-b border-white/10 py-3.5'
          : 'bg-slate-950/40 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group"
          >
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Grid className="w-4 h-4" />
            </span>
            <span className="text-white font-extrabold tracking-tight">ShareGrid</span>
          </a>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="#browse"
              onClick={(e) => scrollToSection(e, 'browse')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Browse Gear
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              How It Works
            </a>
            <a
              href="#list-item"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToListForm();
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              List Equipment
            </a>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all whitespace-nowrap cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer flex items-center gap-1.5 border border-blue-400/30"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg whitespace-nowrap"
            >
              Sign Up
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              Home
            </a>
            <a
              href="#browse"
              onClick={(e) => scrollToSection(e, 'browse')}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              Browse Gear
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#list-item"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigateToListForm();
              }}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              List Equipment
            </a>
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 text-center text-sm font-medium text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg shadow-blue-600/30"
            >
              Create Free Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
