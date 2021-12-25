import AMapAPILoader from './amap-api-loader';
let lazyAMapApiLoaderInstance = null as any;

export const initAMapApiLoader = (config) => {
  if (lazyAMapApiLoaderInstance) return;
  if (!lazyAMapApiLoaderInstance) lazyAMapApiLoaderInstance = AMapAPILoader(config);
  lazyAMapApiLoaderInstance.then();
};
export {lazyAMapApiLoaderInstance};
