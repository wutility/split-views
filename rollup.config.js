import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    name: 'formel',
    file: 'build/index.js',
    format: 'umd'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
