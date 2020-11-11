import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-typescript2'
import path from 'path'

export default {
  input: './src/index.ts',
  output: {
    format: 'iife',
    file: './dist/bundle.js',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({
      openPage: './public/index.html',
      contentBase: '',
      port: 9001
    })
  ]
}