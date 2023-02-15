---
title: AmapLabelMarker
---

# AmapLabelMarker
标注类

## Attributes

Attribute | Type | Description
---|---|---|
name  | String | 标注名称，作为标注标识，并非最终在地图上显示的文字内容，显示文字内容请设置 opts.text.content
rank  | Number | 避让优先级，获取标注的优先级，该优先级用于 labelsLayer 支持避让时，rank 值大的标注会避让掉 rank 值低的标注。默认值：1
visible | Boolean | 标注是否可见，默认为true。
zIndex | Number | 标注的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：1
position | Array | 标注在地图上显示的位置
zooms | Array | 标注显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
icon | Object | 标注图标设置
text  | Object | 标注文本设置
extData | any | 用户自定义属 ，支持JavaScript API任意数据类型，如 Marker的id等。可将自定义数据保存在该属性上，方便后续操作使用。
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.LabelMarker | `AMap.LabelMarker`实例
click | MapsEvent | 鼠标左键单击事件
mousemove | MapsEvent | 鼠标移动
mouseover | MapsEvent | 鼠标移近点标记时触发事件
mouseout | MapsEvent | 鼠标移出点标记时触发事件
mousedown | MapsEvent | 鼠标在点标记上按下时触发事件
mouseup | MapsEvent | 鼠标在点标记上按下后抬起时触发事件
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
