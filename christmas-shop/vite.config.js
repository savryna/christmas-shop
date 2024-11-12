import { resolve } from 'path';
import { defineConfig } from 'vite';

const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

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
        home: resolve(__dirname, 'home.html'),
        gifts: resolve(__dirname, 'gifts.html'),
      },
    },
  },
});

// rollupOptions: {
//   input: {
//     main: resolve(_dirname, 'index.html'),
//     home: resolve(_dirname, 'home.html'),
//     menu: resolve(_dirname, 'menu.html'),
//   },
// },
