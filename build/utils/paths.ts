import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..')
export const docRoot = resolve(projRoot, 'docs')

export const apiRoot = resolve(docRoot, 'zh-CN', 'component')

export const pkgRoot = resolve(projRoot, 'src')

export const vmRoot = resolve(pkgRoot, 'vue-map')

export const epPackage = resolve(vmRoot, 'package.json');

/** dist */
export const buildOutput = resolve(projRoot, 'dist')

/** dist/vue-amap */
export const epOutput = resolve(buildOutput, 'vue-amap')