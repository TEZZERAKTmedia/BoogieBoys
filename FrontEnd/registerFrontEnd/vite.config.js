import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 3,  // Optimize GIFs
        colors: 256,  // Reduce colors
        interlaced: false,  // Disable interlacing for smaller size
      },
      mozjpeg: {
        quality: 25,  // Lower JPG quality for better compression
      },
      pngquant: {
        quality: [0.2, 0.4],  // Lower PNG quality
      },
      svgo: {
        plugins: [{ removeViewBox: false }],  // Optimize SVGs
      },
      webp: {
        quality: 20,  // Reduce WebP quality even more (lower = smaller files)
        method: 6,  // Use best compression (0 = fast, 6 = slowest but best)
        nearLossless: 0,  // Fully lossy compression for smallest file size
      },
    }),
  ],
  server: {
    port: 3010,
  },
});
