---
title: 脚本初始化
description: 初始化vue-amap组件，提供完整导入和自动按需导入功能，自动导入功能将提供自动的tree-shaking
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 完整导入, 自动导入, ree-shaking
---

# 初始化

---

## 完整导入

一般项目中，对于 vue-amap 的初始化只需要调用 `initAMapApiLoader` 方法即可。

NPM 安装：

```javascript
import App from './App.vue'
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
    key: 'YOUR_KEY'
})

createApp(App)
    .use(VueAMap)
    .mount('#app')

```

CDN 引入：

```javascript
window.VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
});
```

## 自动导入
首先你需要安装```unplugin-vue-components``` 、 ```unplugin-auto-import``` 、 ```@vuemap/unplugin-resolver```这三款插件
```
npm install -D unplugin-vue-components unplugin-auto-import @vuemap/unplugin-resolver
```
然后在main.ts中导入css和进行初始化key
```ts
import App from './App.vue'
import {initAMapApiLoader} from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
    key: 'YOUR_KEY'
})

createApp(App)
    .mount('#app')
```
再修改配置文件，把下列代码插入到你的 Vite 或 Webpack 的配置文件中
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {VueAmapResolver} from '@vuemap/unplugin-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VueAmapResolver()],
    }),
    Components({
      resolvers: [VueAmapResolver()],
    }),
  ]
})
```
::: warning
当项目中Element-Plus也使用自动导入功能时会与地图组件冲突，需要使用unplugin-vue-components@0.17.15之后的版本
:::
使用Element-plus的自动导入时，配置需要修改为如下：
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {VueAmapResolver} from '@vuemap/unplugin-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({
        exclude: /^ElAmap[A-Z]*!/
      }),VueAmapResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        exclude: /^ElAmap[A-Z]*!/
      }),VueAmapResolver()],
    }),
  ]
})

```


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
AMapUI | `Object` | `` | UI的参数配置 [示例](https://lbs.amap.com/api/amap-ui/intro) |
Loca | `Object` | `{version: '2.0.0'}` | Loca 版本 |

