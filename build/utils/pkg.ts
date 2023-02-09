import findWorkspacePackages from '@pnpm/find-workspace-packages'
import { EP_PREFIX } from './constants'
import { srcRoot, projRoot } from './paths'

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
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist', 'global.d.ts']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
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
      pkg.dir.startsWith(srcRoot)
  )
