// vite.config.js
export default {
  server: {
    proxy: {
      '/store-data': 'http://localhost:3001',
    },
  },
};