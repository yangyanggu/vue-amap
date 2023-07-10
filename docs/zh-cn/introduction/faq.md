---
title: 常见问题
description: 组件库使用过程中的常见问题
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 常见问题
---

# 常见问题

---

下面主要记录在使用`@vuemap/vue-amap`时经常碰到的问题和解决方案。


## 地图不加载

在地图组件已经在main.js中引入并且初始化的前提下出现地图不加载情况，按下面步骤进行检查

* 检查el-amap父容器（div）是否有高度，可以使用浏览器的F12检查
* 项目中是否使用mockjs去拦截所有请求，mock功能有可能会拦截地图的加载请求
* 地图使用的key必须是Web端(JS API)

## 地图接口提示 INVALID_USER_SCODE

地图接口提示`INVALID_USER_SCODE`时代表初始化地图的时候没有配置安全密钥或者安全代理，可以在`initAMapApiLoader`时候传入相应参数，
配置安全密钥或者安全代理只需要配置一个即可，推荐配置安全代理。[官方文档地址](https://lbs.amap.com/api/jsapi-v2/guide/abc/load)，示例：
```javascript
initAMapApiLoader({
  key: 'YOUR_KEY',
  serviceHost: 'HOST',
  securityJsCode: 'CODE' // serviceHost与securityJsCode二选一
});
```

## TS提示AMap找不到

在使用TS开发地图时，一旦使用了原生AMap会提示AMap找不到，可以在自己的全局的.d.ts文件中加上
```ts
declare let AMap: any;
declare let Loca: any;
```

## 自动导入失败

在使用```unplugin-vue-components``` 、 ```unplugin-auto-import``` 、 ```@vuemap/unplugin-resolver```做组件自动导入功能的时候出现报错或者自动导入不生效

当出现报错时：
```text
/* unplugin-vue-components disabled */import { ElAmap as __unplugin_components_0 } from 'element-plus/es';import 'element-plus/es/components/amap/style/css'; ^
import { ref } from 'vue';
import { defineComponent as _defineComponent } from "vue";
```
出现该报错是因为使用了`ElementPlusResolver`，使用该resolver时需要添加过滤参数：
```js
ElementPlusResolver({
        exclude: /^ElAmap[A-Z]*/
      })
```

当出现自动导入没有生效时，基本都是因为使用了tsx的原因，`unplugin-vue-components`默认不检查`.tsx`后缀的文件，需要在初始化的时候加上参数：
```js
Components({
  resolvers: [VueAmapResolver()],
  include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.tsx\?tsx/],
})
```

## 地图拖拽卡顿

当出现地图拖拽卡顿时可以从以下几个方向检查
* 地图的实例map对象是否被vue管理，比如赋值给ref或者reactive
* 地图上的marker组件是否过多，marker是基于dom实现，当点位太多时会导致拖拽卡顿，比如几百个点
* loca下的图层是否很多，当图层太多时，可以把不需要事件的图层组件的initEvents属性设置为false，默认情况下每个loca下的组件都会启动事件功能

## 地图标点误差很大
windows 11兼容性不好，导致系统缩放是自定义，地图缩放是100%。在设置->系统->屏幕，找到缩放，调整回100%即可。
