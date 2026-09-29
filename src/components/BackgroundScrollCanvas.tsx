import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Film } from 'lucide-react';

const TOTAL_FRAMES = 240;
const FRAME_PATH = (index: number) =>
  `/frames/sharegrid_frames_30fps/frame_${String(index).padStart(4, '0')}.png`;

export const BackgroundScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(1);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedIndexRef = useRef<number>(-1);

  // Render specific frame onto canvas with cover aspect ratio
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    const images = imagesRef.current;
    let img = images[safeIndex];

    // If target frame isn't loaded yet, pick closest loaded frame
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

  // Scroll handler calculating overall page scroll progress
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
    const windowHeight = window.innerHeight;
    const maxScroll = Math.max(1, docHeight - windowHeight);

    const rawProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));
    setProgress(rawProgress);
    targetFrameRef.current = rawProgress * (TOTAL_FRAMES - 1);
  };

  // Preload all frames
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Frame 0 loaded first
    const firstImg = new Image();
    firstImg.src = FRAME_PATH(0);
    imagesRef.current[0] = firstImg;

    firstImg.onload = () => {
      if (isCancelled) return;
      loadedCount++;
      handleResize();
      renderFrame(0);
    };

    // Preload rest in parallel
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

  // Animation Loop with LERP
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.14;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameNumber = Math.round(currentFrameRef.current);
      setCurrentFrameDisplay(frameNumber + 1);
      renderFrame(frameNumber);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

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

  return (
    <>
      {/* Fixed Background Canvas Container */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-slate-950">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Ambient Dark Overlay for Maximum Visual Depth and Text Contrast */}
        <div className="absolute inset-0 bg-slate-950/45 backdrop-contrast-105 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/70 pointer-events-none" />
      </div>

      {/* Floating Bottom-Right Video Scrubbing HUD */}
      <div className="fixed bottom-5 right-5 z-40 pointer-events-none hidden sm:flex items-center gap-3 bg-slate-950/75 backdrop-blur-xl border border-white/15 px-3.5 py-2 rounded-2xl shadow-2xl">
        <Film className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-300 font-medium">FRAME</span>
          <span className="text-white font-bold">{String(currentFrameDisplay).padStart(3, '0')}</span>
          <span className="text-slate-500">/ {TOTAL_FRAMES}</span>
        </div>
        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-75"
            style={{ width: `${Math.max(3, progress * 100)}%` }}
          />
        </div>
      </div>

      {/* Frame Loading Pill */}
      {!isLoaded && loadPercentage < 100 && (
        <div className="fixed top-20 right-5 z-40 pointer-events-none">
          <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs text-slate-300 shadow-xl">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
            <span>Buffering background: {loadPercentage}%</span>
          </div>
        </div>
      )}
    </>
  );
};
