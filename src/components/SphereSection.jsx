import { useRef, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import './SphereSection.css';

/* ─── Particle build ───────────────────────────────────────── */
const COUNT = 800;

// Fibonacci sphere — evenly distributed surface points
function fibSphere(n) {
  const pts = [];
  const g = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / n);
    const theta = 2 * Math.PI * i / g;
    pts.push([
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi),
    ]);
  }
  return pts;
}

// Scattered state — wide radial eruption (matches the reference screenshots)
function scatterPts(n) {
  return Array.from({ length: n }, () => {
    const a  = Math.random() * Math.PI * 2;
    const el = (Math.random() - 0.5) * Math.PI * 0.6; // mostly horizontal spread
    const r  = 1.8 + Math.random() * 2.2;              // far from center
    return [
      Math.cos(el) * Math.cos(a) * r,
      Math.sin(el) * r,
      Math.cos(el) * Math.sin(a) * r,
    ];
  });
}

// Per-particle color — violet → sky → lime spectrum
function buildColors(n) {
  return Array.from({ length: n }, () => {
    const t = Math.random();
    if (t < 0.55) return [155 + Math.random() * 20, 127 + Math.random() * 30, 232];   // violet
    if (t < 0.80) return [77  + Math.random() * 20, 184 + Math.random() * 20, 255];   // sky
    return             [181, 242, 58 + Math.random() * 30];                            // lime
  });
}

const SPHERE   = fibSphere(COUNT);
const SCATTER  = scatterPts(COUNT);
const COLORS   = buildColors(COUNT);

const ease = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;

/* ─── Component ────────────────────────────────────────────── */
const SphereSection = () => {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const progRef    = useRef(0);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end end'],
  });

  // Map raw 0→1 scroll through phases:
  // 0.0 → 0.5: particles converge into sphere
  // 0.5 → 0.8: sphere holds + spins
  // 0.8 → 1.0: sphere dissipates
  const morphProgress = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  useEffect(() => {
    return morphProgress.on('change', v => { progRef.current = v; });
  }, [morphProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, R, CX, CY, dpr;
    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W   = canvas.offsetWidth;
      H   = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      R   = Math.min(W, H) * 0.36;
      CX  = W * 0.5;
      CY  = H * 0.5;
    };
    setup();

    const ro = new ResizeObserver(setup);
    ro.observe(canvas);

    let rotY = 0;
    let rotX = 0.15; // slight tilt
    let last = performance.now();
    let raf;

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      rotY += dt * 0.28;

      const t  = ease(Math.min(1, Math.max(0, progRef.current)));
      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      const cx = Math.cos(rotX), sx = Math.sin(rotX);
      const FOV = 900;

      ctx.clearRect(0, 0, W, H);

      /* Glow behind sphere — grows as sphere forms */
      if (t > 0.1) {
        const gR = R * (0.7 + t * 0.5);
        const g  = ctx.createRadialGradient(CX, CY, 0, CX, CY, gR);
        g.addColorStop(0,   `rgba(155,127,232,${t * 0.18})`);
        g.addColorStop(0.5, `rgba(77,184,255,${t * 0.07})`);
        g.addColorStop(1,   'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(CX, CY, gR, 0, Math.PI * 2);
        ctx.fill();
      }

      /* Build + project particles */
      const pts = [];
      for (let i = 0; i < COUNT; i++) {
        const sp = SPHERE[i];
        const sc = SCATTER[i];

        // Lerp scatter → sphere
        const x0 = sp[0] * t + sc[0] * (1 - t);
        const y0 = sp[1] * t + sc[1] * (1 - t);
        const z0 = sp[2] * t + sc[2] * (1 - t);

        // X tilt
        const x1 = x0;
        const y1 = y0 * cx - z0 * sx;
        const z1 = y0 * sx + z0 * cx;

        // Y rotation
        const x2 =  x1 * cy + z1 * sy;
        const y2 =  y1;
        const z2 = -x1 * sy + z1 * cy;

        // Perspective
        const scale = FOV / (FOV + z2 * R);
        const px    = CX + x2 * R * scale;
        const py    = CY + y2 * R * scale;
        const depth = (z2 + 1.5) / 2.5;  // 0..1

        pts.push({ px, py, depth, z: z2, ci: i });
      }

      // Painter's sort
      pts.sort((a, b) => a.z - b.z);

      for (const p of pts) {
        const [r, g, b] = COLORS[p.ci];
        const alpha = (0.08 + p.depth * 0.72) * (0.25 + t * 0.75);
        const size  = (0.5 + p.depth * 1.6) * (0.4 + t * 0.6);

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.3, size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <section className="sphere-section" ref={sectionRef}>
      {/* Sticky viewport */}
      <div className="sphere-sticky">
        <canvas ref={canvasRef} className="sphere-canvas" />

        {/* Ambient label */}
        <div className="sphere-label">
          <span className="sphere-label-line" />
          <span className="sphere-label-txt">[ Intelligent Systems ]</span>
        </div>
      </div>
    </section>
  );
};

export default SphereSection;
