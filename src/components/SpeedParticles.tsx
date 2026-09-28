import React, { useEffect, useRef } from 'react';

/**
 * SpeedParticles: Partículas discretas de luz e poeira de asfalto noturno em suspensão.
 * Utiliza Canvas 2D nativo ultra leve com requestAnimationFrame.
 * Reduz a densidade drasticamente em telas pequenas para economizar bateria e GPU.
 */
export const SpeedParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    // Quantidade calibrada: 28 no desktop, apenas 12 no mobile
    const particleCount = isMobile ? 12 : 28;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      color: string;
    }

    const colors = [
      'rgba(184, 255, 0, ', // Verde Neon Bahcar
      'rgba(255, 255, 255, ', // Branco farol
      'rgba(210, 255, 120, ', // Amarelo limão suave
    ];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4 - 0.2, // Leve tendência para esquerda simulando deslocamento
      speedY: (Math.random() - 0.5) * 0.5 - 0.15,
      opacity: Math.random() * 0.45 + 0.1,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let phase = 0;
    const render = () => {
      phase += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Loop contínuo pelas bordas
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const currentOpacity = Math.max(
          0.05,
          p.opacity + Math.sin(phase + i) * 0.15
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] opacity-75"
    />
  );
};
