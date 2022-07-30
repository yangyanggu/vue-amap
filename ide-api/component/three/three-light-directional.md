---
title: AmapThreeLightDirectional
---

# AmapThreeLightDirectional
平行光是沿着特定方向发射的光。这种光的表现像是无限远,从它发出的光线都是平行的。常常用平行光来模拟太阳光 的效果; 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的

## Attributes

Attribute | Type                                | Description
---|-------------------------------------|---|
color  | String                              | 颜色
intensity | Number                              | 光照的强度。缺省值为 1
position | {x:number,y:number,z:number} | 灯光位置
target | Object3D | 物体，配置后，平行光将跟着物体

## Events

Event Name | Parameters | Description
---|------------|---|
init | ThreeLightAmbient      | 实例初始化结束

