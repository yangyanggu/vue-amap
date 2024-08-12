---
title: Typescript支持
description: 提供完善的JSAPI和Loca的types支持，所有组件提供ts实例类型
head:
  - - meta
    - name: keywords
      content: amap, loca, typescript, ts
---

# 简介

> 组件库内所有组件都提供了对应的ts类型，用于ref使用，针对高德JSAPI和Loca实例，也提供完善的ts类型处理

---

## JSAPI、Loca类型 <Badge text="2.1.0+" />
组件库内基于官方的types文件fork了一份新的类型库，并修补完善类型，[JSAPI types](https://www.npmjs.com/package/@vuemap/amap-jsapi-types)，[Loca types](https://www.npmjs.com/package/@vuemap/amap-loca-types)。
两个类型库都针对window做了开放，因此只要在使用组件库时就可以不需要任何配置直接使用AMap命名空间和Loca命名空间下的类型。下面是使用示例。
```vue
<template>
  <div class="map-page-container">
    <el-amap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      @init="init"
    />
  </div>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import {ElAmap} from "@vuemap/vue-amap";

  const zoom = ref(12);
  const center = ref([121.59996, 31.197646]);
  const init = (map: AMap.Map) => {
    // 可以直接使用AMap.Marker对象，因为AMap已经被添加到Window下
    const marker = new AMap.Marker({
      position: [121.59996, 31.197646]
    });
    map.add(marker);
    console.log('map init: ', map)
  }
</script>

```

## 组件实例 <Badge text="2.1.0+" />
在vue开发过程中，我们经常会需要使用`ref`来获取组件实例，组件库中针对每个组件都提供了对应的Instance实例类型，只需要在导入时给每个组件名称后加上Instance即可获取到对应的组件类型。
```vue
<template>
  <div class="map-page-container">
    <el-amap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      @init="init"
    />
  </div>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import {ElAmap} from "@vuemap/vue-amap";
  import type {ElAmapInstance} from "@vuemap/vue-amap";

  const zoom = ref(12);
  const center = ref([121.59996, 31.197646]);
  const init = (map: AMap.Map) => {
    console.log('map init: ', map)
  }
  // 这样就可以获取到ElAmap的组件实例类型
  const mapRef = ref<ElAmapInstance>(null);
</script>


```




