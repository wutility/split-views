import { terser } from "rollup-plugin-terser";

const pkg = require('./package.json')
const banner = `/*! SplitViews - v${pkg.version} | Copyright 2020 - Haikel Fazzani */\n`;

export default {
  input: "src/index.js",
  output: [
    {
      name: 'SplitViews',
      file: 'build/index.js',
      format: 'umd',
      sourcemap: !process.env.NODE_ENV.includes('production'),
      banner,
    },
    {
      file: 'build/index.esm.js',
      format: 'esm',
      sourcemap: !process.env.NODE_ENV.includes('production')
    }
  ],
  plugins: [
    process.env.NODE_ENV.includes('production') ? terser() : ''
  ]
};