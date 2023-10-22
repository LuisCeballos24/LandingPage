// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/src/main.jsx', // Ajusta la ruta de tu punto de entrada según sea necesario
      output: {
        manualChunks: {
          // Agrupa archivos .jsx en un chunk separado
          jsx: ['/src/**/*.jsx'],

          // Agrupa archivos .css en un chunk separado
          css: ['/src/**/*.css'],

          // Agrupa archivos .json en un chunk separado
          json: ['/src/**/*.json'],

          // Agrupa todos los demás archivos en el chunk principal
          main: ['/src/**/*.{js,jsx,ts,tsx,css,json}'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Ajusta este límite según sea necesario
  },
});