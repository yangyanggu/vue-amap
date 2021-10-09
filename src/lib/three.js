// polyfills
import './polyfills';

import upperCamelCase from 'uppercamelcase';

// Layer 图层导入
import ThreeLayer from '@/components/layer/custom/ThreeLayer';

// Three
import Gltf from '@/components/three/Gltf';

let components = [
  ThreeLayer,

  Gltf
];

let VueAMap = window.VueAMap || {};

VueAMap.install = (Vue) => {
  if (VueAMap.installed) return;
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
  components.map(_component => {
    // register component
    Vue.component(_component.name, _component);

    // component cache
    VueAMap[upperCamelCase(_component.name).replace(/^El/, '')] = _component;
  });
};

const install = function(Vue) {
  /* istanbul ignore if */
  if (install.installed) return;
  VueAMap.install(Vue);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
;

export default VueAMap;
