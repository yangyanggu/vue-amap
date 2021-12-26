---
title: AmapLayerCustom
---

# AmapLayerCustom
自定义图层是一种完全由开发者来指定绘制方法的图层

## Attributes

Attribute | Type | Description
---|---|---|
canvas  | HTMLElement | canvas 对象,必填
render | Function | 绘制函数，初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
alwaysRender | Boolean | 是否主动，默认 false
zooms | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.CustomLayer | 实例初始化结束

