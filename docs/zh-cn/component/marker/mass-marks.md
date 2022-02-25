---
title: 海量点
description: AMap.MassMarks 展示数量为十万以内的点并有较好的性能表现
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 海量点标记, AMap.MassMarks
---

# 海量点标记 (AMap.MassMarks)
当需要在地图展示数量为十万以内的点并且需要较好的性能表现时，可以使用 AMap.MassMarks 类。AMap.MassMarks 并不是普通的覆盖物，它实际上是由海量点组成的一个地图图层， 目前仅适用于html5浏览器。

## 基础示例

::: demo
examples/marker/mass-marker
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|


## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
data | Array | 海量点数据
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
zooms | Array | 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
cursor | String | 指定鼠标悬停时的鼠，默认值：'pointer'
styles | Array, Object | 标号样式，可以是Object代表所有点样式一样，也可以是Array，根据各个点的设定来判断选择哪个样式

### data参数
名称 | 类型 | 说明
---|---|---|
lnglat | Array | 经纬度
style | Number | 样式索引值

### styles参数
名称 | 类型 | 说明
---|---|---|
url | String | 图标 url
size | Array | 图标显示大小
rotation | Number | 旋转角度
anchor | Array | 锚点位置
zIndex | Number | 点展示优先级，默认为使用样式的索引值。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.MassMarks | 获取实例

## 事件

事件 | 参数 | 说明
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
