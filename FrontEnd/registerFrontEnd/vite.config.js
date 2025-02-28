import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'; // ✅ Named Import
import { imagetools } from 'vite-imagetools'; // ✅ Optional for WebP conversion

export default defineConfig({
  plugins: [
    react(),
    imagetools(), // Enables on-the-fly image optimization
    ViteImageOptimizer({ // ✅ Correct function call
      png: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 80 },
      svg: { multipass: true },
      svg: false,
    }),
  ],
  server: {
    port: 3010,
  },
});
