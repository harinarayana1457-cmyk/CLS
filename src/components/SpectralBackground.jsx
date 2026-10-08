import React, { useEffect, useRef } from 'react';

/**
 * SpectralBackground:
 * 100% pure code mathematical reproduction of the reference artwork.
 * Zero external bitmap image files.
 *
 * Recreates:
 * 1. Deep royal & electric azure celestial sky.
 * 2. High-intensity fiery vermilion/coral nebula orb (top-left).
 * 3. Radiant bright scarlet red orb with golden solar corona (bottom-right).
 * 4. Glowing sun-yellow and lime halos (top-right & far-right).
 * 5. Focal pinch vortex at (17% X, 35% Y) with gleaming star flare.
 * 6. Mathematical hyperbolic radiating threads and curved wireframe mesh grid.
 * 7. Sweeping translucent S-curve flowing ribbon with longitudinal streamlines.
 * 8. Dense field of twinkling stardust dots & constellation nodes.
 */
export function SpectralBackground({ className = '', intensity = 1.0, interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let time = 0;

    // Seeded star particles to maintain stable positions across frames
    let stardust = [];

    const initStardust = (w, h) => {
      stardust = [];
      // Generate ribbon-following particles
      const ribbonCount = Math.min(650, Math.floor((w * h) / 1000));
      for (let i = 0; i < ribbonCount; i++) {
        const u = Math.random(); // 0 to 1 along horizontal span
        const x = u * w;
        
        // Ribbon centerline function
        const ribbonCenterY = (0.05 + 0.5 * Math.sin(u * 2.8 + 0.3) + 0.35 * Math.pow(u, 1.8)) * h;
        // Spread along ribbon width
        const spread = (Math.random() - 0.5) * (h * 0.28);
        const y = ribbonCenterY + spread;

        const size = Math.random() < 0.45 ? 0.8 : Math.random() < 0.8 ? 1.4 : Math.random() < 0.96 ? 2.2 : 3.4;
        const baseAlpha = 0.35 + Math.random() * 0.65;
        const twinkleSpeed = 0.6 + Math.random() * 1.8;
        const phase = Math.random() * Math.PI * 2;

        stardust.push({ x, y, size, baseAlpha, twinkleSpeed, phase, isRibbon: true });
      }

      // Generate celestial space field stars
      const fieldCount = Math.min(400, Math.floor((w * h) / 1800));
      for (let i = 0; i < fieldCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = Math.random() < 0.6 ? 0.7 : Math.random() < 0.9 ? 1.2 : 2.0;
        const baseAlpha = 0.2 + Math.random() * 0.6;
        const twinkleSpeed = 0.4 + Math.random() * 1.2;
        const phase = Math.random() * Math.PI * 2;

        stardust.push({ x, y, size, baseAlpha, twinkleSpeed, phase, isRibbon: false });
      }
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
      initStardust(width, height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const px = 0.17 * width; // Pinch focal X
      const py = 0.35 * height; // Pinch focal Y

      // =========================================================================
      // 1. CANVAS GLOW PASS: Radiant Color Orbs (Reinforcing the CSS backdrop)
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // (A) Top-Left Fiery Vermilion / Magenta Nebula Orb
      const r1 = Math.max(140, width * 0.22);
      const orb1Grad = ctx.createRadialGradient(0.27 * width, 0.22 * height, 0, 0.27 * width, 0.22 * height, r1);
      orb1Grad.addColorStop(0, 'rgba(244, 63, 34, 0.95)');
      orb1Grad.addColorStop(0.3, 'rgba(234, 88, 12, 0.85)');
      orb1Grad.addColorStop(0.6, 'rgba(217, 32, 108, 0.65)');
      orb1Grad.addColorStop(0.85, 'rgba(168, 85, 247, 0.25)');
      orb1Grad.addColorStop(1, 'rgba(147, 51, 234, 0)');
      ctx.fillStyle = orb1Grad;
      ctx.beginPath();
      ctx.arc(0.27 * width, 0.22 * height, r1, 0, Math.PI * 2);
      ctx.fill();

      // (B) Bottom-Right Scarlet Red Orb with Warm Gold Halo
      const r2 = Math.max(180, width * 0.26);
      const orb2Grad = ctx.createRadialGradient(0.75 * width, 0.74 * height, 0, 0.75 * width, 0.74 * height, r2);
      orb2Grad.addColorStop(0, 'rgba(238, 25, 25, 0.98)');
      orb2Grad.addColorStop(0.35, 'rgba(225, 29, 72, 0.88)');
      orb2Grad.addColorStop(0.65, 'rgba(249, 115, 22, 0.6)');
      orb2Grad.addColorStop(0.88, 'rgba(250, 204, 21, 0.3)');
      orb2Grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = orb2Grad;
      ctx.beginPath();
      ctx.arc(0.75 * width, 0.74 * height, r2, 0, Math.PI * 2);
      ctx.fill();

      // (C) Top-Right Radiant Sunshine Yellow Glow
      const r3 = Math.max(110, width * 0.18);
      const orb3Grad = ctx.createRadialGradient(0.74 * width, 0.26 * height, 0, 0.74 * width, 0.26 * height, r3);
      orb3Grad.addColorStop(0, 'rgba(253, 224, 71, 0.92)');
      orb3Grad.addColorStop(0.4, 'rgba(234, 179, 8, 0.75)');
      orb3Grad.addColorStop(0.75, 'rgba(202, 138, 4, 0.3)');
      orb3Grad.addColorStop(1, 'rgba(202, 138, 4, 0)');
      ctx.fillStyle = orb3Grad;
      ctx.beginPath();
      ctx.arc(0.74 * width, 0.26 * height, r3, 0, Math.PI * 2);
      ctx.fill();

      // (D) Far-Right Lime/Citron Glow
      const r4 = Math.max(90, width * 0.14);
      const orb4Grad = ctx.createRadialGradient(0.92 * width, 0.08 * height, 0, 0.92 * width, 0.08 * height, r4);
      orb4Grad.addColorStop(0, 'rgba(190, 242, 100, 0.85)');
      orb4Grad.addColorStop(0.5, 'rgba(132, 204, 22, 0.45)');
      orb4Grad.addColorStop(1, 'rgba(132, 204, 22, 0)');
      ctx.fillStyle = orb4Grad;
      ctx.beginPath();
      ctx.arc(0.92 * width, 0.08 * height, r4, 0, Math.PI * 2);
      ctx.fill();

      // (E) Bottom-Left Warm Sun Edge Glow
      const r5 = Math.max(120, width * 0.16);
      const orb5Grad = ctx.createRadialGradient(0.04 * width, 0.62 * height, 0, 0.04 * width, 0.62 * height, r5);
      orb5Grad.addColorStop(0, 'rgba(254, 240, 138, 0.88)');
      orb5Grad.addColorStop(0.4, 'rgba(250, 204, 21, 0.55)');
      orb5Grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = orb5Grad;
      ctx.beginPath();
      ctx.arc(0.04 * width, 0.62 * height, r5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // =========================================================================
      // 2. MATHEMATICAL HYPERBOLIC & MOIRÉ WIREFRAME MESH
      // Concentric curved lines expanding from the vortex pinch
      // =========================================================================
      ctx.save();
      const maxDist = Math.max(width, height) * 1.35;

      // (A) Concentric elliptic shells radiating outward
      for (let r = 16; r < maxDist; r += 12) {
        const rx = r * 1.45;
        const ry = r * 0.88;
        // Subtle fade as radius grows
        const factor = Math.max(0.03, (1 - r / maxDist) * 0.28);

        ctx.strokeStyle = `rgba(255, 255, 255, ${factor * intensity})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.ellipse(px, py, rx, ry, -0.12, 0, Math.PI * 2);
        ctx.stroke();
      }

      // (B) Radiating hyperbolic coordinate rays emanating from the vortex pinch
      const totalRays = 48;
      for (let i = 0; i < totalRays; i++) {
        const angle = (i / totalRays) * Math.PI * 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * intensity})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(px, py);

        const rLength = Math.max(width, height) * 0.9;
        // Gentle logarithmic spiral bend
        const curveAngle = angle + 0.35;
        const cpx = px + Math.cos(angle) * (rLength * 0.45);
        const cpy = py + Math.sin(angle) * (rLength * 0.45);
        const endX = px + Math.cos(curveAngle) * rLength;
        const endY = py + Math.sin(curveAngle) * rLength;

        ctx.quadraticCurveTo(cpx, cpy, endX, endY);
        ctx.stroke();
      }

      // (C) Sweeping longitudinal flowing wave grid (moiré fabric lines)
      const numWaveLines = 24;
      for (let i = -numWaveLines / 2; i <= numWaveLines / 2; i++) {
        const offset = i * 7.5;
        const alpha = Math.max(0.04, 0.28 * (1 - Math.abs(i) / (numWaveLines / 2))) * intensity;

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 0.85;
        ctx.beginPath();

        const xStep = Math.max(12, width / 55);
        for (let x = 0; x <= width + xStep; x += xStep) {
          const u = x / width;
          // Organic mathematical wave profile
          const waveElevation = Math.sin(u * 2.8 + 0.3) * (height * 0.18) + Math.pow(u, 1.8) * (height * 0.22);
          const breathing = Math.sin(time * 0.5 + u * 3) * 3;
          const y = (0.05 * height) + waveElevation + offset * (1 + u * 0.5) + breathing;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      ctx.restore();

      // =========================================================================
      // 3. TRANSLUCENT SWEEPING S-CURVE FLOWING RIBBON VEIL
      // =========================================================================
      ctx.save();
      const ribbonSamples = 40;
      const topEdge = [];
      const botEdge = [];

      for (let i = 0; i <= ribbonSamples; i++) {
        const u = i / ribbonSamples;
        const x = u * width;
        const cy = (0.06 + 0.48 * Math.sin(u * 2.8 + 0.3) + 0.32 * Math.pow(u, 1.8)) * height;
        const thickness = (0.12 + Math.sin(u * 3.14) * 0.08) * height;

        topEdge.push({ x, y: cy - thickness });
        botEdge.push({ x, y: cy + thickness });
      }

      ctx.beginPath();
      ctx.moveTo(topEdge[0].x, topEdge[0].y);
      for (let i = 1; i < topEdge.length; i++) {
        ctx.lineTo(topEdge[i].x, topEdge[i].y);
      }
      for (let i = botEdge.length - 1; i >= 0; i--) {
        ctx.lineTo(botEdge[i].x, botEdge[i].y);
      }
      ctx.closePath();

      const ribbonGradient = ctx.createLinearGradient(0, 0, width, height);
      ribbonGradient.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      ribbonGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.16)');
      ribbonGradient.addColorStop(0.65, 'rgba(199, 210, 254, 0.14)');
      ribbonGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      ctx.fillStyle = ribbonGradient;
      ctx.fill();
      ctx.restore();

      // =========================================================================
      // 4. VORTEX PINCH STAR FLARE (AT X: 17%, Y: 35%)
      // =========================================================================
      ctx.save();
      const focalGrad = ctx.createRadialGradient(px, py, 0, px, py, 50);
      focalGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      focalGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.7)');
      focalGrad.addColorStop(0.55, 'rgba(186, 230, 253, 0.35)');
      focalGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = focalGrad;
      ctx.beginPath();
      ctx.arc(px, py, 50, 0, Math.PI * 2);
      ctx.fill();

      // Cross Star Flare Rays
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 1.75;
      ctx.beginPath();
      ctx.moveTo(px - 45, py);
      ctx.lineTo(px + 45, py);
      ctx.moveTo(px, py - 45);
      ctx.lineTo(px, py + 45);
      ctx.stroke();

      // Diagonal Glint Rays
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px - 22, py - 22);
      ctx.lineTo(px + 22, py + 22);
      ctx.moveTo(px + 22, py - 22);
      ctx.lineTo(px - 22, py + 22);
      ctx.stroke();
      ctx.restore();

      // =========================================================================
      // 5. STARDUST & CONSTELLATION NODES
      // =========================================================================
      ctx.save();
      for (let i = 0; i < stardust.length; i++) {
        const star = stardust[i];
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);
        const alpha = Math.max(0.12, Math.min(1.0, star.baseAlpha + twinkle * 0.35)) * intensity;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra 4-point sparkle for larger stars
        if (star.size > 2.6 && alpha > 0.65) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(star.x - 5, star.y);
          ctx.lineTo(star.x + 5, star.y);
          ctx.moveTo(star.x, star.y - 5);
          ctx.lineTo(star.x, star.y + 5);
          ctx.stroke();
        }
      }
      ctx.restore();

      if (interactive) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [intensity, interactive]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
      {/* 
        LAYER 1: Brilliant Multi-Stop CSS Celestial Field 
        Matches the exact royal/azure blue gradient with vibrant orbs:
        - Azure & Royal Blue Sky base (#0f387a -> #1d6ed8 -> #38bdf8)
        - Top-left fiery vermilion orb (circle at 27% 22%)
        - Bottom-right scarlet orb (circle at 75% 74%)
        - Top-right solar yellow & lime aura (circle at 74% 26% and 92% 8%)
        - Bottom-left solar gold aura (circle at 4% 62%)
      */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
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
        LAYER 2: Mathematical Canvas Vector & Mesh Layer
        Draws the vortex pinch, star flare, concentric hyperbolic moiré lines,
        the flowing ribbon veil, and thousands of twinkling stardust nodes.
      */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}

export default SpectralBackground;
