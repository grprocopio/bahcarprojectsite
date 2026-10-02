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

import { HeadlightSpotlight } from './components/HeadlightSpotlight';
import { SpeedParticles } from './components/SpeedParticles';
import { GlobalVideoBackground } from './components/GlobalVideoBackground';

export default function App() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [launchModalOpen, setLaunchModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  // Monitor vertical scroll position and update CSS variable --hero-blur-intensity smoothly
  React.useEffect(() => {
    let ticking = false;

    const updateBlurIntensity = () => {
      const scrollY = window.scrollY;
      // Garante que o vídeo role até a placa da BahCar ficar 100% visível com nitidez total
      const heroPinDistance = Math.max(1800, window.innerHeight * 2.2);
      // O blur só começa a aparecer quando o usuário passa da exibição da placa da BahCar
      const heroThreshold = heroPinDistance * 0.90; // 90% do vídeo percorrido (placa da BahCar em evidência máxima)
      const maxDistance = heroPinDistance + Math.max(400, window.innerHeight * 0.5);

      // Normaliza o fator de intensidade: 0 durante toda a exibição do carro e da placa, transitando para 1 na próxima seção
      const rawIntensity = (scrollY - heroThreshold) / (maxDistance - heroThreshold);
      const intensity = Math.max(0, Math.min(1, rawIntensity));

      document.documentElement.style.setProperty('--hero-blur-intensity', intensity.toFixed(3));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateBlurIntensity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateBlurIntensity(); // inicializa no carregamento

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#B8FF00] selection:text-black relative overflow-x-hidden">
      {/* 
        Vídeo em Tela Cheia Cobrindo 100% do Site:
        - Na Hero: vídeo nítido acompanhando a animação de scroll
        - Após passar da Hero: transição suave para efeito embaçado (blur) e pouca exposição (low exposure)
        para leitura cinematográfica perfeita de todas as seções
      */}
      <GlobalVideoBackground hlsStreamUrl={import.meta.env.VITE_HLS_STREAM_URL} />

      {/* Glassmorphic Navigation Bar with Centered BahCar® Typography */}
      <Navbar />

      <main className="relative z-10">
        {/* 1. Hero com título original limpo sobre o vídeo fullscreen */}
        <Hero />

        {/* 2. Comissão Clara - Bloco horizontal 16:9 sobre o vídeo com baixa exposição */}
        <ComissaoMotorista />

        {/* 3. Modalidades: POP, BLACK e GUARD */}
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
