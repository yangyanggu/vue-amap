---
title: AmapCircleMarker
---

# AmapCircleMarker
构造圆形对象，通过CircleOptions指定多边形样式

## Attributes

Attribute | Type | Description
---|---|---|
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）默认值：false
center | Array| 圆心位置
radius | Number | 圆半径，单位:px 最大值64
cursor | String | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
visible | Boolean | 是否可见
zIndex | Number | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示默认zIndex：10
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
strokeOpacity | float | 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
strokeWeight | Number | 轮廓线宽度
fillColor | String | 多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
fillOpacity | Float | 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
draggable | Boolean | 设置多边形是否可拖拽移动，默认为false
extData | Any | 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
rightclick | MapsEvent | 右键单击
hide | {type, target} | 隐藏
show | {type, target} | 显示
mousedown | MapsEvent | 鼠标按下
mouseup | MapsEvent | 鼠标抬起
mouseover | MapsEvent | 鼠标经过
mouseout | MapsEvent | 鼠标移出
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
