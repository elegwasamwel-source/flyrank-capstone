const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react').default

module.exports = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})