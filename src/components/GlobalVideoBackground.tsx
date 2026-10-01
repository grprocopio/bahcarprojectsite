import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';

gsap.registerPlugin(ScrollTrigger);

interface GlobalVideoBackgroundProps {
  hlsStreamUrl?: string;
}

export const GlobalVideoBackground: React.FC<GlobalVideoBackgroundProps> = ({ hlsStreamUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoReady, setVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(8);

  const videoSrc = '/Animating_BahCar_landing_page_hero_20260927201211.mp4';
  const posterSrc = '/images/hero_poster.jpg';

  // 1. Setup Video & Decoding Pipeline
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: Hls | null = null;
    const isHls = hlsStreamUrl && hlsStreamUrl.includes('.m3u8');

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    if (isHls) {
      if (Hls.isSupported()) {
        hlsInstance = new Hls({
          enableWorker: true,
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          startLevel: -1,
        });
        hlsInstance.loadSource(hlsStreamUrl);
        hlsInstance.attachMedia(video);
        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
          setVideoReady(true);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = hlsStreamUrl;
      }
    } else {
      video.src = videoSrc;
    }

    const primeMobileDecoder = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            setVideoReady(true);
          })
          .catch(() => {
            setVideoReady(true);
          });
      }
    };

    primeMobileDecoder();

    const handleFirstTouch = () => {
      primeMobileDecoder();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };

    window.addEventListener('touchstart', handleFirstTouch, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstTouch, { passive: true, once: true });

    const handleCanPlay = () => {
      setVideoReady(true);
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
      }
      setVideoReady(true);
    };

    const fallbackTimer = setTimeout(() => {
      setVideoReady(true);
    }, 1200);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [hlsStreamUrl, videoSrc]);

  // 2. Continuous 60fps Scroll Scrub & Dynamic Blur/Exposure Overlay on Fullsite Scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let animFrameId: number | null = null;
    let isTicking = false;

    const tick = () => {
      if (!video) {
        isTicking = false;
        return;
      }

      if (video.readyState >= 1 && video.duration) {
        const current = video.currentTime;
        const diff = targetTime - current;

        if (Math.abs(diff) > 0.003) {
          const nextTime = current + diff * 0.28;
          const clampedTime = Math.max(0, Math.min(video.duration - 0.01, nextTime));

          if ('fastSeek' in video && typeof (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function') {
            try {
              (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(clampedTime);
            } catch {
              video.currentTime = clampedTime;
            }
          } else {
            video.currentTime = clampedTime;
          }

          animFrameId = requestAnimationFrame(tick);
          return;
        } else {
          // Settled near target
          video.currentTime = targetTime;
        }
      }

      isTicking = false;
      animFrameId = null;
    };

    const requestTick = () => {
      if (!isTicking) {
        isTicking = true;
        animFrameId = requestAnimationFrame(tick);
      }
    };

    // ScrollTrigger on window scroll:
    // First 1600px: Hero phase scrubs the video frames smoothly while crisp.
    // Video responds instantly to scroll events with GPU-optimized timeline
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '+=1600',
      scrub: 0.1,
      onUpdate: (self) => {
        const dur = (video && video.duration && !isNaN(video.duration)) ? video.duration : videoDuration;
        targetTime = self.progress * dur;
        requestTick();
      },
    });

    return () => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
      st.kill();
    };
  }, [videoDuration]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#050505]">
      {/* 
        Fullscreen Video Layer:
        Ocupa 100% da tela em posição fixa durante toda a navegação do site com boa nitidez e presença.
      */}
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay={false}
        preload="auto"
        poster={posterSrc}
        // @ts-ignore
        webkit-playsinline="true"
        x5-playsinline="true"
        className="w-full h-full object-cover object-center filter brightness-[1.0] contrast-[1.08] transform-gpu will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* 
        Dynamic Low-Exposure Tint Layer:
        Escurece progressivamente de forma suave e homogênea (preto puro) conforme desce da Hero,
        mantendo a leitura das seções perfeita sem criar linhas de corte ou diferenças de cor.
      */}
      <div
        className="absolute inset-0 pointer-events-none transition-none transform-gpu"
        style={{
          transform: 'translateZ(0)',
          backgroundColor: 'rgba(5, 5, 5, calc(0.20 + var(--hero-blur-intensity, 0) * 0.45))',
        }}
      />

      {/* 
        Dynamic Blur Layer:
        Aplica o efeito de blur suave no vídeo assim que o usuário passa o scroll da Hero,
        tornando o fundo cinematográfico e suave para as demais seções.
      */}
      <div
        className="absolute inset-0 pointer-events-none transition-none transform-gpu"
        style={{
          transform: 'translateZ(0)',
          backdropFilter: 'blur(calc(var(--hero-blur-intensity, 0) * 12px))',
          WebkitBackdropFilter: 'blur(calc(var(--hero-blur-intensity, 0) * 12px))',
        }}
      />
    </div>
  );
};

