---
title: ThreeJS的图层
description: 基于高德地图2.0和threeJS加载Gltf模型，提供基础加载功能，开放threeJS对象用于后续细致操作
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, Gltf, threeJS
---

# ThreeJS的图层
ThreeJS图层，基于AMap.GLCustomLayer，增加通用的配置，目前包含lights（灯光）、hdr。
可以通过获取scene来自定义添加模型。

## 基础示例

::: demo
examples/three/three-gltf
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
lights  | Array | 配置灯光数据，具体参数见下面`已废弃，请使用灯光组件，更适合后续灯光控制`
hdr | Object | HDR功能配置，具体参数见下面
alpha | Boolean | canvas是否包含alpha (透明度)。默认为 false
antialias | Boolean | 是否执行抗锯齿。默认为false

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1

### HDR配置
```html
{
  urls: [], // HDR贴图下载地址，需要6个文件，代表6个方向
  path: '/', // HDR下载地址的路径前缀
  exposure: 1.0 // 光亮程度
}
```

### 灯光配置
```html
{
  type: 'DirectionalLight', //灯光类型， 可选值见下面的字典
  args: [], //灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
  position: {
    x: 0,
    y: 0,
    z: 0
  }, //光源的位置
  lookAt: {
    x: 0,
    y: 0,
    z: 0
  } //光源查看的目标点
}

const lightTypes = {
  AmbientLight: THREE.AmbientLight, // 环境光  环境光会均匀的照亮场景中的所有物体
  DirectionalLight: THREE.DirectionalLight, // 平行光  平行光是沿着特定方向发射的光
  HemisphereLight: THREE.HemisphereLight, // 半球光  光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
  PointLight: THREE.PointLight, // 点光源  从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
  RectAreaLight: THREE.RectAreaLight, // 平面光光源  平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源
  SpotLight: THREE.SpotLight // 聚光灯  光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
};
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.CustomLayer | 获取实例
$$getScene | THREE.Scene | 获取场景对象
$$getRender | WebGLRenderer | 获取WebGLRenderer对象
$$refresh |   | 刷新图层

## 事件

事件 | 参数             | 说明
---|----------------|---|
init | [ThreeLayer](https://github.com/yangyanggu/vue-amap/blob/dev/src/packages/ext/ThreeLayer/ThreeLayer.ts) | 实例初始化结束

