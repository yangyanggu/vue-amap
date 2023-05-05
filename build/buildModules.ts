import {resolve} from "path";
import { rollup } from 'rollup'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import filesize from 'rollup-plugin-filesize'
import glob from 'fast-glob'
import scss from "rollup-plugin-scss";
import {buildTsConfigPath, vmRoot} from './utils/paths'
import {generateExternal, writeBundles} from './utils/rollup'
import { excludeFiles } from './utils/pkg'
import { reporter } from './plugins/size-reporter'
import { getBuildConfigEntries } from './build-info'
import { MapAlias } from './plugins/map-alias'
import type { OutputOptions } from 'rollup'

export const buildModules = async (pkgRoot: string, bundlePath: string) => {
  const buildConfigEntries = getBuildConfigEntries(pkgRoot,bundlePath)
  const buildOutput = resolve(pkgRoot, 'dist', 'dist')
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      await MapAlias(),
      scss({output: resolve(buildOutput, 'style.css')}),
      vue({ target: 'browser' }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        tsconfig: buildTsConfigPath
      }),
      filesize({ reporter }),
    ],
    external: await generateExternal({ full: false, package: resolve(pkgRoot, 'package.json') }),
    treeshake: false,
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: pkgRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}
