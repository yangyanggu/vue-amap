---
title: 聚光灯
description: 光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
head:
  - - meta
    - name: keywords
      content: 聚光灯, SpotLight
---

# 聚光灯
光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大。

::: tip
来源 ```@vuemap/vue-amap-extra``` 组件库
:::

## 基础示例

::: demo
examples/three/three-gltf
:::


## 动态属性
支持响应式。

名称 | 类型                                         | 说明
---|--------------------------------------------|---|
color  | String                       | 颜色,默认#ffffff
intensity | Number                       | 光照的强度。缺省值为 1
distance | Number                       | 这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)。缺省值 0
angle | Number                       | 光线散射角度，最大为Math.PI/2
penumbra | Number                       | 聚光锥的半影衰减百分比。在0和1之间的值。默认为0
decay | Number                       | 沿着光照距离的衰退量。缺省值 1
position | {x:number,y:number,z:number} | 灯光位置
target | Object3D                     | 灯光目标

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回    | 说明
---|-------|---|
$$getInstance() | ThreeLightSpot | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | ThreeLightSpot | 实例初始化结束

