import {resolve} from "path";
import {copy, copyFile, remove} from 'fs-extra'
import {series, parallel} from 'gulp'
import {run} from '../utils/process'
import {withTaskName} from '../utils/gulp'
import {buildModules} from '../buildModules'
import {getBuildFullBundle} from "../full-bundle";
import {buildHelper} from '../helper'
import {generateTypesDefinitions} from "../types-definitions";
import {
  projRoot,
  srcRoot
} from '../utils/paths'
// import {buildConfig} from '../build-info'
import changeBuildDate from '../plugins/changeBuildDate'
import {getBuildConfig} from "../build-info";
import type {TaskFunction} from 'gulp'
import type {Module} from '../build-info'

const pkgRoot = resolve(srcRoot, 'vue-amap')

const typesRoot = resolve(pkgRoot, '_types')

const distRoot = resolve(pkgRoot, 'dist')

const esRoot = resolve(pkgRoot, 'es')

const libRoot = resolve(pkgRoot, 'lib')

const ideRoot = resolve(pkgRoot, 'ide')

const bundlePath = '@vuemap/vue-amap'

const buildConfig = getBuildConfig(pkgRoot, bundlePath)

export const copyTypesDefinitions: TaskFunction = (done) => {
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(typesRoot, buildConfig[module].output.path, {recursive: true})
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

const build:TaskFunction = series(
  withTaskName('clean', async () => {
    await remove(distRoot)
    await remove(esRoot)
    await remove(libRoot)
    await remove(typesRoot)
    await remove(ideRoot)
  }),
  parallel(
    withTaskName('buildModules', async () => {
      await buildModules(pkgRoot, bundlePath)
    }),
    getBuildFullBundle(pkgRoot),
    withTaskName('generateTypesDefinitions', async () => {
      await generateTypesDefinitions(pkgRoot, typesRoot)
    }),
    buildHelper(pkgRoot, ideRoot, 'vue-amap'),
    withTaskName('copy readme', async () => {
      await copyFile(resolve(projRoot, 'README.md'), resolve(pkgRoot, 'README.md'))
    })
  ),
  parallel(copyTypesDefinitions),
  withTaskName('clean _types', async () => {
    await remove(typesRoot)
  }),
  withTaskName('change publish date', () => changeBuildDate('amap'))
)
export default build

