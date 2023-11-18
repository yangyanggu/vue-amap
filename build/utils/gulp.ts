import fs from "fs";
import type { TaskFunction } from 'gulp'

export const withTaskName = (name: string, fn: TaskFunction): TaskFunction =>
  Object.assign(fn, { displayName: name })

export const copyPackageJSON = async (sourceFile: string, destFile: string) => {
    const packageJSON  = await import(sourceFile);
    packageJSON['exports']['.']['import'] = './es/index.mjs';
    fs.writeFileSync(destFile,JSON.stringify(packageJSON, undefined, 2),)
}