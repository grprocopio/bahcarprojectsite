import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import Hls from 'hls.js';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenLaunch: () => void;
  onOpenPartner: () => void;
  hlsStreamUrl?: string; // Optional Mux HLS stream URL
}

export const Hero: React.FC<HeroProps> = ({ onOpenLaunch, onOpenPartner, hlsStreamUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Buffer and loading states
  const [videoReady, setVideoReady] = useState(false);
  const [bufferPercent, setBufferPercent] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(8);

  // Video source path: optimized all-intra keyframe video for 60fps instantaneous scrub
  const videoSrc = '/Animating_BahCar_landing_page_hero_20260927201211.mp4';

  // 1. Setup Video & Buffer Tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: Hls | null = null;
    const isHls = hlsStreamUrl && hlsStreamUrl.includes('.m3u8');

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

    const handleProgress = () => {
      if (video.buffered && video.buffered.length > 0 && video.duration) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percent = Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
        setBufferPercent(percent);
      }
    };

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
      video.pause();
      setVideoReady(true);
    };

    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [hlsStreamUrl, videoSrc]);

  // 2. 60FPS Butter-Smooth Scroll-to-Seek Engine (RAF Lerp Interpolator)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!container || !video) return;

    let targetTime = 0;
    let animFrameId: number;
    let isRunning = true;

    // High-performance continuous 60fps lerp loop
    const tick = () => {
      if (!isRunning) return;

      if (video && video.readyState >= 2 && video.duration) {
        const current = video.currentTime;
        const diff = targetTime - current;

        // Smooth exponential approach: moves 22% of remaining distance each frame
        // This eliminates jitter, avoids keyframe lag, and glides fluidly at 60fps
        if (Math.abs(diff) > 0.005) {
          const nextTime = current + diff * 0.22;
          video.currentTime = Math.max(0, Math.min(video.duration - 0.01, nextTime));
        }
      }

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);

    let ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=1600', // Pinned scroll track
        pin: true,
        pinSpacing: true,
        scrub: true, // Immediate 1:1 scroll responsiveness
        anticipatePin: 1,
        onUpdate: (self) => {
          const dur = (video && video.duration && !isNaN(video.duration)) ? video.duration : videoDuration;
          targetTime = self.progress * dur;

          // Text subtle elevation near the end of the hero pinned scroll
          if (textContentRef.current) {
            const textOpacity = 1 - Math.max(0, (self.progress - 0.8) * 5);
            const translateY = -self.progress * 30;
            textContentRef.current.style.opacity = `${Math.max(0.1, textOpacity)}`;
            textContentRef.current.style.transform = `translateY(${translateY}px)`;
          }

          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.opacity = `${Math.max(0, 1 - self.progress * 4)}`;
          }
        },
      });

      return () => {
        st.kill();
      };
    }, container);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameId);
      ctx.revert();
    };
  }, [videoDuration]);

  // 3. Smooth Mouse Parallax using GSAP quickTo
  useEffect(() => {
    const wrapper = videoWrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const xTo = gsap.quickTo(wrapper, 'x', { duration: 1.2, ease: 'power2.out' });
    const yTo = gsap.quickTo(wrapper, 'y', { duration: 1.2, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(normX * 24);
      yTo(normY * 16);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050505] flex items-center select-none"
    >
      {/* 
        Video Wrapper with Smooth Mouse Parallax (Scale 1.05 prevents edge cutoff)
      */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] z-0 will-change-transform scale-105"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03]"
          style={{ pointerEvents: 'none' }}
        />

        {/* Minimal Non-Intrusive Vignette (Allows video to shine without heavy dark blocks) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/75 via-[#050505]/25 to-transparent z-10 w-full sm:w-2/3 md:w-1/2 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10 pointer-events-none" />
      </div>

      {/* 
        Buffer Loading Overlay
      */}
      <div
        className={`absolute inset-0 z-30 bg-[#050505] flex flex-col items-center justify-center transition-all duration-700 ${
          videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-4 max-w-xs text-center px-6">
          <div className="w-10 h-10 rounded-2xl bg-[#092218] border border-[#B8FF00]/50 flex items-center justify-center text-[#B8FF00] shadow-[0_0_20px_rgba(184,255,0,0.25)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="font-heading font-bold text-xs tracking-wider text-white uppercase">
              BAHCAR CINEMATIC
            </div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B8FF00]">
              Buffer: {bufferPercent > 0 ? `${bufferPercent}%` : 'Carregando...'}
            </div>
          </div>

          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B8FF00] transition-all duration-300 shadow-[0_0_10px_#B8FF00]"
              style={{ width: `${Math.max(15, bufferPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 
        Refined Content Area: Positioned higher up, larger typography, distinctive font for 'conecta'
        No buttons, leaving the video completely unobstructed
      */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-start h-full pt-28 sm:pt-32 lg:pt-36">
        <div
          ref={textContentRef}
          className="max-w-2xl text-left transition-transform duration-75 ease-out"
        >
          {/* Headline: Full phrase in sporty italic Kanit font, CONECTA with hollow outline stroke */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl italic font-black uppercase tracking-[0.03em] leading-[1.14] text-balance"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span className="text-white block">
              Pessoas movem cidades.
            </span>
            <span className="text-white">A </span>
            <span className="text-white mr-2 sm:mr-3">
              BAH
            </span>
            <span
              className="outline-text-hollow inline-block tracking-[0.04em] transform translate-y-0.5"
              style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
            >
              CONECTA.
            </span>
          </h1>

          {/* Subheadline: Concise and elegant */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-lg">
            Um novo jeito de viver a mobilidade em Santa Maria.
          </p>
        </div>
      </div>

      {/* Discrete Scroll Indicator at bottom */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-neutral-400 pointer-events-none transition-opacity duration-300"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-neutral-400">
          Role para descobrir
        </span>
        <div className="w-4 h-7 rounded-full border border-neutral-600 flex items-start justify-center p-0.5">
          <div className="w-1 h-2 rounded-full bg-[#B8FF00] animate-bounce" />
        </div>
      </div>
    </div>
  );
};
