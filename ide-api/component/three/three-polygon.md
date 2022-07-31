---
title: AmapThreePolygon
---

# AmapThreePolygon
ThreeJS的面图层，支持侧面贴图，主要用于生成建筑

## Attributes

Attribute | Type   | Description
---|--------|---|
sideColor  | String | 侧面颜色, 默认 #ffffff
sideTexture | String | 侧面贴图图片地址，侧面优先使用该属性,默认空
topColor | String | 顶部颜色, 默认 #ffffff
bottomColor | String | 底部颜色, 默认 #ffffff
height | Number | 楼层高度，优先读取geojson数据中properties中的height，默认 30
depthTest | Boolean | 是否进行深度检测， 默认 true
source | Object | geojson数据

## Events

Event Name | Parameters | Description
---|------------|---|
init | ThreePolygon      | 实例初始化结束

