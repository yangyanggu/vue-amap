---
title: AmapThreeLightHemisphere
---

# AmapThreeLightHemisphere
光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。

## Attributes

Attribute | Type                                | Description
---|-------------------------------------|---|
color  | String                              | 天空中发出光线的颜色
groundColor  | String                              | 地面发出光线的颜色
intensity | Number                              | 光照的强度。缺省值为 1
position | {x:number,y:number,z:number} | 灯光位置

## Events

Event Name | Parameters | Description
---|------------|---|
init | ThreeLightHemisphere      | 实例初始化结束

