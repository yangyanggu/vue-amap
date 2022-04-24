import installer from './defaults'
export * from '@vue-map/services';
export * from '@vue-map/packages'
export { makeInstaller } from './make-installer'
export { default } from './defaults'
export {default as registerMixin} from '@vue-map/mixins/register-component'
export const install = installer.install
