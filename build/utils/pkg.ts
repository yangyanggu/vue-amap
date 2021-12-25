import findWorkspacePackages from '@pnpm/find-workspace-packages'
import { buildConfig } from '../build-info'
import { EP_PREFIX } from './constants'
import { pkgRoot, projRoot } from './paths'
import type { Module } from '../build-info'

export const getWorkspacePackages = () => findWorkspacePackages(projRoot)
export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath)
}

export const getPackageDependencies = (pkgPath: string): string[] => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies } = manifest
  return Object.keys(dependencies ?? {})
}

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}
export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]

  return (id: string) => {
    id = id.replaceAll(`${EP_PREFIX}/`, `${config.bundle.path}/`)
    return id
  }
}

/**
 * get package list
 */
export const getDistPackages = async () =>
  (await getWorkspacePackages())
  .map((pkg) => ({ name: pkg.manifest.name, dir: pkg.dir }))
  .filter(
    (pkg): pkg is { name: string; dir: string } =>
      !!pkg.name &&
      !!pkg.dir &&
      pkg.name.startsWith(EP_PREFIX) &&
      pkg.dir.startsWith(pkgRoot)
  )
