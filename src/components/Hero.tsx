import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  // 1. Smooth Text Fade & Parallax Elevation upon scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=450',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (textContentRef.current) {
            // Fade out smoothly and quickly as user starts scrolling
            const textOpacity = 1 - Math.max(0, (self.progress - 0.25) * 2.2);
            const translateY = -self.progress * 35;
            textContentRef.current.style.opacity = `${Math.max(0, textOpacity)}`;
            textContentRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
          }
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center select-none z-10"
    >
      {/* 
        Content Area: Original impactful BahCar Hero
      */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-20 flex flex-col justify-start h-full pt-28 sm:pt-36 lg:pt-44">
        <div
          ref={textContentRef}
          className="max-w-2xl text-left transform-gpu will-change-transform"
        >
          {/* Headline Original: Pessoas movem a cidade. A BAH CONECTA. */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl italic font-black uppercase tracking-[0.02em] sm:tracking-[0.03em] leading-[1.08] sm:leading-[1.06] lg:leading-[1.04] text-balance"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span className="text-white block pb-1 sm:pb-1.5">
              Pessoas movem
            </span>
            <span className="text-white block pb-1 sm:pb-1.5">
              a cidade.
            </span>
            <div className="mt-2 sm:mt-3 flex items-baseline flex-wrap">
              <span className="text-white mr-2 sm:mr-3">
                A BAH
              </span>
              <span
                className="outline-text-hollow inline-block tracking-[0.04em] transform translate-y-0.5"
                style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
              >
                CONECTA.
              </span>
            </div>
          </h1>

          {/* Subheadline: O seu aplicativo, de Santa Maria */}
          <p className="mt-5 sm:mt-7 text-base sm:text-xl md:text-2xl text-neutral-100 font-medium leading-relaxed max-w-lg">
            <span>O seu aplicativo, de </span>
            <span className="font-extrabold text-[#B8FF00] tracking-tight">
              Santa Maria
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
