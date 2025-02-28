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
        quality: 10, // 🔥 Reduce quality to 10% (High compression)
        speed: 1, // Max compression
        strip: true, // Remove metadata
      },
      jpg: {
        quality: 10, // 🔥 Reduce JPG quality to 10% (90% compression)
        progressive: true, // Enables progressive rendering (loads gradually)
        strip: true, // Removes metadata for smaller files
      },
      webp: {
        quality: 10, // 🔥 Reduce WebP quality to 10% (Maximum compression)
        method: 6, // Highest compression-to-quality tradeoff
      },
      avif: {
        quality: 10, // 🔥 Extreme AVIF compression (90% smaller files)
        speed: 0, // Max compression (0 = best compression, 9 = fastest)
      },
      svg: false, // ✅ Disable SVG optimization to avoid processing errors
    }),
  ],
  server: {
    port: 3010,
  },
});
