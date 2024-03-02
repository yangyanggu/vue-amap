---
title: 内置API
description: 组件库内置的通用API说明
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, api
---

# 简介

> 组件库内置了一批常用的API，包含了高德JSAPI加载、JSAPI释放、坐标系转化、自定义组件等等

---

## JSAPI加载
整个组件库依赖高德地图的JSAPI，因此必须确保地图在进行初始化时已经进行过JSAPI的加载，JSAPI通过`initAMapApiLoader`方法进行加载，该方法的调用可以放在main.js中，也可以放在使用地图组件的页面的`beforeMounted`生命周期里.
```ts
import {initAMapApiLoader} from '@vuemap/vue-amap';
initAMapApiLoader({
  key: 'YOUR_KEY'
})
```

## JSAPI释放 <Badge text="2.1.0+" />
在某些特殊的需求中可能会存在不同组件库或者手动与自动同时存在的情况，这时候就需要在切换不同组件库时进行相应的JSAPI的释放。
```ts
import {resetJsApi} from '@vuemap/vue-amap';
resetJsApi()
```

## 坐标系转化  <Badge text="2.1.0+" />
坐标系转化是所有做地图方面开发经常遇到的问题，组件库内置了常见的WGS84、gcj02、bd09三个坐标系之间的转化。

```ts
// wgs84转高德
import {gps84_To_gcj02} from '@vuemap/vue-amap'

// 高德转wgs84
import {gcj02_To_gps84} from '@vuemap/vue-amap'

//百度转高德
import {bd09_To_gcj02} from '@vuemap/vue-amap'

//高德转百度
import {gcj02_To_bd09} from '@vuemap/vue-amap'

```

## 内置组件TS实例  <Badge text="2.1.0+" />
在使用组合式API和TS进行开发时，经常会使用到组件实例进行一些特殊的处理，组件库对于所有的组件都提供了对应的实例对象的TS类。
```ts
import {ref} from 'vue'
import type {ElAmapInstance} from '@vuemap/vue-amap'

const mapRef = ref<ElAmapInstance>()
const map = mapRef.value?.$$getInstance()
```




