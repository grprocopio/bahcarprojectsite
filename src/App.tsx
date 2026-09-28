import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Modalities } from './components/Modalities';
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
      {/* Dynamic Navigation Bar with Centered Sticky BahCar Logo */}
      <Navbar
        onOpenPartner={() => setPartnerModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* 
        Estrutura Oficial da Landing:
        1. Hero com vídeo
        2. Modalidades
        3. CTA final
        4. Footer
      */}
      <main>
        {/* 1. Hero com vídeo (scroll scrubbed GSAP ScrollTrigger) */}
        <Hero
          onOpenLaunch={() => setLaunchModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
          hlsStreamUrl={import.meta.env.VITE_HLS_STREAM_URL}
        />

        {/* 2. Modalidades (POP • BLACK • GUARD com transição sticky no scroll) */}
        <Modalities />

        {/* 4. CTA Final */}
        <FinalCta
          onOpenLaunch={() => setLaunchModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
        />
      </main>

      {/* 5. Footer */}
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
