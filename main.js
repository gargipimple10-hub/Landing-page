const TOTAL_FRAMES = 240;
const FRAME_PATH = (index) =>
  `/frames/sharegrid_frames_30fps/frame_${String(index).padStart(4, '0')}.png`;

const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const loaderOverlay = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');

const images = new Array(TOTAL_FRAMES);
let loadedCount = 0;
let naturalWidth = 0;
let naturalHeight = 0;

let currentFrame = 0;
let targetFrame = 0;
let lastRenderedIndex = -1;
let isLoopRunning = false;

// Tuning parameters for ultra-smooth buttery inertia
const LERP_FACTOR = 0.15;

// Resize canvas to match display & handle HiDPI displays
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;

  const neededWidth = Math.round(displayWidth * dpr);
  const neededHeight = Math.round(displayHeight * dpr);

  if (canvas.width !== neededWidth || canvas.height !== neededHeight) {
    canvas.width = neededWidth;
    canvas.height = neededHeight;
  }

  // Force redraw on resize
  lastRenderedIndex = -1;
  renderFrame(Math.round(currentFrame));
}

// Draw image covering the entire canvas without stretching or distortion
function drawCover(img) {
  if (!img || !img.complete || img.naturalWidth === 0) return;
  
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  // Calculate cover dimensions
  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, sx, sy, sw, sh);
}

// Render specific frame onto canvas with cover aspect ratio
function renderFrame(index) {
  const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
  const img = images[safeIndex];

  if (!img || !img.complete || img.naturalWidth === 0) {
    // If target frame is not ready yet, try finding closest available frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = safeIndex - offset;
      const next = safeIndex + offset;
      if (prev >= 0 && images[prev]?.complete && images[prev].naturalWidth > 0) {
        drawCover(images[prev]);
        return;
      }
      if (next < TOTAL_FRAMES && images[next]?.complete && images[next].naturalWidth > 0) {
        drawCover(images[next]);
        return;
      }
    }
    return;
  }

  if (safeIndex === lastRenderedIndex) return;
  lastRenderedIndex = safeIndex;

  drawCover(img);
}

// Update target frame based on current scroll position
function updateScrollTarget() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const maxScroll = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);
  const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

  targetFrame = progress * (TOTAL_FRAMES - 1);
}

// Animation loop with lerping for fluid motion
function animationLoop() {
  const diff = targetFrame - currentFrame;
  if (Math.abs(diff) > 0.0005) {
    currentFrame += diff * LERP_FACTOR;
  } else {
    currentFrame = targetFrame;
  }

  renderFrame(Math.round(currentFrame));

  requestAnimationFrame(animationLoop);
}

// Preload all frames
function preloadFrames() {
  // First load frame 0 immediately
  const firstImg = new Image();
  firstImg.src = FRAME_PATH(0);
  images[0] = firstImg;

  firstImg.onload = () => {
    naturalWidth = firstImg.naturalWidth;
    naturalHeight = firstImg.naturalHeight;
    loadedCount++;
    resizeCanvas();
    renderFrame(0);
  };

  // Preload all remaining frames in parallel
  for (let i = 1; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = FRAME_PATH(i);
    images[i] = img;

    img.onload = () => {
      loadedCount++;
      const progressPercent = (loadedCount / TOTAL_FRAMES) * 100;
      if (loaderBar) {
        loaderBar.style.width = `${progressPercent}%`;
      }
      if (loadedCount >= TOTAL_FRAMES) {
        if (loaderOverlay) {
          loaderOverlay.classList.add('hidden');
        }
      }
    };
    img.onerror = () => {
      loadedCount++;
      if (loadedCount >= TOTAL_FRAMES && loaderOverlay) {
        loaderOverlay.classList.add('hidden');
      }
    };
  }
}

// Event Listeners
window.addEventListener('scroll', updateScrollTarget, { passive: true });
document.addEventListener('scroll', updateScrollTarget, { passive: true });
window.addEventListener('resize', () => {
  resizeCanvas();
  updateScrollTarget();
});

// Direct initialization (handles both deferred and immediate script execution)
function init() {
  resizeCanvas();
  preloadFrames();
  updateScrollTarget();

  if (!isLoopRunning) {
    isLoopRunning = true;
    requestAnimationFrame(animationLoop);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
