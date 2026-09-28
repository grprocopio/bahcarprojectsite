import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    year: '',
    neighborhood: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Por favor, informe seu nome e telefone.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      vehicle: '',
      year: '',
      neighborhood: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#090909] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 transition-colors rounded-lg hover:bg-white/5"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <p className="text-xs font-mono font-medium tracking-[0.2em] text-[#B8FF00] uppercase mb-2">
                Motorista Parceiro · Santa Maria
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
                Dirija com a BahCar
              </h3>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                Cadastre seu interesse para ser um dos primeiros motoristas parceiros na nossa cidade. Relação transparente, taxa de 16% fixa e suporte local.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Nome completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex.: Lucas Moreira"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8FF00] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(55) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8FF00] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    Bairro / Região
                  </label>
                  <input
                    type="text"
                    placeholder="Ex.: Camobi, Centro..."
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8FF00] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    Modelo do Veículo
                  </label>
                  <input
                    type="text"
                    placeholder="Ex.: Onix, Argo, HB20"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8FF00] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    Ano de Fabricação
                  </label>
                  <input
                    type="text"
                    placeholder="Ex.: 2019"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8FF00] transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-[#B8FF00] shrink-0" />
                <span>Seus dados são protegidos e tratados sob estrita confidencialidade.</span>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#B8FF00] text-black font-semibold font-heading py-3.5 px-6 rounded-xl hover:bg-[#c9ff2e] transition-colors flex items-center justify-center gap-2"
              >
                <span>Enviar pré-cadastro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 text-[#B8FF00] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">
              Interesse Registrado!
            </h3>
            <p className="text-sm text-neutral-300 mt-2 max-w-sm mx-auto">
              Obrigado, <strong className="text-white">{formData.name}</strong>. Nossa equipe de operações em Santa Maria entrará em contato pelo WhatsApp nos próximos dias.
            </p>
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Concluir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
