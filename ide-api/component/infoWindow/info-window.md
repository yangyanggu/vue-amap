---
title: AmapInfoWindow
---

# AmapInfoWindow
用于在地图上展示复杂的说明性信息的类型。<br/>信息窗体，地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸

## Attributes

Attribute | Type | Description
---|---|---|
isCustom | Boolean | 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
autoMove | Boolean | 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
avoid  | Boolean | autoMove 为 true 时，自动平移到视野内后的上右下左的避让宽度。默认值： [20, 20, 20, 20]
closeWhenClickMap | Boolean | 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
offset | Array | 信息窗体显示位置偏移量。默认基准点为信息窗体的底部中心。默认值: [0, 0]
visible | Boolean | 是否可见，默认 true。支持sync
content | String, HTMLElement | 显示内容，可以是HTML要素字符串或者HTMLElement对象。也可以根据示例中的方式使用slot实现
size | Array | 信息窗体尺寸（isCustom为true时，该属性无效）
anchor | String  | 信息窗体锚点。默认值：'bottom-center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
position | Array | 信息窗体显示基点位置
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例
open| |信息窗体打开之后触发事件
close| |信息窗体关闭之后触发事件
