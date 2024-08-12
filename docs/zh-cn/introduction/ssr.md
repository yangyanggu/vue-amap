---
title: Nuxt服务端渲染
description: Nuxt服务端渲染
head:
  - - meta
    - name: keywords
      content: 高德地图, 服务端渲染, Nuxt服务端渲染
---

# 说明

由于组件库内部使用的插件会使用部分特殊的对象，比如`process`、`window`。因此在使用时需要根据Nuxt要求处理加载顺序和对象的默认值处理。<br/>
[Nuxt示例](https://github.com/yangyanggu/vue-amap-nuxt-demo)

## 加载高德地图api

高德地图api的加载时间需要更改为在vue的`onBeforeMount`生命周期中执行，示例如下：

#### 1. 创建`mapLoadUtil.js`
```javascript
import {initAMapApiLoader} from "@vuemap/vue-amap";
export function initMapApi(){
  initAMapApiLoader({
    key: 'XXXXX',
  })
}
```

#### 2. 创建Nuxt的`mapLoaded.js`插件
需要创建插件处理process对象，从`2.0.18`版本开始不再需要该处理方案
```javascript
if(typeof process!== 'undefined'){
    process.env = process.env || {}
}
export default defineNuxtPlugin((nuxtApp) => {
})
```

#### 3. 加载CSS文件
修改Nuxt配置`nuxt.config.ts`
```javascript
export default defineNuxtConfig({
  css: ['@vuemap/vue-amap/dist/style.css'],
})
```
#### 4. 页面加载组件
在`onBeforeMount`中加载JSAPI。同时组件需要放入`ClientOnly`组件中。
```vue
<template>
  <div class="map-container">
    <ClientOnly>
      <ElAmap></ElAmap>
    </ClientOnly>
  </div>
</template>

<script setup>
import {initMapApi} from "~/util/mapLoadUtil";
import {onBeforeMount} from 'vue';
import {ElAmap} from "@vuemap/vue-amap";

onBeforeMount(() => {
  initMapApi()
})
</script>

<style scoped>
.map-container{
  height: 500px;
}
</style>

```
