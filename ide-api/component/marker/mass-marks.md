---
title: AmapMassMarks
---

# AmapMassMarks
海量点类

## Attributes

Attribute | Type | Description
---|---|---|
data | Array | 海量点数据
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
zooms | Array | 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
cursor | String | 指定鼠标悬停时的鼠，默认值：'pointer'
styles | Array, Object | 标号样式，可以是Object代表所有点样式一样，也可以是Array，根据各个点的设定来判断选择哪个样式

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.MassMarks | `AMap.MassMarks`实例
complete | | 海量点加载完成事件
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
mousemove | MapsEvent | 鼠标移动
mouseover | MapsEvent | 鼠标移近点标记时触发事件
mouseout | MapsEvent | 鼠标移出点标记时触发事件
mousedown | MapsEvent | 鼠标在点标记上按下时触发事件
mouseup | MapsEvent | 鼠标在点标记上按下后抬起时触发事件
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
