import React, { useState } from 'react';
import { INITIAL_ITEMS } from './data/mockItems.ts';
import { RentalItem } from './types.ts';
import { BackgroundScrollCanvas } from './components/BackgroundScrollCanvas.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { BrowseSection } from './components/BrowseSection.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { OwnerSection } from './components/OwnerSection.tsx';
import { WhyShareGrid } from './components/WhyShareGrid.tsx';
import { CallToAction } from './components/CallToAction.tsx';
import { Footer } from './components/Footer.tsx';
import { ItemDetailModal } from './components/ItemDetailModal.tsx';
import { RentModal } from './components/RentModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { ToastNotification } from './components/ToastNotification.tsx';

export default function App() {
  const [items, setItems] = useState<RentalItem[]>(INITIAL_ITEMS);
  const [selectedDetailItem, setSelectedDetailItem] = useState<RentalItem | null>(null);
  const [selectedRentItem, setSelectedRentItem] = useState<RentalItem | null>(null);
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: pos,
        behavior: 'smooth',
      });
    }
  };

  const handleAddItem = (newItem: RentalItem) => {
    setItems((prev) => [newItem, ...prev]);
    showToast(`"${newItem.name}" added to the community grid!`);
  };

  const handleRentalConfirmed = (bookingRef: string) => {
    showToast(`Rental request confirmed! Ref: ${bookingRef}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100 selection:bg-blue-500/30 selection:text-blue-200 relative">
      {/* 0. IMMERSIVE SCROLL-DRIVEN BACKGROUND VIDEO CANVAS */}
      <BackgroundScrollCanvas />

      {/* 1. GLASSMORPHIC NAVBAR */}
      <Navbar
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onNavigateToListForm={() => handleScrollTo('list-item')}
      />

      <main className="flex-1 relative z-10">
        {/* 2. HERO SECTION */}
        <Hero
          onBrowseClick={() => handleScrollTo('browse')}
          onListClick={() => handleScrollTo('list-item')}
        />

        {/* 3. SEARCH / BROWSE SECTION */}
        <BrowseSection
          items={items}
          onViewDetails={(item) => setSelectedDetailItem(item)}
          onRentNow={(item) => setSelectedRentItem(item)}
          onOpenListForm={() => handleScrollTo('list-item')}
        />

        {/* 4. HOW SHAREGRID WORKS */}
        <HowItWorks onStartBrowsing={() => handleScrollTo('browse')} />

        {/* 5. FOR ITEM OWNERS */}
        <OwnerSection
          onAddItem={handleAddItem}
          onBrowseItems={() => handleScrollTo('browse')}
        />

        {/* 6. WHY SHAREGRID */}
        <WhyShareGrid />

        {/* 7. CALL TO ACTION */}
        <CallToAction
          onStartRenting={() => handleScrollTo('browse')}
          onListItem={() => handleScrollTo('list-item')}
        />
      </main>

      {/* 8. FOOTER */}
      <Footer onNavigate={(id) => handleScrollTo(id)} />

      {/* MODALS */}
      {/* View Details Modal */}
      <ItemDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onRentNow={(item) => {
          setSelectedDetailItem(null);
          setSelectedRentItem(item);
        }}
      />

      {/* Rent Now Confirmation Modal */}
      <RentModal
        item={selectedRentItem}
        onClose={() => setSelectedRentItem(null)}
        onConfirmed={handleRentalConfirmed}
      />

      {/* Login / Sign Up Prototype Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'signup' })}
      />

      {/* Instant Action Toast Notification */}
      <ToastNotification
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}
