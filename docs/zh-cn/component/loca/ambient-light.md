---
title: 环境光
description: 环境光，对于可以接受光照的图层（PolygonLayer 等）会增加环境光的影响。环境光只能有一个，多余的会被忽略
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, loca, 环境光, Loca.AmbientLight
---

# 环境光 (Loca.AmbientLight)
环境光，对于可以接受光照的图层（PolygonLayer 等）会增加环境光的影响。环境光只能有一个，多余的会被忽略

## 基础示例

::: demo
examples/loca/ambient-light
:::


## 静态属性

名称 | 类型 | 说明
---|---|---|
color | String | 环境光颜色
intensity | Number | 环境光强度

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.AmbientLight | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.AmbientLight | 实例
