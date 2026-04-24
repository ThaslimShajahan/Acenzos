import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Rolldown (Vite 8) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/three') ||
              id.includes('node_modules/@react-three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          if (id.includes('node_modules/react-router-dom') ||
              id.includes('node_modules/react-router/')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/react-dom')) {
            return 'vendor-react-dom';
          }
          if (id.includes('node_modules/react/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lenis') ||
              id.includes('node_modules/lucide-react') ||
              id.includes('node_modules/react-helmet-async')) {
            return 'vendor-misc';
          }
        },
      },
    },
    // vendor-three (Three.js + R3F + Drei) is ~994 kB minified / 270 kB gzip
    // — unavoidable without dropping 3D; suppress the noisy warning.
    chunkSizeWarningLimit: 1000,
  },
})


