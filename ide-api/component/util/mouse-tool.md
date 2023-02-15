---
title: AmapMouseTool
---

# AmapMouseTool
鼠标工具插件。通过该插件，可进行鼠标画标记点、线、多边形、矩形、圆、距离量测、面积量测、拉框放大、拉框缩小等功能

## Attributes

Attribute | Type    | Description
---|---------|---|
type | String  | 类型，默认 marker，可选值'marker', 'circle', 'rectangle', 'polyline', 'polygon', 'measureArea', 'rule', 'rectZoomIn', 'rectZoomOut'
drawOptions | Object  | 设置绘制的图形的属性，可以实时更改，在切换时会生效，默认 null
autoClear | Boolean   | 是否自动清除地图上的绘制的图形，默认true
showTooltip | Boolean  | 是否显示提示信息，默认 true
tooltipTextMap | Object | 是否可见
textOptions | Object | 提示信息的text的属性
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters  | Description
---|-------------|---|
init | Object      | 组件实例
draw | data,target | 绘制事件
