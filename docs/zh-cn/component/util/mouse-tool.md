---
title: 鼠标工具插件
description: AMap.MouseTool 鼠标工具插件。通过该插件，可进行鼠标画标记点、线、多边形、矩形、圆、距离量测、面积量测、拉框放大、拉框缩小等功能。
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 鼠标工具插件, AMap.MouseTool
---

# 鼠标工具插件 (AMap.MouseTool)
鼠标工具插件。通过该插件，可进行鼠标画标记点、线、多边形、矩形、圆、距离量测、面积量测、拉框放大、拉框缩小等功能。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/util/mouse-tool
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型      | 说明
---|---------|---|
autoClear | Boolean | 是否绘制结束后自动清空图层，默认true
showTooltip | Boolean | 是否在鼠标旁边显示提示信息, 默认值：默认true。
tooltipTextMap | Object  | 提示信息的map,主要用于修改tooltip的提示信息，对象的key有：'marker', 'circle', 'rectangle', 'polyline', 'polygon', 'measureArea', 'rule', 'rectZoomIn', 'rectZoomOut'
textOptions | Object  | 提示信息的配置属性，信息使用`AMap.Text`实现，此处对应`AMap.Text`的参数，[参数地址](https://lbs.amap.com/api/jsapi-v2/documentation#text)
extraOptions | Object  | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖
drawCursor | String  | 绘制时鼠标样式，默认：`crosshair`

## 动态属性
支持响应式。

名称 | 类型                       | 说明
---|--------------------------|---|
type | String                   | 工具类型。`marker(点标记)`, `circle(圆)`, `rectangle(矩形)`, `polyline(折线)`, `polygon(多边形)`, `measureArea(面积计算)`, `rule(距离计算)`, `rectZoomIn(框选放大)`, `rectZoomOut(框选缩小)`
drawOptions | Object                   | 绘制的图形样式，根据需要绘制的对象来传递不同的参数。<br/>注意：必须先修改drawOptions参数再修改type才会在切换type时切换样式<br/>[点标记](https://lbs.amap.com/api/jsapi-v2/documentation#marker)<br/>[圆](https://lbs.amap.com/api/jsapi-v2/documentation#circle)<br/>[圆](https://lbs.amap.com/api/jsapi-v2/documentation#circle)<br/>[矩形](https://lbs.amap.com/api/jsapi-v2/documentation#rectangle)<br/>[折线](https://lbs.amap.com/api/jsapi-v2/documentation#polyline)<br/>[多边形](https://lbs.amap.com/api/jsapi-v2/documentation#polygon)<br/>[面积计算](https://lbs.amap.com/api/jsapi-v2/documentation#polygon)<br/>[距离计算](https://lbs.amap.com/api/jsapi-v2/documentation#polyline)

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 参数               | 返回             | 说明
---|------------------|----------------|---|
$$getInstance() | 无                | AMap.MouseTool | 获取`MouseTool`实例 
$$close(ifClear) | ifClear(Boolean) | 无              | 关闭鼠标工具，参数为true时会清空绘制的图形
$$open() | 无 | 无 | 开启工具
$$clear() | 无 | 无 | 清除地图上绘制的图形

## 事件

事件 | 参数             | 说明
---|----------------|---|
init | AMap.MouseTool | `AMap.MouseTool`实例
draw | data,targer    | 第一个参数为绘制生成的对应数据，第二个为绘制的图形对象。对应数据分为以下几类<br/>marker数据：[lng,lat]<br/>circle数据：{center:[lng,lat],radisu:number}<br/>rectangle数据：[[lng,lat],[lng,lat]]<br/>polyline数据：[[lng,lat],[lng,lat]]<br/>polygon数据：[[lng,lat],[lng,lat]]<br/>measureArea数据：number，单位平方米<br/>rule数据：number,单位米
