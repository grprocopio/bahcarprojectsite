import React from 'react';
import { BahCarLogo } from './BahCarLogo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenContact }) => {
  return (
    <footer className="relative w-full py-16 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Brand & City */}
          <div>
            <BahCarLogo size="md" />
            <div className="text-xs uppercase tracking-widest text-neutral-400 mt-2 font-mono">
              Santa Maria — RS
            </div>
          </div>

          {/* Minimalist Nav Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm text-neutral-400">
            <a
              href="https://instagram.com/bahcar.sm"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#B8FF00] transition-colors"
            >
              Instagram
            </a>
            <button
              onClick={onOpenContact}
              className="hover:text-[#B8FF00] transition-colors"
            >
              Contato
            </button>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#B8FF00] transition-colors"
            >
              Privacidade
            </button>
          </div>
        </div>

        {/* Closing Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <p className="font-heading tracking-wide text-neutral-400">
            Mobilidade urbana gaúcha.
          </p>
          <p>
            © {new Date().getFullYear()} BahCar Tecnologia Ltda. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
