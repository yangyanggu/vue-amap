
# @vuemap/vue-amap
[![npm (tag)](https://img.shields.io/npm/v/@vuemap/vue-amap)](https://www.npmjs.org/package/@vuemap/vue-amap)
[![NPM downloads](https://img.shields.io/npm/dm/@vuemap/vue-amap.svg)](https://npmjs.org/package/@vuemap/vue-amap)
![JS gzip size](https://img.shields.io/bundlephobia/minzip/%40vuemap/vue-amap/latest)
[![NPM](https://img.shields.io/npm/l/@vuemap/vue-amap)](https://gitee.com/guyangyang/vue-amap)
[![star](https://gitee.com/guyangyang/vue-amap/badge/star.svg?theme=dark)](https://gitee.com/guyangyang/vue-amap/stargazers)
[![GitHub Repo stars](https://img.shields.io/github/stars/yangyanggu/vue-amap)](https://github.com/yangyanggu/vue-amap)

## 其他语言说明
* [English](./README_en.md)

## 文档
**[https://vue-amap.guyixi.cn](https://vue-amap.guyixi.cn)**

> @vuemap/vue-amap是一套基于Vue3 和高德地图2.0的地图组件。
> 该版本对原vue-amap组件进行升级，主要适配amap2.0相关的接口，同时调整事件绑定形式，调整为使用v-on进行事件绑定。
> 组件中将会对高德可视化组件loca进行封装，同时提供threejs的接口
> 该项目基于 https://github.com/ElemeFE/vue-amap/ 开发
> 支持全量导入、按需导入和自动导入

>vue2请使用0.x版本，对应分支vue2

```html
觉得有用可以给个star
```

## 捐赠支持
<img src="./image/zhifubao.jpg" alt="支付宝" width="270px" />
<img src="./image/weixin.png" alt="微信" width="270px"/>

## 安装
```
// 安装核心库
npm i -S @vuemap/vue-amap
// 安装loca相关库
npm i -S @vuemap/vue-amap-loca
// 安装其他扩展库，主要为threejs相关
npm i -S @vuemap/vue-amap-extra
```

## 快速上手

引入@vuemap/vue-amap

```javascript
// 引入vue-amap
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';

// 初始化vue-amap
initAMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
  securityJsCode: 'securityJsCode', // 新版key需要配合安全密钥使用
  //Loca:{
  //  version: '2.0.0'
  //} // 如果需要使用loca组件库，需要加载Loca
});
createApp(App).use(VueAMap)

```

## 自动导入
首先你需要安装```unplugin-vue-components``` 、 ```unplugin-auto-import``` 、 ```@vuemap/unplugin-resolver```这三款插件

> 注意，对于使用@vuemap/vue-amap@1版本的来说，```@vuemap/unplugin-resolver```版本必须使用1.x.x版本

### 使用@vuemap/vue-amap@latest 版本
```shell
npm install -D unplugin-vue-components unplugin-auto-import @vuemap/unplugin-resolver
```

### 使用@vuemap/vue-amap@1 版本
```shell
npm install -D unplugin-vue-components unplugin-auto-import @vuemap/unplugin-resolver@1
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

## 组件

### 地图

```vue
<el-amap  :zoom="zoom" :center="center">
</el-amap>
```

