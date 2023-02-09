import {resolve} from "path";
import {remove} from 'fs-extra'
import {series} from 'gulp'
import { rollup} from "rollup";
import esbuild from 'rollup-plugin-esbuild'
// 在node_模块中查找并绑定第三方依赖项
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import {
  projRoot, srcRoot
} from '../utils/paths'
import {withTaskName} from '../utils/gulp'
import {generateTypesDefinitions} from "../types-definitions";
import type { RollupOptions,OutputOptions} from "rollup";
import type { TaskFunction} from 'gulp';

const pkgRoot = resolve(srcRoot, 'vue-amap-util')

const distRoot = resolve(pkgRoot, 'dist')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const build: TaskFunction = series(
  withTaskName('clean',  async () => {
    await remove(distRoot)
  }),
  withTaskName('build vue-amap-util', async () => {
    const options: RollupOptions = {
      input: resolve(pkgRoot, 'index.ts'),
      output: [
        {
          file: resolve(pkgRoot, 'dist/index-es.js'),
          format: 'es',
          sourcemap: true
        },
        {
          file: resolve(pkgRoot, 'dist/index-cjs.js'),
          format: 'cjs',
          sourcemap: true
        }
      ],
      treeshake: true,
      // 监听的文件
      // 不参与打包
      plugins: [
        typescript({
          tsconfig: resolve(projRoot,'build/config/tsconfig.json')
        }),
        nodeResolve({
          extensions: ['.mjs', '.js', '.json', '.ts'],
        }),
        commonjs(),
        esbuild({
          // All options are optional
          include: /\.[jt]sx?$/, // default, inferred from `loaders` option
          exclude: /node_modules/, // default
          sourceMap: true, // default
          target: 'es2017', // default, or 'es20XX', 'esnext'
          jsx: 'transform', // default, or 'preserve'
          // Like @rollup/plugin-replace
          tsconfig: 'tsconfig.json', // default
          // Add extra loaders
          loaders: {
            // Add .json files support
            // require @rollup/plugin-commonjs
            '.json': 'json',
          },
        }),
      ]
    }
    const bundle = await rollup(options)
    await Promise.all((options.output as  OutputOptions[]).map(bundle.write));
  }),
  withTaskName('build types', async () => {
    await generateTypesDefinitions(pkgRoot, distRoot)
  })
)

export default build
