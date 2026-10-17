import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenPartner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#050608]/92 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* BahCar Logo Centralizada */}
        <a
          href="#"
          onClick={scrollToTop}
          className="group relative flex flex-col items-center text-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="BahCar - Início"
        >
          <img
            src="/bahcar-logo-white.png?v=2"
            alt="BahCar Logo"
            className={`w-auto object-contain transition-all duration-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] ${
              isScrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-13'
            }`}
          />
          <span
            className={`font-semibold uppercase tracking-[0.2em] sm:tracking-[0.28em] text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300 ${
              isScrolled ? 'text-[7px] sm:text-[8px] mt-0.5' : 'text-[8px] sm:text-[9px] mt-1'
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            MOBILIDADE URBANA GAÚCHA
          </span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
