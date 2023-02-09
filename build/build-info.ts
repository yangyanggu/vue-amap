import path from 'path'
import type { ModuleFormat } from 'rollup'

export const modules = ['esm', 'cjs'] as const
export type Module = typeof modules[number]
export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/element-plus/es` */
    path: string
  }

  bundle: {
    /** e.g: `element-plus/es` */
    path: string
  }
}
export const getBuildConfig = (pkgRoot: string, bundlePath: string):Record<Module, BuildInfo> =>{
  return {
    esm: {
      module: 'ESNext',
      format: 'esm',
      ext: 'mjs',
      output: {
        name: 'es',
        path: path.resolve(pkgRoot, 'es'),
      },
      bundle: {
        path: `${bundlePath}/es`,
      },
    },
    cjs: {
      module: 'CommonJS',
      format: 'cjs',
      ext: 'js',
      output: {
        name: 'lib',
        path: path.resolve(pkgRoot, 'lib'),
      },
      bundle: {
        path: `${bundlePath}/lib`,
      },
    },
  }
}
export const getBuildConfigEntries = (pkgRoot: string, bundlePath: string) => {
  const buildConfig = getBuildConfig(pkgRoot, bundlePath)
  return Object.entries(
    buildConfig
  ) as BuildConfigEntries
}

export type BuildConfigEntries = [Module, BuildInfo][]
