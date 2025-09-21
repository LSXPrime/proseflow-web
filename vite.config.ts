import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/proseflow/',
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,
    }),
  ],
  // Ensure proper loaders for different file types
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[jt]sx?$/,
    sourcemap: true
  },
});