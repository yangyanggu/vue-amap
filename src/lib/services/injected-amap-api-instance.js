let lazyAMapApiLoaderInstance = null;
import AMapAPILoader from './amap-api-loader';
import Vue from 'vue';

export const initAMapApiLoader = (config) => {
  if (Vue.prototype.$isServer) return;
  // if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
  if (lazyAMapApiLoaderInstance) return;
  if (!lazyAMapApiLoaderInstance) {
    if (config.offline) {
      lazyAMapApiLoaderInstance = new Promise(resolve => {
        console.log('@vuemap/vue-amap离线部署');
        resolve(window.AMap);
      });
    } else {
      lazyAMapApiLoaderInstance = AMapAPILoader(config);
    }
  }
  lazyAMapApiLoaderInstance.then();
};
export {lazyAMapApiLoaderInstance};
