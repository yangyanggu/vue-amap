---
home: true
title: 官网
description: vuemap/vue-amap是基于vue3.0对高德amap2.0和loca2.0进行封装的地图组件，支持依赖自动注入和tree-shaking
head:
  - - meta
    - name: keywords
      content: vue-amap, amap, 高德地图, vue, vue3, loca, tree-shaking, threejs
heroImage: https://vuejs.org/images/logo.png
actions:
  - text: 快速上手
    link: /zh-cn/introduction/init.html
    type: primary
  - text: 项目简介
    link: /zh-cn/introduction/introduction.html
    type: secondary
features:
  - title: Vue 驱动
    details: 享受 Vue 的开发体验，只需要关注数据变化。
  - title: 全面
    details: 接入amap2.0和loca所有常用组件。
  - title: 可自定义
    details: 提供多个接口开发原生对象，方便快速实现自定义功能。
  - title: 完善TS支持
    details: 基于官方types文件完善，提供loca的types。
footer: MIT Licensed | Copyright © 2021-present guyy <a href="https://beian.miit.gov.cn" target="_blank">苏ICP备19020085号-1</a> 本网站由<a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank"><img style="height:22px;" src="/images/youpaiyun.png" /></a>提供CDN加速/云存储服务
footerHtml: true
---

## npm 安装

推荐 npm 安装。

```
// 安装amap基础库
npm install @vuemap/vue-amap --save
// 安装loca库
npm install @vuemap/vue-amap-loca --save
// 安装扩展库（threejs）
npm install @vuemap/vue-amap-extra --save
```

## CDN

目前可通过 [unpkg.com/@vuemap/vue-amap](https://unpkg.com/@vuemap/vue-amap/dist/index.js) 获取最新版本的资源。

```html
<script src="https://unpkg.com/@vuemap/vue-amap/dist/index.js"></script>
<script src="https://unpkg.com/@vuemap/vue-amap/dist/style.css"></script>
```

