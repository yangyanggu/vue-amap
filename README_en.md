
# @vuemap/vue-amap
[![npm (tag)](https://img.shields.io/npm/v/@vuemap/vue-amap)](https://www.npmjs.org/package/@vuemap/vue-amap)
[![NPM downloads](https://img.shields.io/npm/dm/@vuemap/vue-amap.svg)](https://npmjs.org/package/@vuemap/vue-amap)
![JS gzip size](https://img.shields.io/bundlephobia/minzip/%40vuemap/vue-amap/latest)
[![NPM](https://img.shields.io/npm/l/@vuemap/vue-amap)](https://gitee.com/guyangyang/vue-amap)
[![star](https://gitee.com/guyangyang/vue-amap/badge/star.svg?theme=dark)](https://gitee.com/guyangyang/vue-amap/stargazers)
[![GitHub Repo stars](https://img.shields.io/github/stars/yangyanggu/vue-amap)](https://github.com/yangyanggu/vue-amap)

## Other language README
* [中文](./README.md)

## Document
**[https://vue-amap.guyixi.cn](https://vue-amap.guyixi.cn)**


## Introduce
* @vuemap/vue-amap is a map component based on Vue3 and AMap 2.0. 
* This version upgrades the original `vue-amap` component, mainly adapting to amap2.0 related interfaces, while adjusting the event binding form to use v-on for event binding。
* The component will encapsulate the AMap visualization component loca and provide an interface for Threejs.
* This project is based on https://github.com/ElemeFE/vue-amap/ development.
* Support full import, on-demand import, and automatic import

>Please use version 0. x for vue2, corresponding to the branch vue2

```html
If you think it's useful, you can give it a star
```

## Install
```
// Install core library
npm i -S @vuemap/vue-amap
// Install loca related libraries
npm i -S @vuemap/vue-amap-loca
// Install other extension libraries, mainly related to Threejs
npm i -S @vuemap/vue-amap-extra
```

## Quick Start

import @vuemap/vue-amap

```javascript
// import
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';

// init
initAMapApiLoader({
  // AMap key
  key: 'YOUR_KEY',
  securityJsCode: 'securityJsCode', // The new version of the key needs to be used in conjunction with a secure key
  //Loca:{
  //  version: '2.0.0'
  //} // If you need to use the Loca component library, you need to load Loca
});
createApp(App).use(VueAMap)

```

## Auto Import
First you need install ```unplugin-vue-components``` 、 ```unplugin-auto-import``` 、 ```@vuemap/unplugin-resolver```

> Warning，If you want to use @vuemap/vue-amap@1，```@vuemap/unplugin-resolver```must use 1.x.x version

### Use @vuemap/vue-amap@latest version
```shell
npm install -D unplugin-vue-components unplugin-auto-import @vuemap/unplugin-resolver
```

### Use@vuemap/vue-amap@1 version
```shell
npm install -D unplugin-vue-components unplugin-auto-import @vuemap/unplugin-resolver@1
```

Then import CSS and initialize keys in main.ts
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
Modify the configuration file again and insert the following code into your Vite or Webpack configuration file
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

## Component Demo

### Map

```vue
<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="init"
    />
  </div>
  <div class="toolbar">
    <button @click="add()">
      add marker
    </button>
  </div>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import {ElAmap} from "@vuemap/vue-amap";

  const zoom = ref(12);
  const center = ref([121.59996, 31.197646]);
  let map = null;
  const init = (e) => {
    const marker = new AMap.Marker({
      position: [121.59996, 31.197646]
    });
    e.add(marker);
    map = e;
    console.log('map init: ', map)
  }
  const add = () => {
    const marker = new AMap.Marker({
      position: [121.59996, 31.177646]
    });
    map.add(marker);
  }
</script>

<style>
</style>

```

