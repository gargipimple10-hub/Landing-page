import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Play, Shield, Layers, Camera, ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 240;
const FRAME_PATH = (index: number) =>
  `/frames/sharegrid_frames_30fps/frame_${String(index).padStart(4, '0')}.png`;

const STORY_STEPS = [
  {
    range: [0, 0.25],
    badge: 'Step 01 / Browse Gear',
    icon: Camera,
    title: 'Explore High-End Creator Equipment',
    description:
      'Discover premium cameras, cinematic lenses, lighting kits, and audio gear right in your neighborhood.',
  },
  {
    range: [0.25, 0.5],
    badge: 'Step 02 / Seamless Booking',
    icon: Shield,
    title: 'Verified Members & Safe Deposits',
    description:
      'Every rental is protected with transparent terms, identity verification, and zero hidden friction.',
  },
  {
    range: [0.5, 0.75],
    badge: 'Step 03 / Create & Produce',
    icon: Layers,
    title: 'Bring Your Vision to Life',
    description:
      'Pick up the gear, shoot your project with production-grade equipment, and keep creative costs minimal.',
  },
  {
    range: [0.75, 1.0],
    badge: 'Step 04 / Share & Earn',
    icon: Sparkles,
    title: 'Turn Idle Gear Into Passive Income',
    description:
      'Join thousands of creators monetizing their shelves while fueling the local creative community.',
  },
];

export const ScrollAnimationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [progress, setProgress] = useState<number>(0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedIndexRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  // Resize and render canvas
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    const images = imagesRef.current;
    let img = images[safeIndex];

    // If frame is not loaded yet, search nearest available cached frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = safeIndex - offset;
        const next = safeIndex + offset;
        if (prev >= 0 && images[prev]?.complete && (images[prev]?.naturalWidth ?? 0) > 0) {
          img = images[prev];
          break;
        }
        if (next < TOTAL_FRAMES && images[next]?.complete && (images[next]?.naturalWidth ?? 0) > 0) {
          img = images[next];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;
    if (safeIndex === lastRenderedIndexRef.current && canvas.dataset.resized !== 'true') return;

    lastRenderedIndexRef.current = safeIndex;
    canvas.dataset.resized = 'false';

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover scale calculation
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const neededWidth = Math.round(displayWidth * dpr);
    const neededHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== neededWidth || canvas.height !== neededHeight) {
      canvas.width = neededWidth;
      canvas.height = neededHeight;
      canvas.dataset.resized = 'true';
    }

    renderFrame(currentFrameRef.current);
  };

  // Scroll handler calculating relative progress inside this section
  const handleScroll = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const sectionHeight = containerRef.current.clientHeight;
    const windowHeight = window.innerHeight;

    // Total scrollable distance within this sticky section
    const maxScroll = sectionHeight - windowHeight;
    if (maxScroll <= 0) return;

    // How far the top of the container has scrolled past the top of the viewport
    const scrolledAmount = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, scrolledAmount / maxScroll));

    setProgress(rawProgress);
    targetFrameRef.current = rawProgress * (TOTAL_FRAMES - 1);

    // Determine active story step
    const stepIdx = STORY_STEPS.findIndex(
      (s) => rawProgress >= s.range[0] && (rawProgress < s.range[1] || (s.range[1] === 1.0 && rawProgress <= 1.0))
    );
    if (stepIdx !== -1) {
      setActiveStepIndex(stepIdx);
    }
  };

  // Frame preloading
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Preload frame 0 first for instant visual feedback
    const firstImg = new Image();
    firstImg.src = FRAME_PATH(0);
    imagesRef.current[0] = firstImg;

    firstImg.onload = () => {
      if (isCancelled) return;
      loadedCount++;
      handleResize();
      renderFrame(0);
    };

    // Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      imagesRef.current[i] = img;

      img.onload = () => {
        if (isCancelled) return;
        loadedCount++;
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadPercentage(pct);
        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // Inertial animation loop with LERP for buttery smoothness
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.14;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      renderFrame(currentFrameRef.current);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    animationFrameIdRef.current = animId;

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Window listeners
  useEffect(() => {
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const currentStep = STORY_STEPS[activeStepIndex] || STORY_STEPS[0];
  const StepIcon = currentStep.icon;

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full h-[380vh] md:h-[480vh] bg-black text-white"
    >
      {/* Sticky Fullscreen Frame Player Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Canvas displaying high-resolution frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Cinematic dark gradient vignette overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/75 pointer-events-none" />

        {/* Top Header Badge */}
        <div className="absolute top-6 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-2xl">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-200">
              Interactive 3D Video Experience &bull; Scroll to Scrub
            </span>
          </div>
        </div>

        {/* Synchronized Floating Feature Story Card */}
        <div className="absolute left-6 md:left-12 lg:left-20 bottom-24 md:bottom-28 max-w-lg z-20 pointer-events-none">
          <div className="bg-slate-950/80 backdrop-blur-xl border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/80 transition-all duration-300">
            {/* Step Tag */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <StepIcon className="w-3.5 h-3.5" />
                <span>{currentStep.badge}</span>
              </div>
              <span className="text-xs font-mono font-medium text-slate-400">
                Frame {Math.round(currentFrameRef.current) + 1} / {TOTAL_FRAMES}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-2 leading-tight">
              {currentStep.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>

        {/* Bottom Interactive HUD & Scrub Bar */}
        <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 z-20 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none">
          {/* Scroll instruction indicator */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
            <span>Scroll smoothly to control video progression</span>
          </div>

          {/* Timeline scrub progress bar */}
          <div className="w-full md:w-80 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-300 font-medium">
              <span>PROGRESS</span>
              <span className="text-blue-400 font-bold">{Math.round(progress * 100)}%</span>
            </div>
            {/* Visual Bar with Track Markers */}
            <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 rounded-full transition-all duration-75 shadow-lg shadow-blue-500/50"
                style={{ width: `${Math.max(2, progress * 100)}%` }}
              />
            </div>
            {/* 4 Milestones Dots */}
            <div className="flex justify-between px-0.5 text-[9px] font-semibold text-slate-400">
              <span className={progress >= 0 ? 'text-blue-400' : ''}>01 FIND</span>
              <span className={progress >= 0.25 ? 'text-blue-400' : ''}>02 BOOK</span>
              <span className={progress >= 0.5 ? 'text-blue-400' : ''}>03 SHOOT</span>
              <span className={progress >= 0.75 ? 'text-blue-400' : ''}>04 RETURN</span>
            </div>
          </div>
        </div>

        {/* Minimal Initial Frame Loader (only visible while first batch loads) */}
        {!isLoaded && loadPercentage < 100 && (
          <div className="absolute top-20 right-6 z-30 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
              <span>Buffering frames: {loadPercentage}%</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
