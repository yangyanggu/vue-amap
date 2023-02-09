---
title: AmapLocaPointLight
---

# AmapLocaPointLight
点光，对于可以接受光照的图层（PolygonLayer 等）会增加点光的影响。点光源通常用来突出展示场景中的某些物体。 它的位置和平行光不太一样，x和y是地图上的经纬度位置，z是高度米，比如北京上空一万米的位置放一个点光源：position: [116.39079, 39.90624, 10000]。 光照的distance代表光能照射的最远距离是多少

## Attributes

Attribute | Type | Description
---|---|---|
color | String | 点光颜色
intensity | Number | 光照强度
position | Array<Number> | 点光位置
distance | Number | 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失

## Events

Event Name | Parameters | Description
---|---|---|
init | Loca.PointLight | 实例
