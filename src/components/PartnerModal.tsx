import React, { useState, useEffect } from 'react';
import { X, Check, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fechar com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Máscara brasileira para telefone (XX) 9XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    let formatted = raw;
    if (raw.length <= 11) {
      if (raw.length > 2 && raw.length <= 7) {
        formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
      } else if (raw.length > 7) {
        formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
      }
    } else {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
    }
    setPhone(formatted);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome.');
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMessage('Por favor, digite um WhatsApp válido com DDD (ex: 55).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Salvar interesse localmente
    try {
      const existing = JSON.parse(localStorage.getItem('bahcar_driver_leads') || '[]');
      existing.push({
        name: name.trim(),
        phone: cleanPhone,
        vehicle: vehicle.trim(),
        role: 'driver',
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('bahcar_driver_leads', JSON.stringify(existing));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setVehicle('');
    setIsSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={handleResetAndClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-9 shadow-2xl text-left bg-[#0c0e14]/95 border border-white/12 shadow-[0_24px_70px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 transition-colors rounded-xl hover:bg-white/5 cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B8FF00] font-mono font-medium mb-1.5">
              Credenciamento Oficial · Santa Maria
            </div>

            <h3 
              className="text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tight leading-tight pr-6"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              Dirija com a BahCar
            </h3>
            
            <p className="text-sm text-neutral-300 mt-2.5 leading-relaxed">
              Taxa fixa de <strong>16%</strong> (o resto é todo seu) e suporte local humanizado. Cadastre-se abaixo para ter prioridade no lançamento:
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Ex: João da Silva"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#B8FF00] focus:ring-1 focus:ring-[#B8FF00] text-white text-sm placeholder:text-neutral-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  WhatsApp com DDD *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(55) 99999-9999"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#B8FF00] focus:ring-1 focus:ring-[#B8FF00] text-white text-sm placeholder:text-neutral-500 outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Veículo e Ano (Opcional)
                </label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="Ex: Onix 2021 ou Voyage 2019"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#B8FF00] focus:ring-1 focus:ring-[#B8FF00] text-white text-sm placeholder:text-neutral-500 outline-none transition-all"
                />
              </div>

              {errorMessage && (
                <div className="text-xs text-rose-400 font-medium py-1">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#B8FF00] hover:bg-[#caff33] text-black font-black italic uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_22px_rgba(184,255,0,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  {isSubmitting ? (
                    <span className="text-xs font-mono tracking-widest">Enviando dados...</span>
                  ) : (
                    <>
                      <span>Garantir Vaga Prioritária</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-neutral-400 justify-center pt-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8FF00]" />
                <span>Seus dados são protegidos e usados apenas para o credenciamento.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#B8FF00]/15 border border-[#B8FF00]/40 flex items-center justify-center text-[#B8FF00] mb-4 shadow-[0_0_30px_rgba(184,255,0,0.3)]">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="text-xs uppercase tracking-widest text-[#B8FF00] font-mono font-medium mb-1">
              Inscrição Confirmada
            </div>

            <h3 
              className="text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tight"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              Tudo pronto, {name.split(' ')[0]}!
            </h3>

            <p className="text-sm text-neutral-300 mt-3 leading-relaxed max-w-sm">
              Sua vaga prioritária para motorista parceiro foi registrada. Assim que liberarmos os cadastros em Santa Maria, avisaremos você diretamente no seu WhatsApp:
            </p>

            <div className="mt-4 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-sm text-[#B8FF00] font-bold">
              {phone}
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-6 w-full max-w-xs py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerModal;
