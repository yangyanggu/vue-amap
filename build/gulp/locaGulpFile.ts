import {resolve} from "path";
import {copy, remove} from 'fs-extra'
import {series, parallel} from 'gulp'
import {run} from '../utils/process'
import {withTaskName} from '../utils/gulp'
import {buildModules} from '../buildModules'
import {getBuildFullBundle} from "../full-bundle";
import {buildHelper} from '../helper'
import {generateTypesDefinitions} from "../types-definitions";
import {
  srcRoot
} from '../utils/paths'
// import {buildConfig} from '../build-info'
import changeBuildDate from '../plugins/changeBuildDate'
import {getBuildConfig} from "../build-info";
import type {TaskFunction} from 'gulp'
import type {Module} from '../build-info'

const pkgRoot = resolve(srcRoot, 'vue-amap-loca')

const typesRoot = resolve(pkgRoot, '_types')

const distRoot = resolve(pkgRoot, 'dist')

const esRoot = resolve(pkgRoot, 'es')

const libRoot = resolve(pkgRoot, 'lib')

const ideRoot = resolve(pkgRoot, 'ide')

const bundlePath = '@vuemap/vue-amap-loca'

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
    buildHelper(pkgRoot, ideRoot, 'vue-amap-loca'),
  ),
  parallel(copyTypesDefinitions),
  withTaskName('clean _types', async () => {
    await remove(typesRoot)
  }),
  withTaskName('change publish date', () => changeBuildDate('loca'))
)
export default build

