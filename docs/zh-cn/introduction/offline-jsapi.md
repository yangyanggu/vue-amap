---
title: 离线JSAPI
description: 关于下载以及使用离线JSAPI的介绍
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 离线, jsapi
---

## 说明

::: warning
高德地图本身不支持离线加载，对于纯粹的内网部署需求可以走高德商务工单。当前离线部署方案主要用于希望使用高德JSAPI，然后使用自己的内部地图瓦片服务。因此有以下两点要求：
* 只能使用离线的JSAPI文件和loca文件
* 必须使用自己的瓦片服务，不可以使用内置的矢量图层、卫星图层、交通图层等
:::

## 使用步骤

### 1.下载离线JS文件

在下面的下载工具中，输入申请的JSAPI的key，选择需要使用到的插件下载JSAPI，如果使用了loca组件，那么也需要下载loca离线文件。

::: warning
下列插件只展示了支持离线使用的插件。
:::
<ClientOnly>
<vp-offline-jsapi />
</ClientOnly>

### 2.放置离线文件
将下载的amap.min.js和loca.min.js放置在`public`目录下的js文件夹中。<br/>
在index.html中加载js文件，根据自己项目需要放置amap和loca文件，其中`amap.min.js`是必须放置的文件。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script type="text/javascript" src="/js/amap.min.js"></script>
    <script type="text/javascript" src="/js/loca.min.js"></script>
</head>
<body>
<div id="app"></div>
<script type="module" src="./main.ts"></script>
</body>
</html>
```

### 3.初始化地图组件库
由于使用了离线JS文件，那么初始化地图组件库时就就必须选择离线模式。
在`main.ts`中配置组件库。
```ts
import App from './App.vue'
import {initAMapApiLoader} from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
  offline: true
})

createApp(App)
    .mount('#app')
```

### 4.使用组件库
以上步骤全部执行完后即可正常使用组件库，这时候地图初始化后会一片空白，需要使用瓦片图层加载自己的瓦片服务。
```vue
<template>
  <div style="height: 500px;">
    <el-amap
        view-mode="3D"
        :pitch="50"
        :center="center"
        :zoom="zoom"
    >
      <el-amap-layer-tile :tile-url="url"/>
      <el-amap-loca>
        <el-amap-loca-icon
            :source-data="sourceData"
            :layer-style="layerStyle"
        />
      </el-amap-loca>
    </el-amap>
  </div>
</template>

<script setup>
  import {ElAmap, ElAmapLayerTile} from '@vuemap/vue-amap'
  import {ElAmapLoca, ElAmapLocaIcon} from "@vuemap/vue-amap-loca";
  import {ref} from "vue";

  const center = ref([120, 31]);
  const zoom = ref(14)

  const url = 'https://wprd0{1,2,3,4}.is.autonavi.com/appmaptile?x=[x]&y=[y]&z=[z]&size=1&scl=1&style=8&ltype=11'

  const layerStyle = {
    unit: 'px',
    icon: 'https://a.amap.com/Loca/static/loca-v2/demos/images/traffic-control.png',
    iconSize: [40,40],
    rotation: 0,
  }

  const sourceData = ref({
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": center
      }
    }],
  })

</script>

<style scoped>
</style>

```