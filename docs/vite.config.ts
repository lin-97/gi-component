import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      // '_apis': path.resolve(__dirname, '_apis')
    }
  }
});
