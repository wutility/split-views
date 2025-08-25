import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
  plugins: [
    dts({
      compilerOptions: { removeComments: true },
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.build.json'
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SplitViews',
      fileName: (format) => format === 'es' ? 'index.js' : `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    sourcemap: false,
  }
});
