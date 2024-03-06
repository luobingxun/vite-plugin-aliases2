import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import aliases from '../src';

export default defineConfig({
  plugins: [aliases({ prefix: '@', root: '../example/src' }), react()]
});
