import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..')
export const docRoot = resolve(projRoot, 'docs')

export const apiRoot = resolve(projRoot, 'ide-api', 'component')

export const srcRoot = resolve(projRoot, 'src')

export const vmRoot = resolve(srcRoot, 'vue-map')

export const epPackage = resolve(vmRoot, 'package-template.json');

/** dist */
export const buildOutput = resolve(projRoot, 'dist')

/** dist/vue-amap */
export const epOutput = resolve(buildOutput, 'vue-amap')

export const buildTsConfigPath = resolve(projRoot, 'tsconfig.build.json')

