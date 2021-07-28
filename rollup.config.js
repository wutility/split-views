import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: 'build/index.js',
      format: 'esm',
      sourcemap: false,
    },
    {
      name: 'SplitViews',
      file: 'build/index.umd.js',
      format: 'umd',
      sourcemap: false
    }
  ],
  plugins: [
    terser()
  ]
};