import installer from './defaults'
export * from './services';
export * from './packages'
export { makeInstaller, registerMixin } from '@vuemap/vue-amap-util'
export { default } from './defaults'
export * from './hooks';
export const install = installer.install
