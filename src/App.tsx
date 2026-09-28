import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ComissaoMotorista } from './components/ComissaoMotorista';
import { Modalities } from './components/Modalities';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PartnerModal } from './components/PartnerModal';
import { LaunchModal } from './components/LaunchModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ContactModal } from './components/ContactModal';

import { NeonScrollPath } from './components/NeonScrollPath';
import { HeadlightSpotlight } from './components/HeadlightSpotlight';
import { SpeedParticles } from './components/SpeedParticles';

export default function App() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [launchModalOpen, setLaunchModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#B8FF00] selection:text-black relative overflow-x-hidden">
      {/* Facho de farol LED seguindo cursor no desktop & partículas sutis */}
      <HeadlightSpotlight />
      <SpeedParticles />

      {/* Dynamic Navigation Bar with Centered Sticky BahCar Logo */}
      <Navbar
        onOpenPartner={() => setPartnerModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <main>
        {/* 1. Hero com vídeo (scroll scrubbed GSAP ScrollTrigger) */}
        <Hero
          onOpenLaunch={() => setLaunchModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
          hlsStreamUrl={import.meta.env.VITE_HLS_STREAM_URL}
        />

        {/* Seções pós-vídeo com a linha neon de baixa exposição e o carro em trajeto no fundo */}
        <div className="relative w-full">
          <NeonScrollPath />

          <div className="relative z-10">
            {/* 2. Comissão Clara - Bloco horizontal 16:9 */}
            <ComissaoMotorista />

            {/* 3. Modalidades: POP, BLACK e GUARD */}
            <Modalities />

            {/* 4. CTA Final */}
            <FinalCta
              onOpenLaunch={() => setLaunchModalOpen(true)}
              onOpenPartner={() => setPartnerModalOpen(true)}
            />
          </div>
        </div>
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
