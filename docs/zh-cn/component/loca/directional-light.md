---
title: 平行光
description: 平行光，对于可以接受光照的图层（PolygonLayer 等）会增加平行光的影响
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, loca, 平行光, Loca.DirectionalLight
---

# 平行光 (Loca.DirectionalLight)
平行光，对于可以接受光照的图层（PolygonLayer 等）会增加平行光的影响。平行光一般用来模拟太阳的光照。 它的方向由 position 射向 target。position和target的坐标是一个位置加 z 值（单位米）高度决定。比如: [1, 1, 1000] 代表x:1, y:1, 高度1000米。 如果模拟一个从正南方向的平行光，可以设置target: [0,0,0], position: [0,-1,0]

## 基础示例

::: demo
examples/loca/directional-light
:::

## 静态属性

名称 | 类型 | 说明
---|---------------|---|
color | String        | 平行光颜色
intensity | Number        | 平行光强度
position | `Array<Number>` | 坐标位置
target | `Array<Number>` | 光射向的目标位置
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.DirectionalLight | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.DirectionalLight | 实例
