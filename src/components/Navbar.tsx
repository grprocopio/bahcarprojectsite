import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const checkScroll = () => {
      const scrolled = window.scrollY > 25;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 sm:py-3 bg-[#030708]/85 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'py-4 sm:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* BahCar Logo Centralizada com Identidade Oficial */}
        <a
          href="#"
          onClick={scrollToTop}
          className="group relative flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="BahCar - Ir para o início"
        >
          <img
            src="/bahcar-logo-white.png?v=2"
            alt="BahCar Logo"
            className={`w-auto object-contain transition-all duration-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] ${
              isScrolled ? 'h-10 sm:h-12 md:h-13' : 'h-12 sm:h-16 md:h-18'
            }`}
          />
          <span
            className={`font-semibold uppercase tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.28em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-300 ${
              isScrolled ? 'text-[7.5px] sm:text-[8.5px] mt-0.5' : 'text-[8.5px] sm:text-[10px] md:text-[10.5px] mt-1'
            }`}
            style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif" }}
          >
            MOBILIDADE URBANA GAÚCHA
          </span>
        </a>
      </div>
    </header>
  );
};
