# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build with code splitting
npm run preview   # Preview production build locally
npm run lint      # ESLint validation
```

## Architecture

**Acenzos** is a React 19 SPA for a digital agency. It uses React Router v7, Framer Motion for animations, Three.js/R3F for 3D, and Lenis for smooth scrolling.

### Entry points & routing

- `src/main.jsx` — root renderer; wraps in `HelmetProvider` + `BrowserRouter`
- `src/App.jsx` — orchestrates preloader, Lenis setup, lazy route loading, and scroll-to-top on navigation
- All pages except Home are lazy-loaded; their imports appear at the top of App.jsx to warm the cache before the preloader exits

Routes: `/` (Home), `/work`, `/work/:slug`, `/expertise`, `/studio`, `/contact`

### Page vs component split

Pages live in `src/pages/` and compose section components from `src/components/`. Home.jsx assembles ~10 section components in order (Hero, StatsBar, WorkSection, etc.). Each component owns a paired `.css` file.

### Smooth scroll

Lenis is initialized as `window.lenis` after the preloader finishes. Use Framer Motion's `useScroll()` for scroll-linked animations — do not use vanilla `window.addEventListener('scroll', ...)`, as Lenis intercepts native scroll events.

### 3D drone (`src/components/TechSwarm.jsx`)

The most complex component. It renders a GLTF drone (`src/assets/drone.glb`) in a full-viewport R3F canvas with physics-based motion (spring dynamics, wind drift via irrational-frequency sine waves). Its behavior is controlled by `src/droneStore.js` — a plain mutable object (not Zustand/Redux) that CapabilitiesSection and ImmersiveScaleSection write to on scroll/hover. The canvas is deferred by one frame after preloader exit to avoid GPU contention. Four responsive config breakpoints: <480px, <768px, <1200px, ≥1200px.

### State

No global state library. Only `droneStore.js` (drone position/visibility flags). Page-local state via React hooks.

### Theming

`/expertise` and `/studio` use a light theme; Navbar checks `useLocation().pathname` to switch styles. The CSS variable `--bg` drives the background color used in Suspense fallbacks.

### Vite config

`vite.config.js` splits output into named chunks: `three-vendor`, `framer-vendor`, `router-vendor`, `react-vendor`, `misc-vendor`. The chunk size warning threshold is raised to 1000 KB because Three.js is intentionally large.
