---
title: AmapThreeLightPoint
---

# AmapThreeLightPoint
从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。

## Attributes

Attribute | Type                                | Description
---|-------------------------------------|---|
color  | String                              | 颜色
intensity | Number                              | 光照的强度。缺省值为 1
distance | Number                              | 这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)。缺省值 0
decay | Number                              | 沿着光照距离的衰退量。缺省值 1
position | {x:number,y:number,z:number} | 灯光位置

## Events

Event Name | Parameters | Description
---|------------|---|
init | ThreeLightPoint      | 实例初始化结束

