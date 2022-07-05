---
title: AmapLocaPointLight
---

# AmapLocaPointLight
环境光，对于可以接受光照的图层（PolygonLayer 等）会增加环境光的影响。环境光只能有一个，多余的会被忽略

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
