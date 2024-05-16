import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import { copy } from 'vite-plugin-copy';
import { readFileSync } from 'fs';

const manifest = JSON.parse(readFileSync(`${__dirname}/manifest.json`));
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      crx({
        manifest,
        manifestVersion: 3,
        resources: 'src',
        emitViteManifest: true,
      }),
      copy({
        targets: [{ src: 'public', dest: 'dist' }],
        hook: 'writeBundle',
      }),
    ],
    build: {
      target: 'es2020',
      rollupOptions: {
        input: 'index.html',
      },
    },
  };
});