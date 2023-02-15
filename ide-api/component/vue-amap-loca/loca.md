---
title: AmapLoca
---

# AmapLoca
图层的容器和控制器

## Attributes

Attribute | Type    | Description
---|---------|---|
eventOptions | Object `{hitFirst: true}` | 事件属性，hitFirst是设置是否在选择到第一个要素后停止选择，用于事件数据选取，默认true
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init | Loca.Container | 实例
click | \[Feature\], event | 当点击到标号时返回对应的feature数组，无数据时返回空数组
mousemove | \[Feature\], event     | 当鼠标移动滑过标号时返回对应的feature数组，无数据时返回空数组
rightclick | \[Feature\], event     | 鼠标右击时返回对应的feature数组，无数据时返回空数组
