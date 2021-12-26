---
title: AmapLoca
---

# AmapLoca
图层的容器和控制器

## Attributes

Attribute | Type    | Description
---|---------|---|
ambLight | Object  | 环境光，对于可以接受光照的图层（PolygonLayer 等）会增加环境光的影响
dirLight | Object | 平行光，对于可以接受光照的图层（PolygonLayer 等）会增加平行光的影响。平行光一般用来模拟太阳的光照。它的方向由 position 射向 target。position和target的坐标是一个位置加 z 值（单位米）高度决定。比如: [1, 1, 1000] 代表x:1, y:1, 高度1000米。
pointLight | Object  | 点光，对于可以接受光照的图层（PolygonLayer 等）会增加点光的影响。点光源通常用来突出展示场景中的某些物体。

## Events

Event Name | Parameters | Description
---|---|---|
init | Loca.Container | 实例
