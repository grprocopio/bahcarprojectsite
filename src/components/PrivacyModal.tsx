import React from 'react';
import { X, Shield, Lock } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#0e0e0e] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 transition-colors rounded-lg hover:bg-white/5"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/20 flex items-center justify-center text-[#B8FF00]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-white">
              Privacidade & Segurança
            </h3>
            <span className="text-xs text-neutral-400">BahCar · Santa Maria / RS</span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <h4 className="font-semibold text-white flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-[#B8FF00]" />
              Proteção de Dados Pessoais (LGPD)
            </h4>
            <p className="text-neutral-400">
              A <strong>BAHCAR MOBILIDADE URBANA LTDA</strong> trata os dados de passageiros e motoristas parceiros em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), garantindo criptografia, finalidade legítima e armazenamento seguro em Santa Maria/RS.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
