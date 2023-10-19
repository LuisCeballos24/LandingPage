// vite.config.js
export default {
  server: {
    proxy: {
      '/google-sheets': 'http://localhost:3001',
    },
  },
};