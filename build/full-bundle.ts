import {resolve} from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'
import { parallel } from 'gulp'
import scss from "rollup-plugin-scss";
import {version} from '../src/vue-map/package.json';
import {vmRoot, buildOutput, epOutput} from './utils/paths'
import { generateExternal, writeBundles } from './utils/rollup'

import { withTaskName } from './utils/gulp'
import {MapAlias} from "./plugins/map-alias";


export const buildFull = (minify: boolean) => async () => {
  const bundle = await rollup({
    input: resolve(vmRoot, 'index.ts'),
    plugins: [
      await MapAlias(),
      scss({output: resolve(buildOutput, 'style.css')}),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      vue({
        target: 'browser',
        exposeFilename: false,
      }),
      commonjs(),
      esbuild({
        minify,
        sourceMap: minify,
        target: 'es2018',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),

        // options
        preventAssignment: true,
      }),
      filesize(),
    ],
    external: await generateExternal({ full: true }),
  })
  const banner = `/*! vue-amap v${version} */\n`
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: resolve(epOutput, `dist/index${minify ? '.min' : ''}.js`),
      exports: 'named',
      name: 'VueAmap',
      globals: {
        vue: 'Vue',
      },
      sourcemap: minify,
      banner
    },
    {
      format: 'esm',
      file: resolve(
        epOutput,
        `dist/index.es${minify ? '.min' : ''}.js`
      ),
      sourcemap: minify,
      banner
    },
  ])
}

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
)
