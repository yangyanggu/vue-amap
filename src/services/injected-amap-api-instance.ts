import AMapAPILoader from './amap-api-loader';
let lazyAMapApiLoaderInstance = null as any;

interface AMapLoaderOptions {
  key: string, // 申请好的Web端开发者Key，首次调用 load 时必填
  version ?: string, // 指定要加载的 JSAPI 的版本，缺省时默认为 2.0.0
  plugins ?: string[], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  Loca ?: {
    version ?: string
  },
  AMapUI ?: {
    version?: string; // AMapUI 缺省 1.1
    plugins?: string[]; // 需要加载的 AMapUI ui插件
  };
  serviceHost ?: string
  securityJsCode ?: string
  offline ?: boolean //是否离线部署
}

export const initAMapApiLoader = (config : AMapLoaderOptions) => {
  if (lazyAMapApiLoaderInstance) return;
  if (!lazyAMapApiLoaderInstance){
    if(config.offline){
      lazyAMapApiLoaderInstance = new Promise(resolve => {
        console.log('@vuemap/vue-amap离线部署')
        resolve((window as any).AMap);
      });
    }else{
      lazyAMapApiLoaderInstance = AMapAPILoader(config);
    }
  }
  lazyAMapApiLoaderInstance.then();
};
export {lazyAMapApiLoaderInstance};
