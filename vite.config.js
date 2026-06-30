import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,             // 🌟 Crucial: links expect globally
    environment: 'jsdom',       // 🌟 Crucial: simulates the browser
    setupFiles: ['./src/setupTests.ts'], // 🌟 Crucial: loads matchers before tests run
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});      