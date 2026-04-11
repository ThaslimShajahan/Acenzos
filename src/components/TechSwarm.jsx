import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import { droneStore } from '../droneStore';
import './TechSwarm.css';

useGLTF.preload('/3d-asset/drone.glb');

// ─────────────────────────────────────────────────────────────────────────────
// SMOOTH SPLINE PATH
// ─────────────────────────────────────────────────────────────────────────────
const buildSpline = (cfg) =>
  new THREE.CatmullRomCurve3([
    new THREE.Vector3( cfg.startX,  cfg.startY,  0.0),  // 0.0  Hero
    new THREE.Vector3( 3.2,         1.0,          3.5),  // 0.2  Banking right
    new THREE.Vector3( 5.5,         2.0,          7.0),  // 0.35 Off screen right
    new THREE.Vector3(-5.5,         2.5,         -7.0),  // 0.55 Deep background crossing
    new THREE.Vector3(-3.8,         0.3,         -3.5),  // 0.7  Re-entering from left
    new THREE.Vector3( 0.0,        -0.8,          2.0),  // 0.85 Approaching footer
    new THREE.Vector3( 0.0,        -1.0,          2.5),  // 1.0  Footer center
  ], false, 'catmullrom', 0.5);

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSIVE CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const getConfig = (width) => {
  if (width < 480) {
    return { scale: 0.12, fov: 60, startX: 0.8,  startY: 0.6,  trackRange: { y: Math.PI/4,   x: Math.PI/6 } };
  } else if (width < 768) {
    return { scale: 0.16, fov: 55, startX: 1.2,  startY: 0.7,  trackRange: { y: Math.PI/3.5, x: Math.PI/5.5 } };
  } else if (width < 1200) {
    return { scale: 0.20, fov: 50, startX: 1.5,  startY: 0.8,  trackRange: { y: Math.PI/3.2, x: Math.PI/5 } };
  } else {
    return { scale: 0.25, fov: 45, startX: 1.8,  startY: 0.8,  trackRange: { y: Math.PI/3.5, x: Math.PI/5 } };
  }
};

const CameraRig = ({ fov }) => {
  const { camera } = useThree();
  useEffect(() => { camera.fov = fov; camera.updateProjectionMatrix(); }, [camera, fov]);
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// DRONE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Drone = ({ scrollYProgress, cfg }) => {
  const { scene } = useGLTF('/3d-asset/drone.glb');
  const droneRef  = useRef();
  const spline    = useRef(buildSpline(cfg));

  useEffect(() => { spline.current = buildSpline(cfg); }, [cfg]);

  // Spring physics state for position
  const physPos  = useRef(new THREE.Vector3(cfg.startX, cfg.startY, 0));
  const physVel  = useRef(new THREE.Vector3(0, 0, 0));

  // Current rotation state
  const curRotY = useRef(-Math.PI / 5);
  const curRotX = useRef(0.1);
  const curRotZ = useRef(0);

  const _target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!droneRef.current) return;

    const dt = Math.min(delta, 0.05); // Clamp dt to prevent physics explosions
    const s  = THREE.MathUtils.clamp(scrollYProgress.get(), 0, 0.9999);
    const t  = state.clock.elapsedTime;

    // 1. GET SPLINE POSITION
    spline.current.getPoint(s, _target.current);

    // ── ORGANIC WIND DRIFT (Pseudo-random non-repeating noise) ──
    // Uses irrational prime frequencies so the pattern never feels robotic or predictable
    const windX = (Math.sin(t * 0.83) + 0.5 * Math.sin(t * 1.41) + 0.25 * Math.sin(t * 3.17)) * 0.15;
    const windY = (Math.cos(t * 1.13) + 0.5 * Math.sin(t * 2.71) + 0.3 * Math.cos(t * 4.33)) * 0.15;
    const windZ = (Math.sin(t * 0.97) + 0.5 * Math.cos(t * 1.83) + 0.2 * Math.sin(t * 2.91)) * 0.15;

    // Apply wind directly to the target so the spring physics naturally fights and smooths it out!
    _target.current.x += windX;
    _target.current.y += windY;
    _target.current.z += windZ;

    // 2. CAPABILITIES SECTION INTERCEPT
    const { capActiveIndex, capSectionVisible } = droneStore;
    const capMode = capSectionVisible;

    if (capMode) {
      const rowYOffsets = [0.6, 0.2, -0.2, -0.6];
      const targetRowY  = capActiveIndex >= 0 ? rowYOffsets[capActiveIndex] : 0;
      // Also apply some wind to the hover mode so it feels alive
      _target.current.set(-2.6 + (windX * 0.5), targetRowY + (windY * 0.5), 0.8 + (windZ * 0.5));
    }

    // 3. APPLY POSITION SPRING PHYSICS (Smooth movement)
    // Reduce stiffness slightly so the drone floats and drifts more organically
    const K = capMode ? 4.0 : 2.5;   // Stiffness
    const B = capMode ? 0.95 : 0.82; // Damping
    physVel.current.x += (K * (_target.current.x - physPos.current.x) - B * physVel.current.x) * dt;
    physVel.current.y += (K * (_target.current.y - physPos.current.y) - B * physVel.current.y) * dt;
    physVel.current.z += (K * (_target.current.z - physPos.current.z) - B * physVel.current.z) * dt;
    
    physPos.current.x += physVel.current.x * dt;
    physPos.current.y += physVel.current.y * dt;
    physPos.current.z += physVel.current.z * dt;

    // 4. MANUAL HARDCODED MULTI-PHASE ROTATION (100% stable, no 180-flips)
    let trY, trX, trZ;

    if (capMode) {
      // Sentinel mode — facing slightly right, completely stable
      trY = Math.PI / 6;
      trX = 0.08;
      trZ = 0.02;
    } else if (s < 0.35) {
      // Phase 1: Takes off, turns right to fly off screen
      const p = s / 0.35;
      trY = THREE.MathUtils.lerp(-Math.PI / 5, -Math.PI / 2, p);
      trX = THREE.MathUtils.lerp(0.1, 0.2, p);
      trZ = THREE.MathUtils.lerp(0, -Math.PI / 8, p); // Banks right
    } else if (s < 0.55) {
      // Phase 2: Crossing background
      trY = -Math.PI / 2.5; // Stays facing somewhat right while moving background
      trX = 0.15;
      trZ = 0;
    } else if (s < 0.85) {
      // Phase 3: Returning from left 
      const p = (s - 0.55) / 0.3;
      trY = THREE.MathUtils.lerp(Math.PI / 3, 0, p); // Sweeps back to front
      trX = THREE.MathUtils.lerp(0.15, 0.05, p);
      trZ = THREE.MathUtils.lerp(Math.PI / 8, 0, p); // Banks left while curving in
    } else {
      // Phase 4: Footer
      trY = 0;
      trX = 0.05;
      trZ = 0;
    }

    // 5. FOOTER POINTER TRACKING
    if (!capMode && s > 0.88) {
      const blend = THREE.MathUtils.clamp((s - 0.88) / 0.12, 0, 1);
      const pointer = state.pointer;
      const lookY = pointer.x * cfg.trackRange.y;
      const lookX = -pointer.y * cfg.trackRange.x + 0.1;
      
      trY = THREE.MathUtils.lerp(trY, lookY, blend);
      trX = THREE.MathUtils.lerp(trX, lookX, blend);
      trZ = THREE.MathUtils.lerp(trZ, 0, blend);
    }

    // 6. SPRING EULER INTERPOLATION (Butter smooth turning)
    // We strictly use lerp to prevent any gimbal flips
    const rotLerp = 1 - Math.pow(0.001, dt * 4);
    curRotY.current = THREE.MathUtils.lerp(curRotY.current, trY, rotLerp);
    curRotX.current = THREE.MathUtils.lerp(curRotX.current, trX, rotLerp);
    curRotZ.current = THREE.MathUtils.lerp(curRotZ.current, trZ, rotLerp);

    // 7. ORGANIC ROTATION WOBBLE (Micro-stuttering & gyro balancing)
    // This creates the unpredictable, natural feel of a real drone fighting air currents
    const speed = physVel.current.length();
    const flightIntensity = THREE.MathUtils.clamp(speed * 0.5, 0.3, 1.2); // Wobbles more when moving fast
    const wobblePitch = (Math.cos(t * 3.1) + 0.4 * Math.sin(t * 5.4)) * 0.015 * flightIntensity;
    const wobbleRoll  = (Math.sin(t * 2.8) + 0.5 * Math.sin(t * 6.1)) * 0.02 * flightIntensity;
    const wobbleYaw   = (Math.sin(t * 1.9) + 0.3 * Math.cos(t * 4.7)) * 0.01 * flightIntensity;

    // 8. APPLY EVERYTHING
    droneRef.current.position.set(
      physPos.current.x,
      physPos.current.y,
      physPos.current.z
    );
    droneRef.current.rotation.set(
      curRotX.current + wobblePitch,
      curRotY.current + wobbleYaw,
      curRotZ.current + wobbleRoll,
      'YXZ'
    );
  });

  return <primitive ref={droneRef} object={scene} scale={cfg.scale} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ROOT
// ─────────────────────────────────────────────────────────────────────────────
const TechSwarm = () => {
  const { scrollYProgress } = useScroll();
  const [cfg, setCfg] = useState(() => getConfig(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setCfg(getConfig(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (cfg.scale === 0) return null;

  return (
    <div className="tech-swarm-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: cfg.fov }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        style={{ pointerEvents: 'none' }}
        gl={{ antialias: window.innerWidth > 768, powerPreference: 'high-performance' }}
      >
        <CameraRig fov={cfg.fov} />

        <hemisphereLight skyColor="#1a1a2e" groundColor="#080808" intensity={0.9} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[-4, 8, 4]}  intensity={1.6} castShadow />
        <directionalLight position={[ 4, -2, -5]} intensity={0.35} color="#3344ff" />
        <Environment preset="city" />

        <Drone scrollYProgress={scrollYProgress} cfg={cfg} />
      </Canvas>
    </div>
  );
};

export default TechSwarm;
