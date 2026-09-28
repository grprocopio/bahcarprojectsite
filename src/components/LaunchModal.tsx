import React, { useState } from 'react';
import { X, CheckCircle2, Bell } from 'lucide-react';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({ isOpen, onClose }) => {
  const [contact, setContact] = useState('');
  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setRegistered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md bg-[#090909] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 transition-colors rounded-lg hover:bg-white/5"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!registered ? (
          <div>
            <p className="text-xs font-mono font-medium tracking-[0.2em] text-[#B8FF00] uppercase mb-2">
              Lançamento Oficial
            </p>
            
            <h3 className="text-2xl font-bold font-heading text-white tracking-tight">
              Conheça a BahCar em primeira mão
            </h3>
            
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              O aplicativo está em fase final de lançamento em Santa Maria/RS. Deixe seu WhatsApp ou e-mail para receber acesso prioritário.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Seu WhatsApp ou E-mail
                </label>
                <input
                  type="text"
                  required
                  placeholder="exemplo@email.com ou (55) 99999-9999"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8FF00] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#B8FF00] text-black font-semibold font-heading py-3 px-6 rounded-xl hover:bg-[#c9ff2e] transition-colors flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                <span>Avise-me no lançamento</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 text-[#B8FF00] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">
              Você está na lista!
            </h3>
            <p className="text-sm text-neutral-300 mt-2">
              Assim que liberarmos os primeiros testes e viagens em Santa Maria, você será avisado diretamente.
            </p>
            <button
              onClick={() => { setRegistered(false); setContact(''); onClose(); }}
              className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
