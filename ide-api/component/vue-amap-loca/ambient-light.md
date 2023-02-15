---
title: AmapLocaAmbientLight
---

# AmapLocaAmbientLight
环境光，对于可以接受光照的图层（PolygonLayer 等）会增加环境光的影响。环境光只能有一个，多余的会被忽略

## Attributes

Attribute | Type | Description
---|---|---|
color | String | 环境光颜色
intensity | Number | 环境光强度
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init | Loca.AmbientLight | 实例
