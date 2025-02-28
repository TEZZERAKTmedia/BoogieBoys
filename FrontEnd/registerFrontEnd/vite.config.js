import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    ViteImageOptimizer({
      png: {
        quality: 50, // 🔥 Lower quality (higher compression)
        speed: 1, // Max compression
      },
      jpg: {
        quality: 50, // 🔥 Reduce to 50% quality
        progressive: true, // Enables progressive rendering
      },
      webp: {
        quality: 40, // 🔥 Reduce to 40% for best size reduction
        method: 6, // Best quality-to-size tradeoff
      },
      avif: {
        quality: 40, // 🔥 Reduce quality for better compression
        speed: 0, // Max compression
      },
      svg: false, // Disable SVG optimization if causing errors
    }),
  ],
  server: {
    port: 3010,
  },
});
