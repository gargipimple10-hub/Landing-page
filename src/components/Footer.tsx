import React, { useState } from 'react';
import { Grid, Twitter, Instagram, Linkedin, Github, Heart, X } from 'lucide-react';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const getModalContent = (key: string) => {
    switch (key) {
      case 'about':
        return {
          title: 'About ShareGrid',
          body: 'ShareGrid is a peer-to-peer resource sharing platform founded on a simple insight: most specialized tools, cameras, and gear sit idle 95% of their lifespan. By connecting neighbors to rent directly from one another, we lower costs, reduce manufacturing waste, and strengthen local community ties.',
        };
      case 'contact':
        return {
          title: 'Contact the ShareGrid Team',
          body: 'Have questions, partnership inquiries, or neighborhood hub suggestions? Reach out to us at hello@sharegrid.local or call our community support desk at +91 (80) 4123-9876. We typically respond within 2 hours.',
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          body: 'ShareGrid respects your privacy. All borrower and host verification documents are strictly encrypted. Your exact street address is never published publicly—only your general neighborhood radius is shown until a rental request is formally confirmed by both parties.',
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          body: 'All rentals are governed by the ShareGrid Neighbor Agreement. Renters agree to return gear in the same working condition received. Security deposits are held in escrow and released immediately upon successful return confirmation.',
        };
      default:
        return null;
    }
  };

  const modalData = activeModal ? getModalContent(activeModal) : null;

  return (
    <footer className="bg-slate-950/80 backdrop-blur-2xl text-slate-400 py-16 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Grid className="w-4 h-4" />
              </span>
              <span className="text-2xl font-bold tracking-tight text-white">ShareGrid</span>
            </div>
            <p className="text-sm font-semibold text-slate-300">
              Share More. Buy Less.
            </p>
            <p className="text-xs text-slate-400 max-w-sm">
              The neighborhood peer-to-peer rental network for tools, electronics, camping, and creative gear.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveModal('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => setActiveModal('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ShareGrid Twitter"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ShareGrid Instagram"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ShareGrid LinkedIn"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ShareGrid GitHub"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} ShareGrid Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed for sustainable communities with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>

      {/* Legal & Info Modal */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-md w-full p-7 text-white shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-3">{modalData.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{modalData.body}</p>
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
