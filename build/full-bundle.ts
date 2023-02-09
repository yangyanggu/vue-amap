import {resolve} from 'path'
import {readJSON} from 'fs-extra'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'
import {parallel} from 'gulp'
import scss from "rollup-plugin-scss";
import { generateExternal, writeBundles } from './utils/rollup'

import { withTaskName } from './utils/gulp'
import {MapAlias} from "./plugins/map-alias";
import RemoveGlobalNamePlugin from './plugins/RemoveGlobalNamePlugin'
import {buildTsConfigPath} from "./utils/paths";
import type { TaskFunction} from 'gulp';


export const buildFull = (pkgRoot: string, minify: boolean) => async () => {
  const packagePath = resolve(pkgRoot, 'package.json')
  const json = await readJSON(packagePath)
  const bundle = await rollup({
    input: resolve(pkgRoot, 'index.ts'),
    plugins: [
      await MapAlias(),
      scss({output: resolve(pkgRoot, 'dist/style.css')}),
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
        tsconfig: buildTsConfigPath
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),

        // options
        preventAssignment: true,
      }),
      RemoveGlobalNamePlugin(),
      filesize(),
    ],
    external: await generateExternal({ full: true, package: packagePath }),
  })
  const banner = `/*! ${json.name} v${json.version} */\n`
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: resolve(pkgRoot, `dist/index${minify ? '.min' : ''}.js`),
      exports: 'named',
      name: 'VueAMap',
      globals: {
        vue: 'Vue',
      },
      sourcemap: minify,
      banner
    },
    {
      format: 'esm',
      file: resolve(
        pkgRoot,
        `dist/index.es${minify ? '.min' : ''}.js`
      ),
      sourcemap: minify,
      banner
    },
  ])
}

export const getBuildFullBundle = (pkgRoot: string): TaskFunction => {
  return parallel(
    withTaskName('buildFullMinified', buildFull(pkgRoot, true)),
    withTaskName('buildFull', buildFull(pkgRoot, false))
  )
}
