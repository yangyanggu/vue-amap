import {resolve} from "path";
import {copy, copyFile, remove} from 'fs-extra'
import {series, parallel} from 'gulp'
import {run} from '../utils/process'
import {withTaskName, copyPackageJSON} from '../utils/gulp'
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

const distDistRoot = resolve(distRoot, 'dist')

const esRoot = resolve(distRoot, 'es')

const libRoot = resolve(distRoot, 'lib')

const ideRoot = resolve(distRoot)

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
    await remove(typesRoot)
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
      await copyFile(resolve(projRoot, 'README.md'), resolve(distRoot, 'README.md'))
    }),
    withTaskName('copy license', async () => {
      await copyFile(resolve(projRoot, 'LICENSE'), resolve(distRoot, 'LICENSE'))
    }),
    withTaskName('copy package.json', async () => {
      await copyPackageJSON(resolve(pkgRoot, 'package.json'), resolve(distRoot, 'package.json'))
    }),
    withTaskName('copy global.d.ts', async () => {
      await copyFile(resolve(pkgRoot, 'global.d.ts'), resolve(distRoot, 'global.d.ts'))
    })
  ),
  parallel(copyTypesDefinitions),
  withTaskName('clean _types', async () => {
    await remove(typesRoot)
  }),
  withTaskName('change publish date', () => changeBuildDate('amap'))
)
export default build

