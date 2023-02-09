import type { TaskFunction } from 'gulp'

export const withTaskName = (name: string, fn: TaskFunction): TaskFunction =>
  Object.assign(fn, { displayName: name })
