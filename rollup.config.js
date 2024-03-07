import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  input: './src/index.ts',
  plugins: [resolve(), cjs(), typescript(), terser()],
  output: [
    {
      file: './dist/index.cjs',
      format: 'cjs'
    },
    {
      file: './dist/index.mjs',
      format: 'es'
    }
  ]
});
