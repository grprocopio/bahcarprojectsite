import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBahcar } from './components/AboutBahcar';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PartnerModal } from './components/PartnerModal';
import { LaunchModal } from './components/LaunchModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [launchModalOpen, setLaunchModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#B8FF00] selection:text-black">
      {/* Dynamic Navigation Bar */}
      <Navbar
        onOpenPartner={() => setPartnerModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section (100vh with GSAP ScrollTrigger Video Scrubbing) */}
        <Hero
          onOpenLaunch={() => setLaunchModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
          hlsStreamUrl={import.meta.env.VITE_HLS_STREAM_URL}
        />

        {/* 2. O que é a BahCar */}
        <AboutBahcar />

        {/* 3. CTA Final */}
        <FinalCta
          onOpenLaunch={() => setLaunchModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Interactive Modals */}
      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      <LaunchModal
        isOpen={launchModalOpen}
        onClose={() => setLaunchModalOpen(false)}
      />

      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
