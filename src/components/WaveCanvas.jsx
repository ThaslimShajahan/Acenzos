import React, { useEffect, useRef } from 'react';

/**
 * WaveCanvas — Perspective particle wave
 * Accepts `light` prop — renders on white bg with dark-tinted wave
 */
const WaveCanvas = ({ light = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let W = 0, H = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();

    const COLS = 90;
    const ROWS = 44;
    const HORIZON_F = 0.54;
    const NEAR_F    = 0.99;
    let time = 0;

    /* Stars — only on dark mode */
    const stars = light ? [] : Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random() * 0.60,
      r: Math.random() * 0.9 + 0.2,
      alpha: Math.random() * 0.55 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpd: 0.004 + Math.random() * 0.012,
    }));

    const tick = () => {
      W = canvas.parentElement?.clientWidth  || window.innerWidth;
      H = canvas.parentElement?.clientHeight || window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      /* Background — transparent on light, dark on dark */
      if (!light) {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        bgGrad.addColorStop(0,   '#050509');
        bgGrad.addColorStop(0.5, '#060614');
        bgGrad.addColorStop(1,   '#08081c');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);
      }

      time += 0.016;

      /* Stars */
      stars.forEach(s => {
        s.twinkle += s.twinkleSpd;
        const a = s.alpha * (0.55 + 0.45 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 220, 255, ${a})`;
        ctx.fill();
      });

      /* Build grid */
      const horizonY = H * HORIZON_F;
      const nearY    = H * NEAR_F;
      const viewH    = nearY - horizonY;
      const pts = [];

      for (let r = 0; r < ROWS; r++) {
        const t    = r / (ROWS - 1);
        const tExp = Math.pow(t, 1.55);
        const baseY   = horizonY + tExp * viewH;
        const xSpread = W * (0.35 + tExp * 1.1);
        const xOffset = (W - xSpread) / 2;
        const row = [];
        for (let c = 0; c < COLS; c++) {
          const cf = c / (COLS - 1);
          const x  = xOffset + cf * xSpread;
          const amp1 = 88 * tExp; const freq1 = 0.072; const spd1 = 1.45;
          const amp2 = 36 * tExp; const freq2 = 0.115; const spd2 = 0.88;
          const amp3 = 20 * tExp; const freq3 = 0.038; const spd3 = 1.90;
          const w1 = Math.sin(c * freq1 - time * spd1) * amp1;
          const w2 = Math.sin(c * freq2 - time * spd2 + 1.4) * amp2;
          const w3 = Math.sin(c * freq3 - time * spd3 + 2.9) * amp3;
          const waveY   = w1 + w2 + w3;
          const y       = baseY + waveY;
          const maxAmp  = amp1 + amp2 + amp3;
          const intensity = maxAmp > 0
            ? Math.max(0, Math.min(1, (waveY + maxAmp) / (2 * maxAmp)))
            : 0.5;
          row.push({ x, y, intensity, t, tExp });
        }
        pts.push(row);
      }

      /* Horizontal lines */
      for (let r = 0; r < ROWS; r++) {
        const row   = pts[r];
        const tVal  = row[0].t;
        const alpha = light
          ? 0.025 + tVal * 0.065
          : 0.025 + tVal * 0.09;
        ctx.beginPath();
        for (let c = 0; c < COLS - 1; c++) {
          ctx.moveTo(row[c].x, row[c].y);
          ctx.lineTo(row[c + 1].x, row[c + 1].y);
        }
        ctx.strokeStyle = light
          ? `rgba(40, 60, 140, ${alpha})`
          : `rgba(70, 110, 255, ${alpha})`;
        ctx.lineWidth   = 0.35 + tVal * 0.75;
        ctx.stroke();
      }

      /* Vertical lines */
      for (let c = 0; c < COLS; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < ROWS - 1; r++) {
          ctx.moveTo(pts[r][c].x, pts[r][c].y);
          ctx.lineTo(pts[r+1][c].x, pts[r+1][c].y);
        }
        ctx.strokeStyle = light
          ? 'rgba(30, 50, 160, 0.025)'
          : 'rgba(60, 90, 220, 0.035)';
        ctx.lineWidth = 0.35;
        ctx.stroke();
      }

      /* Particles */
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const p = pts[r][c];
          if (p.intensity < 0.08) continue;
          const sz    = 0.35 + p.tExp * 2.0 * p.intensity;
          const alpha = 0.07 + p.tExp * p.intensity * (light ? 0.55 : 0.82);
          let fillStyle;
          if (light) {
            const rv = Math.round(20  + p.intensity * 50);
            const gv = Math.round(40  + p.intensity * 60);
            const bv = Math.round(180 + p.intensity * 75);
            fillStyle = `rgba(${rv},${gv},${bv},${alpha})`;
          } else {
            const rv = Math.round(110 + p.intensity * 145);
            const gv = Math.round(135 + p.intensity * 110);
            fillStyle = `rgba(${rv},${gv},255,${alpha})`;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
          ctx.fillStyle = fillStyle;
          ctx.fill();

          /* Glow at bright peaks */
          if (p.intensity > 0.72 && p.tExp > 0.25) {
            const glowR = sz * 5 + p.intensity * 10;
            const glowA = (p.intensity - 0.72) * 3.0 * p.tExp;
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
            if (light) {
              grd.addColorStop(0,   `rgba(60,100,255,${glowA * 0.55})`);
              grd.addColorStop(1,   'rgba(60,100,255,0)');
            } else {
              grd.addColorStop(0,   `rgba(255,255,255,${glowA * 0.95})`);
              grd.addColorStop(0.3, `rgba(160,195,255,${glowA * 0.55})`);
              grd.addColorStop(1,   'rgba(80,130,255,0)');
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }
        }
      }

      /* Bottom fade — matches bg */
      const bf = ctx.createLinearGradient(0, H * 0.78, 0, H);
      if (light) {
        bf.addColorStop(0, 'rgba(234,234,238,0)');
        bf.addColorStop(1, 'rgba(234,234,238,1)');
      } else {
        bf.addColorStop(0, 'rgba(6,6,10,0)');
        bf.addColorStop(1, 'rgba(6,6,10,1)');
      }
      ctx.fillStyle = bf;
      ctx.fillRect(0, H * 0.78, W, H * 0.22);

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [light]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', display: 'block' }}
    />
  );
};

export default WaveCanvas;
