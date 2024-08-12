---
title: 兼容高德原生 SDK
description: 组件兼容直接调用高德原生API，通过使用init事件可以获取所有高德地图组件实例
head:
  - - meta
    - name: keywords
      content: 兼容高德原生SDK, init事件
---

# 兼容高德原生 SDK

---

`@vuemap/vue-amap` 能够抛开高德原生 SDK 覆盖大多数场景，但对于部分定制化程度较高的场景而言，可能还是需要引入高德原生 SDK 来支持。这章将介绍如何在 `@vuemap/vue-amap` 中使用高德 SDK。


## Promise

在**定制化程度较高**的项目中，开发者可能只想通过 vue-amap 引入高德地图，而部分实例化的操作直接基于高德地图的 sdk 完成。这个时候就需要 `lazyAMapApiLoaderInstance`。

NPM 安装：

```javascript
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap';

initAMapApiLoader({
  key: 'YOUR_KEY',
});

createApp(App)
    .use(VueAMap)
    .mount('#app')

lazyAMapApiLoaderInstance.then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});
```

## 实例方式

对于大多数 `@vuemap/vue-amap` 组件，都有 `init` 这个 `event`，参数为高德地图对应组件的实例，通过这样暴露高德实例的方式，开发者能够非常自由地将原生 SDK 和 @vuemap/vue-amap 结合起来使用。


*若涉及到高德原生 `AMap` 需要注意的点：*

* 确保 `@vuemap/vue-amap` 的导入名不是 `AMap`，推荐 `import VueAMap from '@vuemap/vue-amap'` 避免和高德全局的 `AMap` 冲突。
* 若 `eslint` 报错 `AMap is undefined` 之类的错误。请将 `AMap` 配置到 `.eslintrc` 的 `globals` 中。
* 若 `ts` 提示 `Cannot find name 'AMap'. Did you mean 'map'` ,那么需要将 `AMap` 配置到自己的.d.ts文件中
* 使用原生开发时需要注意通过`new AMap.xxxx`出来的对象不能放入vue的data中管理，会导致地图异常

### 地图示例
::: demo

examples/amap/basic

:::
