import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

/**
 * AnimatedCounter: Odômetro digital esportivo com rotação rápida de números (HUD Tacômetro)
 * Realiza interpolação fluida por requestAnimationFrame em subida ou descida de valores.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  decimals = 2,
  className = '',
  duration = 260,
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const startTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const startVal = prevValueRef.current;
    const endVal = value;
    startTimeRef.current = null;

    const diff = Math.abs(startVal - endVal);
    if (diff < 0.01) {
      setDisplayValue(endVal);
      return;
    }

    // Se a variação for pequena (arraste contínuo do slider), responde na hora sem acumular fila de frames
    const effectiveDuration = diff <= 2 ? 60 : Math.min(duration, 140);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / effectiveDuration);
      // Easing suave (easeOutQuad)
      const easeOut = 1 - (1 - progress) * (1 - progress);
      const current = startVal + (endVal - startVal) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endVal);
        prevValueRef.current = endVal;
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      prevValueRef.current = value;
    };
  }, [value, duration]);

  const formatted = displayValue.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`inline-block tabular-nums font-mono ${className}`}>
      {prefix}{formatted}
    </span>
  );
};
