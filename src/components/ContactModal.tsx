import React from 'react';
import { X, Mail, MapPin, MessageSquare, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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
          <a
            href="mailto:contato@bahcar.com.br"
            className="flex items-center gap-3 p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">E-mail oficial</div>
              <div className="text-sm font-medium text-white group-hover:text-[#B8FF00] transition-colors">
                contato@bahcar.com.br
              </div>
            </div>
          </a>

          <a
            href="https://instagram.com/bahcar.sm"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">Instagram oficial</div>
              <div className="text-sm font-medium text-white group-hover:text-[#B8FF00] transition-colors">
                @bahcar.sm
              </div>
            </div>
          </a>

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
