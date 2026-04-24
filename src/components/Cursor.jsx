import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

const lerp = (a, b, t) => a + (b - a) * t;

const Cursor = () => {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const mouse    = useRef({ x: -200, y: -200 });
  const ringPos  = useRef({ x: -200, y: -200 });
  const raf      = useRef(null);
  const hasMoved = useRef(false);

  // All visibility/hover driven by React state — no imperative class writes
  const [visible, setVisible] = useState(false);
  const [hover, setHover]     = useState(false);
  const [label, setLabel]     = useState('');
  const [isLight, setIsLight] = useState(false);
  
  const hoverRef = useRef(false);
  const labelRef = useRef('');

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Detect if cursor is over a section marked as light
      const isOverLight = e.target?.closest ? !!e.target.closest('[data-nav-light]') : false;
      setIsLight(isOverLight);

      if (!hasMoved.current) {
        ringPos.current = { x: e.clientX, y: e.clientY };
        hasMoved.current = true;
        setVisible(true);
      }
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      const newHover = !!el;
      const newLabel = el?.dataset.cursor ?? '';
      if (newHover !== hoverRef.current) { hoverRef.current = newHover; setHover(newHover); }
      if (newLabel !== labelRef.current) { labelRef.current = newLabel; setLabel(newLabel); }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);

    // High-frequency RAF loop — only updates transform, not class/state
    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.14);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%))`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%))`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const dotCls  = ['cursor-dot',  !visible && 'is-hidden', hover && 'is-hover', label && 'has-label', isLight && 'is-light'].filter(Boolean).join(' ');
  const ringCls = ['cursor-ring', !visible && 'is-hidden', hover && 'is-hover', isLight && 'is-light'].filter(Boolean).join(' ');

  return (
    <>
      <div ref={dotRef} className={dotCls}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div ref={ringRef} className={ringCls} />
    </>
  );
};

export default Cursor;
