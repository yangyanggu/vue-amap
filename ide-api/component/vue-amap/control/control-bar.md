---
title: AmapControlControlBar
---

# AmapControlControlBar
组合了旋转、倾斜、复位在内的地图控件


## Attributes

Attribute | Type | Description
---|---|---|
position| String, Object | 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
offset | String | 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范。
showControlButton | Boolean | 是否显示倾斜、旋转按钮。默认为 true
visible | Boolean | 是否显示，默认true
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false


## Events

Event Name | Parameters | Description 
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
