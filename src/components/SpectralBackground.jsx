import React, { useEffect, useRef } from 'react';

/**
 * SpectralBackground:
 * Ultra-high-performance mathematical reproduction of the Converge artwork.
 * 
 * Performance Architecture:
 * 1. Offscreen Pre-rendering: Static mesh, radiating rays, elliptic shells,
 *    color orbs, and focal star are drawn ONCE to an offscreen canvas on resize.
 * 2. Instant Blit: Main loop executes a single hardware-accelerated ctx.drawImage()
 *    instead of recalculating 250+ expensive vector curves on every frame.
 * 3. Particle Batching: Streamlined stardust nodes rendered efficiently.
 * 4. IntersectionObserver: Pauses animation completely when scrolled out of view.
 * 5. Scroll-Aware Throttling: Pauses during active scroll gestures to guarantee
 *    100% butter-smooth 60/120fps scrolling with zero dropped frames.
 */
export function SpectralBackground({ className = '', intensity = 1.0, interactive = true }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let time = 0;
    let isVisible = true;
    let isScrolling = false;
    let scrollTimeout = null;

    // Offscreen canvas for caching all static vector graphics
    let offscreenCanvas = document.createElement('canvas');
    let offscreenCtx = offscreenCanvas.getContext('2d', { alpha: true });

    // Seeded star particles
    let stardust = [];

    const initStardust = (w, h) => {
      stardust = [];
      const ribbonCount = Math.min(220, Math.floor((w * h) / 3200));
      for (let i = 0; i < ribbonCount; i++) {
        const u = Math.random();
        const x = u * w;
        const ribbonCenterY = (0.05 + 0.5 * Math.sin(u * 2.8 + 0.3) + 0.35 * Math.pow(u, 1.8)) * h;
        const spread = (Math.random() - 0.5) * (h * 0.26);
        const y = ribbonCenterY + spread;
        const size = Math.random() < 0.6 ? 1.0 : Math.random() < 0.9 ? 1.8 : 2.8;
        const baseAlpha = 0.35 + Math.random() * 0.65;
        const twinkleSpeed = 0.8 + Math.random() * 1.5;
        const phase = Math.random() * Math.PI * 2;
        stardust.push({ x, y, size, baseAlpha, twinkleSpeed, phase });
      }

      const fieldCount = Math.min(120, Math.floor((w * h) / 5500));
      for (let i = 0; i < fieldCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = Math.random() < 0.7 ? 0.8 : 1.5;
        const baseAlpha = 0.2 + Math.random() * 0.5;
        const twinkleSpeed = 0.5 + Math.random() * 1.0;
        const phase = Math.random() * Math.PI * 2;
        stardust.push({ x, y, size, baseAlpha, twinkleSpeed, phase });
      }
    };

    /**
     * Render the heavy mathematical static vector art ONCE onto the offscreen canvas.
     */
    const renderStaticArtwork = (w, h, dpr) => {
      if (!offscreenCtx) return;
      offscreenCanvas.width = Math.floor(w * dpr);
      offscreenCanvas.height = Math.floor(h * dpr);
      offscreenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offscreenCtx.clearRect(0, 0, w, h);

      const px = 0.17 * w;
      const py = 0.35 * h;

      // 1. Radiant Color Orbs Pass
      offscreenCtx.save();
      offscreenCtx.globalCompositeOperation = 'screen';

      // (A) Top-Left Fiery Vermilion / Magenta Nebula Orb
      const r1 = Math.max(140, w * 0.22);
      const orb1Grad = offscreenCtx.createRadialGradient(0.27 * w, 0.22 * h, 0, 0.27 * w, 0.22 * h, r1);
      orb1Grad.addColorStop(0, 'rgba(244, 63, 34, 0.95)');
      orb1Grad.addColorStop(0.3, 'rgba(234, 88, 12, 0.85)');
      orb1Grad.addColorStop(0.6, 'rgba(217, 32, 108, 0.65)');
      orb1Grad.addColorStop(0.85, 'rgba(168, 85, 247, 0.25)');
      orb1Grad.addColorStop(1, 'rgba(147, 51, 234, 0)');
      offscreenCtx.fillStyle = orb1Grad;
      offscreenCtx.beginPath();
      offscreenCtx.arc(0.27 * w, 0.22 * h, r1, 0, Math.PI * 2);
      offscreenCtx.fill();

      // (B) Bottom-Right Scarlet Red Orb with Warm Gold Corona
      const r2 = Math.max(180, w * 0.26);
      const orb2Grad = offscreenCtx.createRadialGradient(0.75 * w, 0.74 * h, 0, 0.75 * w, 0.74 * h, r2);
      orb2Grad.addColorStop(0, 'rgba(238, 25, 25, 0.98)');
      orb2Grad.addColorStop(0.35, 'rgba(225, 29, 72, 0.88)');
      orb2Grad.addColorStop(0.65, 'rgba(249, 115, 22, 0.6)');
      orb2Grad.addColorStop(0.88, 'rgba(250, 204, 21, 0.3)');
      orb2Grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      offscreenCtx.fillStyle = orb2Grad;
      offscreenCtx.beginPath();
      offscreenCtx.arc(0.75 * w, 0.74 * h, r2, 0, Math.PI * 2);
      offscreenCtx.fill();

      // (C) Top-Right Radiant Sunshine Yellow Glow
      const r3 = Math.max(110, w * 0.18);
      const orb3Grad = offscreenCtx.createRadialGradient(0.74 * w, 0.26 * h, 0, 0.74 * w, 0.26 * h, r3);
      orb3Grad.addColorStop(0, 'rgba(253, 224, 71, 0.92)');
      orb3Grad.addColorStop(0.4, 'rgba(234, 179, 8, 0.75)');
      orb3Grad.addColorStop(0.75, 'rgba(202, 138, 4, 0.3)');
      orb3Grad.addColorStop(1, 'rgba(202, 138, 4, 0)');
      offscreenCtx.fillStyle = orb3Grad;
      offscreenCtx.beginPath();
      offscreenCtx.arc(0.74 * w, 0.26 * h, r3, 0, Math.PI * 2);
      offscreenCtx.fill();

      // (D) Far-Right Lime/Citron Glow
      const r4 = Math.max(90, w * 0.14);
      const orb4Grad = offscreenCtx.createRadialGradient(0.92 * w, 0.08 * h, 0, 0.92 * w, 0.08 * h, r4);
      orb4Grad.addColorStop(0, 'rgba(190, 242, 100, 0.85)');
      orb4Grad.addColorStop(0.5, 'rgba(132, 204, 22, 0.45)');
      orb4Grad.addColorStop(1, 'rgba(132, 204, 22, 0)');
      offscreenCtx.fillStyle = orb4Grad;
      offscreenCtx.beginPath();
      offscreenCtx.arc(0.92 * w, 0.08 * h, r4, 0, Math.PI * 2);
      offscreenCtx.fill();

      // (E) Bottom-Left Warm Sun Edge Glow
      const r5 = Math.max(120, w * 0.16);
      const orb5Grad = offscreenCtx.createRadialGradient(0.04 * w, 0.62 * h, 0, 0.04 * w, 0.62 * h, r5);
      orb5Grad.addColorStop(0, 'rgba(254, 240, 138, 0.88)');
      orb5Grad.addColorStop(0.4, 'rgba(250, 204, 21, 0.55)');
      orb5Grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      offscreenCtx.fillStyle = orb5Grad;
      offscreenCtx.beginPath();
      offscreenCtx.arc(0.04 * w, 0.62 * h, r5, 0, Math.PI * 2);
      offscreenCtx.fill();

      offscreenCtx.restore();

      // 2. Mathematical Hyperbolic & Moiré Wireframe Mesh
      offscreenCtx.save();
      const maxDist = Math.max(w, h) * 1.35;

      // (A) Concentric elliptic shells
      for (let r = 18; r < maxDist; r += 14) {
        const rx = r * 1.45;
        const ry = r * 0.88;
        const factor = Math.max(0.03, (1 - r / maxDist) * 0.28);
        offscreenCtx.strokeStyle = `rgba(255, 255, 255, ${factor * intensity})`;
        offscreenCtx.lineWidth = 0.9;
        offscreenCtx.beginPath();
        offscreenCtx.ellipse(px, py, rx, ry, -0.12, 0, Math.PI * 2);
        offscreenCtx.stroke();
      }

      // (B) Radiating hyperbolic coordinate rays
      const totalRays = 40;
      for (let i = 0; i < totalRays; i++) {
        const angle = (i / totalRays) * Math.PI * 2;
        offscreenCtx.strokeStyle = `rgba(255, 255, 255, ${0.11 * intensity})`;
        offscreenCtx.lineWidth = 0.75;
        offscreenCtx.beginPath();
        offscreenCtx.moveTo(px, py);

        const rLength = Math.max(w, h) * 0.9;
        const curveAngle = angle + 0.35;
        const cpx = px + Math.cos(angle) * (rLength * 0.45);
        const cpy = py + Math.sin(angle) * (rLength * 0.45);
        const endX = px + Math.cos(curveAngle) * rLength;
        const endY = py + Math.sin(curveAngle) * rLength;

        offscreenCtx.quadraticCurveTo(cpx, cpy, endX, endY);
        offscreenCtx.stroke();
      }

      // (C) Sweeping flowing wave grid
      const numWaveLines = 18;
      for (let i = -numWaveLines / 2; i <= numWaveLines / 2; i++) {
        const offset = i * 8.5;
        const alpha = Math.max(0.04, 0.26 * (1 - Math.abs(i) / (numWaveLines / 2))) * intensity;
        offscreenCtx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        offscreenCtx.lineWidth = 0.85;
        offscreenCtx.beginPath();

        const xStep = Math.max(16, w / 40);
        for (let x = 0; x <= w + xStep; x += xStep) {
          const u = x / w;
          const waveElevation = Math.sin(u * 2.8 + 0.3) * (h * 0.18) + Math.pow(u, 1.8) * (h * 0.22);
          const y = (0.05 * h) + waveElevation + offset * (1 + u * 0.5);

          if (x === 0) {
            offscreenCtx.moveTo(x, y);
          } else {
            offscreenCtx.lineTo(x, y);
          }
        }
        offscreenCtx.stroke();
      }
      offscreenCtx.restore();

      // 3. Translucent Sweeping Ribbon Veil
      offscreenCtx.save();
      const ribbonSamples = 30;
      const topEdge = [];
      const botEdge = [];

      for (let i = 0; i <= ribbonSamples; i++) {
        const u = i / ribbonSamples;
        const x = u * w;
        const cy = (0.06 + 0.48 * Math.sin(u * 2.8 + 0.3) + 0.32 * Math.pow(u, 1.8)) * h;
        const thickness = (0.12 + Math.sin(u * 3.14) * 0.08) * h;
        topEdge.push({ x, y: cy - thickness });
        botEdge.push({ x, y: cy + thickness });
      }

      offscreenCtx.beginPath();
      offscreenCtx.moveTo(topEdge[0].x, topEdge[0].y);
      for (let i = 1; i < topEdge.length; i++) {
        offscreenCtx.lineTo(topEdge[i].x, topEdge[i].y);
      }
      for (let i = botEdge.length - 1; i >= 0; i--) {
        offscreenCtx.lineTo(botEdge[i].x, botEdge[i].y);
      }
      offscreenCtx.closePath();

      const ribbonGradient = offscreenCtx.createLinearGradient(0, 0, w, h);
      ribbonGradient.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      ribbonGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.16)');
      ribbonGradient.addColorStop(0.65, 'rgba(199, 210, 254, 0.14)');
      ribbonGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      offscreenCtx.fillStyle = ribbonGradient;
      offscreenCtx.fill();
      offscreenCtx.restore();

      // 4. Vortex Star Flare
      offscreenCtx.save();
      const focalGrad = offscreenCtx.createRadialGradient(px, py, 0, px, py, 50);
      focalGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      focalGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.7)');
      focalGrad.addColorStop(0.55, 'rgba(186, 230, 253, 0.35)');
      focalGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      offscreenCtx.fillStyle = focalGrad;
      offscreenCtx.beginPath();
      offscreenCtx.arc(px, py, 50, 0, Math.PI * 2);
      offscreenCtx.fill();

      offscreenCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      offscreenCtx.lineWidth = 1.75;
      offscreenCtx.beginPath();
      offscreenCtx.moveTo(px - 45, py);
      offscreenCtx.lineTo(px + 45, py);
      offscreenCtx.moveTo(px, py - 45);
      offscreenCtx.lineTo(px, py + 45);
      offscreenCtx.stroke();

      offscreenCtx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      offscreenCtx.lineWidth = 1;
      offscreenCtx.beginPath();
      offscreenCtx.moveTo(px - 22, py - 22);
      offscreenCtx.lineTo(px + 22, py + 22);
      offscreenCtx.moveTo(px + 22, py - 22);
      offscreenCtx.lineTo(px - 22, py + 22);
      offscreenCtx.stroke();
      offscreenCtx.restore();
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      renderStaticArtwork(width, height, dpr);
      initStardust(width, height);
      renderFrame();
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Scroll listener to pause rendering during active scrolling for 120fps smoothness
    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        if (isVisible && interactive) {
          scheduleNextFrame();
        }
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver to pause completely when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !isScrolling && interactive) {
            scheduleNextFrame();
          } else if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const renderFrame = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Blit pre-rendered static vector graphics layer instantly
      if (offscreenCanvas.width > 0) {
        ctx.drawImage(offscreenCanvas, 0, 0, width, height);
      }

      // Draw lightweight twinkling stardust
      ctx.save();
      for (let i = 0; i < stardust.length; i++) {
        const star = stardust[i];
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);
        const alpha = Math.max(0.12, Math.min(1.0, star.baseAlpha + twinkle * 0.35)) * intensity;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.size > 2.5 && alpha > 0.7) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(star.x - 4, star.y);
          ctx.lineTo(star.x + 4, star.y);
          ctx.moveTo(star.x, star.y - 4);
          ctx.lineTo(star.x, star.y + 4);
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const scheduleNextFrame = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (!isVisible || isScrolling || !interactive) return;

      animationFrameId = requestAnimationFrame(() => {
        renderFrame();
        scheduleNextFrame();
      });
    };

    scheduleNextFrame();

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, interactive]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ willChange: 'contents', contain: 'strict' }}
    >
      {/* 
        LAYER 1: Brilliant Multi-Stop CSS Celestial Field 
        Matches the exact royal/azure blue gradient with vibrant orbs
      */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: 'translateZ(0)',
          background: `
            radial-gradient(circle at 27% 22%, rgba(244, 63, 34, 0.98) 0%, rgba(234, 88, 12, 0.9) 24%, rgba(217, 32, 108, 0.6) 48%, transparent 68%),
            radial-gradient(circle at 75% 74%, rgba(238, 25, 25, 0.99) 0%, rgba(225, 29, 72, 0.92) 28%, rgba(249, 115, 22, 0.6) 52%, rgba(250, 204, 21, 0.25) 68%, transparent 76%),
            radial-gradient(circle at 74% 26%, rgba(253, 224, 71, 0.95) 0%, rgba(234, 179, 8, 0.8) 28%, rgba(202, 138, 4, 0.35) 54%, transparent 72%),
            radial-gradient(circle at 92% 8%, rgba(190, 242, 100, 0.92) 0%, rgba(132, 204, 22, 0.55) 26%, transparent 60%),
            radial-gradient(circle at 4% 62%, rgba(254, 240, 138, 0.9) 0%, rgba(250, 204, 21, 0.6) 24%, transparent 55%),
            radial-gradient(ellipse at 50% 32%, rgba(199, 210, 254, 0.45) 0%, rgba(147, 51, 234, 0.2) 36%, transparent 65%),
            linear-gradient(145deg, #0e387a 0%, #15519e 22%, #1d6ed8 50%, #2993ec 78%, #38bdf8 100%)
          `
        }}
      />

      {/* 
        LAYER 2: Hardware-Accelerated Canvas
        Uses offscreen caching and scroll-pause for butter-smooth 60/120fps scrolling.
      */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
        style={{ transform: 'translateZ(0)' }}
      />
    </div>
  );
}

export default SpectralBackground;
