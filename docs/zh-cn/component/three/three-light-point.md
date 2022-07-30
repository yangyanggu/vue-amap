---
title: 点光源
description: 从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, PointLight, threeJS
---

# 点光源
从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。

## 基础示例

::: demo
examples/three/three-gltf
:::


## 动态属性
支持响应式。

名称 | 类型                                         | 说明
---|--------------------------------------------|---|
color | String                                     | 环境光颜色，可以是rgba，或者red之类的,默认#ffffff
intensity | Number                              | 光照的强度。缺省值为 1
distance | Number                              |  这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)。缺省值 0
decay | Number                              | 沿着光照距离的衰退量。缺省值 1
position | {x:number,y:number,z:number} | 灯光位置

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回    | 说明
---|-------|---|
$$getInstance() | ThreeLightPoint | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | ThreeLightPoint | 实例初始化结束

