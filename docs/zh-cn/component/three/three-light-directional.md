---
title: 平行光
description: 平行光是沿着特定方向发射的光
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, DirectionalLight, threeJS
---

# 平行光
平行光是沿着特定方向发射的光。这种光的表现像是无限远,从它发出的光线都是平行的。常常用平行光来模拟太阳光 的效果; 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的。

## 基础示例

::: demo
examples/three/three-gltf
:::


## 动态属性
支持响应式。

名称 | 类型                                         | 说明
---|--------------------------------------------|---|
color | String                                     | 环境光颜色，可以是rgba，或者red之类的
intensity | Number                              | 光照的强度。缺省值为 1
position | {x:number,y:number,z:number} | 灯光位置
target | Object3D | 物体，配置后，平行光将跟着物体

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回    | 说明
---|-------|---|
$$getInstance() | ThreeLightDirectional | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | ThreeLightDirectional | 实例初始化结束

