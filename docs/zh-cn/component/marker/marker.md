---
title: 点标记
description: AMap.Marker 点标记适用于用户需要在地图上创建一个标记的场景
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 点标记, AMap.Marker
---

# 点标记 (AMap.Marker)
点标记适用于用户需要在地图上创建一个标记的场景。Marker 类型推荐在数据量为 500 以内时使用。若数据量大于 500 ，推荐使用 LabelMarker，可以获得更好的性能。另外需要地图标注可以避让用户标注时，也推荐使用 LabelMarker。

## 基础示例

::: demo
examples/marker/marker
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
topWhenClick | Boolean | 鼠标点击时marker是否置顶，默认false ，不置顶
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上, 默认值：false。
zooms | Array | 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
anchor | String, Array | 设置点标记锚点，可选值：'top-left','top-center','top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
position | Array | 点标记在地图上显示的位置`支持v-model`
offset | Array | 点标记显示位置偏移量，默认值为 [0,0] 。Marker指定position后，默认以marker左上角位置为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
icon | String AMap.Icon | 在点标记中显示的图标。可以传一个图标地址，也可以传Icon对象。有合法的content内容设置时，此属性无效。
content | String HTMLElement | 点标记显示内容。可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖。 支持slot
draggable | Boolean | 设置点标记是否可拖拽移动，默认为false。
cursor | String | 指定鼠标悬停时的鼠，默认值：'pointer'
angle | Number | 点标记的旋转角度，，广泛用于改变车辆行驶方向。默认值：0
title | String | 鼠标滑过点标记时的文字提示。不设置则鼠标滑过点标无文字提示。
clickable | Boolean | 点标记是否可点击，默认值: true
label | {content,offset: [x, y]} | 添加文本标注，content为文本标注的内容，offset为偏移量，为偏移量,如设置了 direction，以 direction 方位为基准点进行偏移。
extData | any | 用户自定义属 ，支持JavaScript API任意数据类型，如 Marker的id等。可将自定义数据保存在该属性上，方便后续操作使用。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.Marker | 获取`marker`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.Marker | `AMap.Marker`实例
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
rightclick | MapsEvent | 鼠标右键单击事件
mousemove | MapsEvent | 鼠标移动
mouseover | MapsEvent | 鼠标移近点标记时触发事件
mouseout | MapsEvent | 鼠标移出点标记时触发事件
mousedown | MapsEvent | 鼠标在点标记上按下时触发事件
mouseup | MapsEvent | 鼠标在点标记上按下后抬起时触发事件
dragstart | MapsEvent | 开始拖拽点标记时触发事件
dragging | MapsEvent | 鼠标拖拽移动点标记时触发事件
dragend | MapsEvent | 点标记拖拽移动结束触发事件
moving |  | 点标记在执行moveTo，moveAlong动画时触发事件，Object对象的格式是{passedPath:Array.}。其中passedPath为对象在moveAlong或者moveTo过程中走过的路径。
moveend |  | 点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发
movealong |  | 点标记执行moveAlong动画一次后触发事件
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
