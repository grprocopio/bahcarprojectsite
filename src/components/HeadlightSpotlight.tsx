import React, { useEffect, useState } from 'react';

/**
 * HeadlightSpotlight: Projeta um facho suave de farol de LED noturno (#B8FF00 / Branco)
 * que segue suavemente o cursor em telas Desktop, iluminando a malha técnica e o asfalto.
 * Desativa automaticamente em dispositivos touch/mobile para máxima performance.
 */
export const HeadlightSpotlight: React.FC = () => {
  const spotlightRef = React.useRef<HTMLDivElement>(null);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Detecta se é dispositivo com ponteiro preciso (mouse/trackpad de desktop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;
    setIsPointerDevice(true);

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const render = () => {
      // Interpolação suave (lerp) para a luz deslizar organicamente
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(450px circle at ${Math.round(currentX)}px ${Math.round(currentY)}px, rgba(184, 255, 0, 0.038), rgba(255, 255, 255, 0.015) 35%, transparent 70%)`;
      }

      // Se já alcançou o alvo, pausa o RAF para economizar 100% de CPU/GPU em repouso
      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (currentX === -1000) {
        currentX = targetX;
        currentY = targetY;
      }
      if (rafId === null) {
        rafId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isPointerDevice) return null;

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300 overflow-hidden transform-gpu will-change-transform"
      style={{ transform: 'translateZ(0)' }}
    />
  );
};
