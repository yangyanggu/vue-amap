---
title: 信息窗体
description: AMap.InfoWindow用于在地图上展示复杂的说明性信息的类型。地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 信息窗体, AMap.InfoWindow
---

# 信息窗体(AMap.InfoWindow)
用于在地图上展示复杂的说明性信息的类型。<br/>信息窗体，地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/infoWindow/info-window
:::


## 静态属性

仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
isCustom | Boolean | 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
autoMove | Boolean | 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
avoid  | Boolean | autoMove 为 true 时，自动平移到视野内后的上右下左的避让宽度。默认值： [20, 20, 20, 20]
closeWhenClickMap | Boolean | 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
offset | Array | 信息窗体显示位置偏移量。默认基准点为信息窗体的底部中心。默认值: [0, 0]
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否可见，默认 true。支持v-model
content | String, HTMLElement | 显示内容，可以是HTML要素字符串或者HTMLElement对象。也可以根据示例中的方式使用slot实现
size | Array | 信息窗体尺寸（isCustom为true时，该属性无效）
anchor | String  | 信息窗体锚点。默认值：'bottom-center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
position | Array | 信息窗体显示基点位置


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.InfoWindow | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
open| |信息窗体打开之后触发事件
close| |信息窗体关闭之后触发事件
