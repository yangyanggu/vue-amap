import {copyFile, mkdir} from "fs/promises";
import {resolve} from "path";
import {copy} from 'fs-extra'
import {series, parallel} from 'gulp'
import {run} from './utils/process'
import {withTaskName} from './utils/gulp'
import {buildModules} from './buildModules'
import {buildFullBundle} from "./full-bundle";
import {buildHelper} from './helper'
import {generateTypesDefinitions} from "./types-definitions";
import {
  buildOutput,
  projRoot,
  epOutput,
  vmRoot
} from './utils/paths'
import {buildConfig} from './build-info'
import type {TaskFunction} from 'gulp'
import type {Module} from './build-info'

const runTask = (name: string) =>
  withTaskName(name, () => run(`pnpm run build ${name}`))

const createOutput = () => mkdir(epOutput, {recursive: true})

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = resolve(buildOutput, 'types')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, {recursive: true})
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export const copyFullStyle = async () => {
  await mkdir(resolve(epOutput, 'dist'), { recursive: true })
  await copyFile(
    resolve(buildOutput, 'style.css'),
    resolve(epOutput, 'dist/style.css')
  )
}

export const copyFiles = () => {
  const copyTypings = async () => {
    await copyFile(
      resolve(projRoot, 'typings/global.d.ts'),
      resolve(epOutput, 'global.d.ts')
    )
  }

  return Promise.all([
    copyFile(
      resolve(projRoot, 'README.md'),
      resolve(epOutput, 'README.md')
    ),
    copyFile(
      resolve(projRoot, 'CHANGELOG.md'),
      resolve(epOutput, 'CHANGELOG.md')
    ),
    copyFile(
      resolve(vmRoot, 'package-template.json'),
      resolve(epOutput, 'package.json')
    ),
    copyTypings(),
    copyFullStyle()
  ])
}

export default series(
  withTaskName('clean', () => run('pnpm run clean:dist')),
  withTaskName('createOutput', () => createOutput()),
  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    runTask('buildHelper'),
  ),
  parallel(copyTypesDefinitions, copyFiles)
)

export * from './types-definitions'
export * from './buildModules'
export * from './full-bundle'
export * from './helper'

