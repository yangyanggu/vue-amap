---
title: AmapControlScale
---

# AmapControlScale
位于地图右下角，用户可控制其显示与隐藏。继承自 AMap.Control


## Attributes
仅且可以初始化配置，不支持响应式。

Attribute | Type | Description
---|---|---|
position| String, Object | 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
offset | String | 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范。
animateEnable | Array | 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
visible | Boolean | 是否显示，默认true


## Events

Event Name | Parameters                      | Description
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
