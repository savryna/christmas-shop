import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  publicDir: 'public',
  build: {
    minify: false,
    sourcemap: true,
    target: 'esnext',
    compact: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'gifts.html'),
      },
    },
  },
});
