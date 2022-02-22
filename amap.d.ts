declare let AMap: any;
declare let Loca: any;

interface customComponent {
  $parentComponent: any,
  register: any,
  mapEntity: any,
  needInitComponents: any,
  addChildComponent: any
}

interface AMapLoaderOptions {
  key: string, // 申请好的Web端开发者Key，首次调用 load 时必填
  version : string, // 指定要加载的 JSAPI 的版本，缺省时默认为 2.0.0
  plugins ?: string[], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  Loca ?: {
    version ?: string
  },
  AMapUI ?: {
    version?: string; // AMapUI 缺省 1.1
    plugins?: string[]; // 需要加载的 AMapUI ui插件
  };
}
