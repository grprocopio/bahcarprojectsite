import React from 'react';
import { X, Mail, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md bg-[#0e0e0e] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 transition-colors rounded-lg hover:bg-white/5"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider text-[#B8FF00] font-semibold">
            Canal Direto
          </span>
          <h3 className="text-2xl font-bold font-heading text-white mt-1">
            Fale com a BahCar
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            Atendimento local humanizado em Santa Maria/RS.
          </p>
        </div>

        <div className="space-y-3">
          {/* WhatsApp Oficial */}
          <a
            href="https://wa.me/5555991082555"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B8FF00]/40 rounded-xl transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00] group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400">WhatsApp oficial</div>
              <div className="text-sm font-medium text-white group-hover:text-[#B8FF00] transition-colors">
                (55) 99108-2555
              </div>
            </div>
          </a>

          {/* Instagram Oficial */}
          <a
            href="https://www.instagram.com/bahcarsm/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B8FF00]/40 rounded-xl transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00] group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Instagram oficial</div>
              <div className="text-sm font-medium text-white group-hover:text-[#B8FF00] transition-colors">
                @bahcarsm
              </div>
            </div>
          </a>

          {/* E-mail */}
          <a
            href="mailto:contato@bahcar.com.br"
            className="flex items-center gap-3 p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00] group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">E-mail oficial</div>
              <div className="text-sm font-medium text-white group-hover:text-[#B8FF00] transition-colors">
                contato@bahcar.com.br
              </div>
            </div>
          </a>

          {/* Localização */}
          <div className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">Origem & Operação</div>
              <div className="text-sm font-medium text-white">
                Santa Maria — Rio Grande do Sul
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
