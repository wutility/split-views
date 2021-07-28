import { terser } from "rollup-plugin-terser";

const pkg = require('./package.json')
const banner = `/*! SplitViews - v${pkg.version} | Copyright 2020 - Haikel Fazzani */\n`;

export default {
  input: "src/index.js",
  output: [
    {
      name: 'SplitViews',
      file: 'build/index.umd.js',
      format: 'umd',
      sourcemap: false,
      banner,
    },
    {
      file: 'build/index.esm.js',
      format: 'esm',
      sourcemap: false,
    },    
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: false
    }
  ],
  plugins: [
    terser()
  ]
};