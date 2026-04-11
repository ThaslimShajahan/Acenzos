import React, { useEffect, useRef } from 'react';

const KineticMesh = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    
    let W = window.innerWidth;
    let H = window.innerHeight;
    const dpr = () => window.devicePixelRatio || 1;

    let pointer = { x: -1000, y: -1000, radius: 250 };
    
    const handleMouseMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const handleMouseLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const d = dpr();
      canvas.width  = W * d; 
      canvas.height = H * d;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(d, 0, 0, d, 0, 0);
      initGrid();
    };

    // Physics constants
    const SPACING = 65; // Grid spacing
    const SPRING  = 0.04;
    const FRICTION = 0.75;
    const REPEL_MULTIPLIER = 4;

    class Point {
      constructor(cx, cy) {
        this.baseX = cx;
        this.baseY = cy;
        this.x = cx;
        this.y = cy;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // Scroll offset compensation
        // We want the grid to scroll up with the page, so we shift baseY logically
        // However, an infinite interactive background is often fixed. 
        // Let's keep the home positions fixed relative to screen for a cleaner effect,
        // or shift them. We'll shift the perceived pointer position by scroll instead.
        
        let targetX = this.baseX;
        let targetY = this.baseY;

        // Force to return home
        let pushX = (targetX - this.x) * SPRING;
        let pushY = (targetY - this.y) * SPRING;

        // Mouse repulsion
        let dx = this.x - pointer.x;
        let dy = this.y - pointer.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pointer.radius && dist > 0) {
          // quadratic falloff for smoother push
          let force = (pointer.radius - dist) / pointer.radius;
          let push = force * force * REPEL_MULTIPLIER;
          pushX += (dx / dist) * push;
          pushY += (dy / dist) * push;
        }

        this.vx += pushX;
        this.vy += pushY;
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        // size varies slightly based on velocity to give speed blur feel
        let speed = Math.abs(this.vx) + Math.abs(this.vy);
        let radius = 1.2 + Math.min(speed * 0.15, 2.5);
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        
        // Darker near cursor, lighter far away
        let dx = this.x - pointer.x;
        let dy = this.y - pointer.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = dist < pointer.radius ? 0.45 : 0.15;
        
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fill();
      }
    }

    let grid = [];
    let cols = 0;
    let rows = 0;

    const initGrid = () => {
      grid = [];
      // create points with a slight margin outside the screen
      cols = Math.ceil(W / SPACING) + 2;
      rows = Math.ceil(H / SPACING) + 2;
      
      const startX = (W - (cols - 1) * SPACING) / 2;
      const startY = (H - (rows - 1) * SPACING) / 2;

      for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
          grid[i][j] = new Point(startX + i * SPACING, startY + j * SPACING);
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const drawLines = () => {
      ctx.beginPath();
      // Only draw lines if points are close to their neigbors
      ctx.strokeStyle = 'rgba(0,0,0,0.04)';
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let p = grid[i][j];
          // Connect to right neighbor
          if (i < cols - 1) {
            let right = grid[i + 1][j];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(right.x, right.y);
          }
          // Connect to bottom neighbor
          if (j < rows - 1) {
            let bottom = grid[i][j + 1];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(bottom.x, bottom.y);
          }
        }
      }
      ctx.stroke();
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].update();
        }
      }

      drawLines();

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].draw();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return <canvas className="hero-canvas" ref={canvasRef} />;
};

export default KineticMesh;
