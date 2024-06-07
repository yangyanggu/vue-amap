---
title: 半球光
description: 光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色
head:
  - - meta
    - name: keywords
      content: 半球光, HemisphereLight
---

# 半球光
光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。

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
color | String                                     | 天空中发出光线的颜色。 默认 #ffffff
broundColor | String                                     | 地面发出光线的颜色。 默认 #ffffff
intensity | Number                              | 光照的强度。缺省值为 1
position | {x:number,y:number,z:number} | 灯光位置

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回    | 说明
---|-------|---|
$$getInstance() | ThreeLightHemisphere | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | ThreeLightHemisphere | 实例初始化结束

