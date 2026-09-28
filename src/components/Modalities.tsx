import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Users, Zap, Check } from 'lucide-react';

interface ModalityOption {
  id: 'pop' | 'black' | 'guard';
  name: string;
  tagline: string;
  description: string;
  imageSrc: string;
  alt: string;
  specs: { label: string; value: string }[];
}

const MODALITIES_DATA: ModalityOption[] = [
  {
    id: 'pop',
    name: 'POP',
    tagline: 'Deslocamento padrão com praticidade',
    description: 'A modalidade ideal para a rotina diária em Santa Maria. Corridas rápidas, tarifa acessível e motoristas prontos em qualquer bairro.',
    imageSrc: '/images/pop1.png',
    alt: 'BahCar Modalidade POP - Deslocamento padrão e praticidade no dia a dia',
    specs: [
      { label: 'Capacidade', value: 'Até 4 passageiros' },
      { label: 'Proposta', value: 'Melhor custo-benefício' },
      { label: 'Disponibilidade', value: 'Ampla em toda a cidade' },
    ],
  },
  {
    id: 'black',
    name: 'BLACK',
    tagline: 'Experiência premium e conforto executivo',
    description: 'Veículos selecionados, sedãs e SUVs de categoria superior, ar-condicionado obrigatório e os motoristas parceiros mais bem avaliados.',
    imageSrc: '/images/black2.png',
    alt: 'BahCar Modalidade BLACK - Experiência premium em veículos e atendimento',
    specs: [
      { label: 'Veículos', value: 'Sedãs e SUVs selecionados' },
      { label: 'Conforto', value: 'Ar-condicionado e acabamento' },
      { label: 'Atendimento', value: 'Motoristas Top-Rated' },
    ],
  },
  {
    id: 'guard',
    name: 'GUARD',
    tagline: 'Acompanhamento em tempo real e segurança',
    description: 'Segurança elevada com videomonitoramento da corrida, checagem contínua de rota e canal direto com a central de suporte para total tranquilidade.',
    imageSrc: '/images/guard3.png',
    alt: 'BahCar Modalidade GUARD - Acompanhamento em tempo real e tranquilidade',
    specs: [
      { label: 'Monitoramento', value: 'Trajeto acompanhado' },
      { label: 'Segurança', value: 'Videomonitoramento opcional' },
      { label: 'Suporte', value: 'Canal prioritário dedicado' },
    ],
  },
];

export const Modalities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pop' | 'black' | 'guard'>('pop');
  const currentModality = MODALITIES_DATA.find((m) => m.id === activeTab) || MODALITIES_DATA[0];

  return (
    <section
      id="modalidades"
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between py-10 lg:py-14 px-6 sm:px-10 lg:px-16 xl:px-24 bg-[#050505] text-white border-t border-white/5 overflow-hidden select-none"
    >
      {/* Background Cinematográfico Noturno Full-Bleed (sem caixas) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glows de luz neon verde-limão sutis */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[#B8FF00]/[0.03] rounded-full blur-[180px]" />
        <div className="absolute -bottom-20 left-10 w-[500px] h-[400px] bg-white/[0.015] rounded-full blur-[160px]" />
      </div>

      {/* 1. TOPO: Cabeçalho Editorial com Seletor Fluido (sem caixas) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-2 lg:pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#B8FF00] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] shadow-[0_0_10px_#B8FF00]" />
              <span>Categorias do Aplicativo</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white uppercase leading-none">
              MODALIDADES <span className="text-[#B8FF00]">BAHCAR</span>
            </h2>
          </div>

          {/* Seletor Segmentado Fluido POP • BLACK • GUARD */}
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] self-start md:self-auto">
            {MODALITIES_DATA.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-heading font-black tracking-wider uppercase transition-all duration-300 active:scale-95 ${
                    isActive
                      ? 'bg-[#B8FF00] text-black shadow-[0_0_25px_rgba(184,255,0,0.45)]'
                      : 'text-neutral-400 hover:text-white bg-transparent'
                  }`}
                  aria-label={`Selecionar modalidade ${item.name}`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. CENTRO: O Palco da Modalidade em Tela Cheia (Preenchendo o Site Todo, Sem Caixas) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
        
        {/* Banner Gráfico da Modalidade Integrado Diretamente ao Fundo Preto */}
        <div className="relative w-full aspect-[1490/656] max-h-[500px] flex items-center justify-center overflow-hidden">
          {MODALITIES_DATA.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out will-change-[opacity,transform] ${
                  isActive
                    ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                    : 'opacity-0 scale-[0.985] z-0 pointer-events-none'
                }`}
              >
                <img
                  src={item.imageSrc}
                  alt={item.alt}
                  className="w-full h-full object-contain select-none contrast-[1.05] brightness-[1.02]"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                  loading="eager"
                />
              </div>
            );
          })}

          {/* Gradientes laterais e verticais suaves para fusão com o fundo 100vh */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
        </div>

      </div>

      {/* 3. BASE: Especificações e Detalhes da Categoria Ativa (sem caixas pesadas) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          {currentModality.specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B8FF00]/15 flex items-center justify-center text-[#B8FF00] shrink-0 border border-[#B8FF00]/25">
                <Check className="w-4 h-4 text-[#B8FF00]" />
              </div>
              <div>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{spec.label}</p>
                <p className="text-sm sm:text-base font-bold text-white">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modalities;
