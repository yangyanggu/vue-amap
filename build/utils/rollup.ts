import { getPackageDependencies } from './pkg';
import { epPackage } from './paths';
import type { OutputOptions, RollupBuild } from 'rollup';

export function writeBundles (bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)));
}

export const generateExternal = async (options: { full: boolean, package: string }) => {
  return (id: string) => {
    const packages: string[] = ['vue', '@vuemap/amap-jsapi-types'];
    if (!options.full) {
      // dependencies
      packages.push('@vue', ...getPackageDependencies(options.package));
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    );
  };
};
