---
title: AmapLayerIndoorMap
---

# AmapLayerIndoorMap
室内图层，用于在适当级别展示室内地图，并提供显示商铺tip、切换楼层等功能。

## Attributes

Attribute | Type | Description
---|---|---|
cursor  | String | 指定鼠标悬停到店铺面时的鼠标样式
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1
hideFloorBar  | Boolean | 是否隐藏楼层切换控件，默认值：false

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.IndoorMap | 实例初始化结束
