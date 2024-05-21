import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import manifest from './manifest.json';
import { crx } from '@crxjs/vite-plugin';
// import { copy } from 'vite-plugin-copy';
import { readFileSync } from 'fs';
// import { chromeExtension } from "vite-plugin-chrome-extension";

export default defineConfig({
  plugins: [
    vue(),
    crx({
      manifestVersion: 3,
      manifest: './manifest.json',
      emitViteManifest: true,
      resources: 'src',
      
    }),
    // copy({
    //   targets: [{ src: 'public', dest: 'dist' }],
    //   hook: 'writeBundle',
    // }),
    // chromeExtension()
  ],
});


