import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json')
const banner = `/*! SplitViews - v${pkg.version} | Copyright 2020 - Haikel Fazzani */\n`;

export default {
  input: "src/index.ts",
  output: [
    {
      name: 'SplitViews',
      file: 'build/index.js',
      format: 'umd',
      sourcemap: false,
      banner,
    },
    {
      file: 'build/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    typescript(),
    terser()
  ]
};