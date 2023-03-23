---
title: 地图插件
description: 地图插件示例
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 地图插件
---
# 地图插件

地图插件示例，提供全局加载插件和局部加载插件的两种示例

## 全局加载插件

全局加载插件需要在调用`initAMapApiLoader`的时候传入`plugins`参数。
```ts
import {initAMapApiLoader} from '@vuemap/vue-amap';
initAMapApiLoader({
  key: 'YOUR_KEY',
  plugins: ['AMap.HawkEye']
})
```

全局加载完成后可以在地图的`init`事件中直接使用插件

#### 全局加载示例
::: demo
examples/amap/plugin-global
:::

## 局部加载插件

局部加载是调用地图的`plugin`方法来加载插件

#### 局部加载示例
::: demo
examples/amap/plugin-part
:::


