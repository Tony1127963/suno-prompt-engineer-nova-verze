import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env': JSON.stringify({
        GEMINI_API_KEY: env.GEMINI_API_KEY || '',
        API_KEY: env.API_KEY || '',
        NODE_ENV: process.env.NODE_ENV || 'development',
      }),
      'globalThis.process.env': JSON.stringify({
        GEMINI_API_KEY: env.GEMINI_API_KEY || '',
        API_KEY: env.API_KEY || '',
        NODE_ENV: process.env.NODE_ENV || 'development',
      }),
    },
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, './src/'),
        '@google/genai': path.resolve(__dirname, 'node_modules/@google/genai/dist/web/index.mjs'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        external: [],
      },
    },
  };
});
