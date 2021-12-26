---
title: 脚本初始化
---

# 初始化

---

## 引入地图

一般项目中，对于 vue-amap 的初始化只需要调用 `initAMapApiLoader` 方法即可。

NPM 安装：

```javascript
import VueAMap from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
});

//如果需要使用自定义的threeJS相关的组件，需要格外引入库中的three。该包只提供常用的模型加载，灯光，HDR等相关能力，更细致的控制需要在模型初始化后获取对象进行操作
import VueAmapThree from '@vuemap/vue-amap/dist/three'
Vue.use(VueAmapThree);

```

CDN 引入：

```javascript
window.VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
});
```

## Promise

在**定制化程度较高**的项目中，开发者可能只想通过 vue-amap 引入高德地图，而部分实例化的操作直接基于高德地图的 sdk 完成。这个时候就需要 `lazyAMapApiLoaderInstance`。

NPM 安装：

```javascript
import VueAMap from '@vuemap/vue-amap';
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
});

lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});
```

CDN 引入：

```javascript
window.VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
});

window.VueAMap.lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});
```

## 参数

参数名  | 类型  |  默认值 | 描述 |
--- | --- | --- | --- |
key | `String` | `` | 高德 Key |
version | `String` | `2.0` | 指定要加载的 JSAPI 的版本，缺省时默认为 2.0
plugins | `Array` | `` | 需要使用的的插件列表，如比例尺'AMap.Scale'等 [插件列表](https://lbs.amap.com/api/jsapi-v2/guide/abc/plugins) |
AMapUI | `Object` | `{ 'version': '1.1', 'plugins': []}` | UI的参数配置 [示例](https://lbs.amap.com/api/amap-ui/intro) |
Loca | `Object` | `{version: '2.0.0'}` | Loca 版本 |

