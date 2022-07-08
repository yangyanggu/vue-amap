import {resolve} from 'path'
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import {vpRoot} from '../utils/paths'

export default registerComponentsPlugin({
  componentsDir: resolve(vpRoot, 'components'),
});
