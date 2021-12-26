import {resolve} from 'path'
import {vpRoot} from '../utils/paths'

export default [
  '@vuepress/register-components',
  {
    componentsDir: resolve(vpRoot, 'components'),
  },
] as any
