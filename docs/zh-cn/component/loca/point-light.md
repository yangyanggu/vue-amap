---
title: 点光
description: 点光，对于可以接受光照的图层（PolygonLayer 等）会增加点光的影响
head:
  - - meta
    - name: keywords
      content: 点光, Loca.PointLight
---

# 点光 (Loca.PointLight)
点光，对于可以接受光照的图层（PolygonLayer 等）会增加点光的影响。点光源通常用来突出展示场景中的某些物体。 它的位置和平行光不太一样，x和y是地图上的经纬度位置，z是高度米，比如北京上空一万米的位置放一个点光源：position: [116.39079, 39.90624, 10000]。 光照的distance代表光能照射的最远距离是多少

::: tip
来源 ```@vuemap/vue-amap-loca``` 组件库
:::

## 基础示例

::: demo
examples/loca/point-light
:::

## 静态属性

名称 | 类型 | 说明
---|---|---|
color | String | 点光颜色
intensity | Number | 光照强度
position | `Array<Number>` | 点光位置
distance | Number | 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.PointLight | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.PointLight | 实例
