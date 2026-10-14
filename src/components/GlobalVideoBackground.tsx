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

    // Ultra-optimized 60fps video seek without decoding lockups
    let targetTime = 0;
    let animFrameId: number | null = null;
    let isSeeking = false;

    const performSeek = () => {
      if (!video || video.readyState < 1 || !video.duration || isSeeking) {
        return;
      }

      const current = video.currentTime;
      const diff = targetTime - current;

      if (Math.abs(diff) > 0.03) {
        isSeeking = true;
        const clamped = Math.max(0, Math.min(video.duration - 0.02, targetTime));
        const targetVideo = video as HTMLVideoElement;
        if (typeof (targetVideo as any).fastSeek === 'function') {
          try {
            (targetVideo as any).fastSeek(clamped);
          } catch {
            targetVideo.currentTime = clamped;
          }
        } else {
          targetVideo.currentTime = clamped;
        }
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (video && Math.abs(targetTime - video.currentTime) > 0.04) {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(performSeek);
      }
    };

    video.addEventListener('seeked', handleSeeked);

    // Scroll ágil e dinâmico: as outras seções do site aparecem com rapidez e fluidez
    const scrollDistance = Math.min(750, typeof window !== 'undefined' ? Math.max(500, Math.round(window.innerHeight * 0.75)) : 700);
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: `+=${scrollDistance}`,
      scrub: 0.1,
      onUpdate: (self) => {
        const dur = (video && video.duration && !isNaN(video.duration)) ? video.duration : videoDuration;
        targetTime = self.progress * dur;
        if (!isSeeking) {
          if (animFrameId) cancelAnimationFrame(animFrameId);
          animFrameId = requestAnimationFrame(performSeek);
        }
      },
    });

    return () => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
      video.removeEventListener('seeked', handleSeeked);
      st.kill();
    };
  }, [videoDuration]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#050505]">
      {/* 
        Fullscreen Video Layer:
        Ocupa 100% da tela em posição fixa durante toda a navegação com máxima performance GPU
      */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        autoPlay={false}
        preload="auto"
        poster={posterSrc}
        // @ts-ignore
        webkit-playsinline="true"
        x5-playsinline="true"
        className="w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.06] transform-gpu will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 
        Dynamic Low-Exposure Tint Layer:
        GPU composited sem travamento
      */}
      <div
        className="absolute inset-0 pointer-events-none transform-gpu"
        style={{
          transform: 'translateZ(0)',
          backgroundColor: 'rgba(5, 5, 5, calc(0.12 + var(--hero-blur-intensity, 0) * 0.65))',
        }}
      />

      {/* 
        Ultra-Smooth Blur Layer:
        Composited com opacity para nunca travar a GPU durante o scroll
      */}
      <div
        className="absolute inset-0 pointer-events-none transform-gpu"
        style={{
          transform: 'translateZ(0)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: 'var(--hero-blur-intensity, 0)',
        }}
      />
    </div>
  );
};

