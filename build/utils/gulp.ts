import fs from "fs";
import type { TaskFunction } from 'gulp';

export const withTaskName = (name: string, fn: TaskFunction): TaskFunction =>
  Object.assign(fn, { displayName: name });

export const copyPackageJSON = async (sourceFile: string, destFile: string) => {
    const packageJSON  = await import(sourceFile);
    delete packageJSON.default;
    packageJSON['exports']['.']['import'] = './es/index.mjs';
    if(packageJSON['peerDependencies']['@vuemap/vue-amap']){
      packageJSON['peerDependencies']['@vuemap/vue-amap'] = '>=2.1.0';
    }
    fs.writeFileSync(destFile,JSON.stringify(packageJSON, undefined, 2),);
};