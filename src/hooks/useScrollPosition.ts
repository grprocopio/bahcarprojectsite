import { useEffect, useState, useRef, RefObject } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollDirection: 'up' | 'down';
  scrollProgress: number; // 0 to 1
}

/**
 * Hook para detectar a posição de rolagem global da janela
 */
export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollDirection: 'down',
    scrollProgress: 0,
  });

  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || window.pageYOffset;
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const progress = Math.min(1, Math.max(0, currentY / maxScroll));
          const direction = currentY >= lastScrollY.current ? 'down' : 'up';

          lastScrollY.current = currentY;

          setPosition({
            scrollY: currentY,
            scrollDirection: direction,
            scrollProgress: progress,
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return position;
}

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook de Scroll Reveal progressivo para elementos entrarem com fade-in e leve elevação
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.05, rootMargin = '0px 0px 80px 0px', triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se o elemento já estiver na viewport inicial (topo da página), revela imediatamente
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      setIsVisible(true);
      if (triggerOnce) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && el) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}
