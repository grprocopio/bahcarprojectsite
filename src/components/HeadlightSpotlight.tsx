import React, { useEffect, useState } from 'react';

/**
 * HeadlightSpotlight: Projeta um facho suave de farol de LED noturno (#B8FF00 / Branco)
 * que segue suavemente o cursor em telas Desktop, iluminando a malha técnica e o asfalto.
 * Desativa automaticamente em dispositivos touch/mobile para máxima performance.
 */
export const HeadlightSpotlight: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Detecta se é dispositivo com ponteiro preciso (mouse/trackpad de desktop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;
    setIsPointerDevice(true);

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      // Interpolação suave (lerp) para a luz deslizar organicamente
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPos({ x: Math.round(currentX), y: Math.round(currentY) });
      rafId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (rafId === null) {
        currentX = targetX;
        currentY = targetY;
        rafId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isPointerDevice || !pos) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300 overflow-hidden"
      style={{
        background: `radial-gradient(450px circle at ${pos.x}px ${pos.y}px, rgba(184, 255, 0, 0.038), rgba(255, 255, 255, 0.015) 35%, transparent 70%)`,
      }}
    />
  );
};
