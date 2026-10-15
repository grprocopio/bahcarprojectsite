import React from 'react';
import { X, Check, Percent, Smartphone } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl text-left bg-[#0c0d12]/95 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 transition-colors rounded-xl hover:bg-white/5 cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Badge de Status */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8FF00]/10 border border-[#B8FF00]/30 text-[#B8FF00] text-[11px] font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
            <span>Motorista Parceiro · Santa Maria</span>
          </div>

          <h3 
            className="text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            Aplicativo será lançado em breve
          </h3>
          
          <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
            O aplicativo da <strong className="text-white font-semibold">BahCar</strong> para motoristas parceiros está em fase final de preparação em Santa Maria. Em breve o credenciamento e o download estarão liberados oficialmente.
          </p>

          {/* Destaques visuais informativos */}
          <div className="mt-6 space-y-2.5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-neutral-300">
              <div className="w-7 h-7 rounded-lg bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00] shrink-0 font-bold">
                <Percent className="w-4 h-4" />
              </div>
              <span>Taxa fixa garantida de <strong>apenas 16%</strong> (o resto é seu)</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-neutral-300">
              <div className="w-7 h-7 rounded-lg bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00] shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <span>Disponível em breve para <strong>Android</strong> e <strong>iOS</strong></span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full bg-[#B8FF00] text-black font-black italic uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-[#c9ff2e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(184,255,0,0.3)] hover:scale-[1.01] active:scale-[0.99]"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <Check className="w-4 h-4" />
              <span>Entendido</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerModal;
