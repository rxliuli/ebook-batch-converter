import typescript from 'rollup-plugin-typescript2'
import externals from 'rollup-plugin-node-externals'
import autoExternal from 'rollup-plugin-auto-external'
import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'

export default defineConfig({
  input: './scripts/install.ts',
  plugins: [typescript(), autoExternal(), externals(), json()],
  output: [
    {
      file: 'bin/install.js',
      format: 'cjs',
    },
  ],
})
