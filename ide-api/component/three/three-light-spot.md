---
title: AmapThreeLightSpot
---

# AmapThreeLightSpot
光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大。

## Attributes

Attribute | Type                         | Description
---|------------------------------|---|
color  | String                       | 颜色
intensity | Number                       | 光照的强度。缺省值为 1
distance | Number                       | 这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)。缺省值 0
angle | Number                       | 光线散射角度，最大为Math.PI/2
penumbra | Number                       | 聚光锥的半影衰减百分比。在0和1之间的值。默认为0
decay | Number                       | 沿着光照距离的衰退量。缺省值 1
position | {x:number,y:number,z:number} | 灯光位置
target | Object3D                     | 灯光目标

## Events

Event Name | Parameters | Description
---|------------|---|
init | ThreeLightSpot      | 实例初始化结束

