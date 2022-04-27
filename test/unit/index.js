import Vue from 'vue';
import VueAMap from '@vuemap/vue-amap';
VueAMap.initAMapApiLoader({
  key: '747f980f217a31ba68d99301045a3fa7'
});
Vue.use(VueAMap);
Vue.config.productionTip = false;

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('@vuemap/vue-amap', true, /^\.\/(?!main(\.js)?$)/);
srcContext.keys().forEach(srcContext);
