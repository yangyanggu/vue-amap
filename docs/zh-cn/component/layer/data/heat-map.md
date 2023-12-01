---
title: 热力图
description: AMap.HeatMap 热力图，基于第三方heatmap.js实现，以特殊高亮的形式显示数据密集程度。根据密集程度的不同，图上会呈现不同的颜色，以直观的形式展现数据密度。API引用了heatmap.js最新版本v2.0，v2.0基于新的渲染模型，具有更高的渲染效率和更强的性能。支持chrome、firefox、safari、ie9及以上浏览器。
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 热力图, AMap.HeatMap
---

# 热力图 (AMap.HeatMap)
热力图，基于第三方heatmap.js实现，以特殊高亮的形式显示数据密集程度。根据密集程度的不同，图上会呈现不同的颜色，以直观的形式展现数据密度。API引用了heatmap.js最新版本v2.0，v2.0基于新的渲染模型，具有更高的渲染效率和更强的性能。支持chrome、firefox、safari、ie9及以上浏览器。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/data/heat-map
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
radius  | Number | 热力图中单个点的半径，默认：30，单位：pixel
gradient  | Object | 热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图，例{0.4:'rgb(0, 255, 255)',0.85:'rgb(100, 0, 255)',},其中 key 表示间隔位置，取值范围： [0,1] ，value 为颜色值。默认：heatmap.js标准配色方案
config | Object | 3d参数在组件中被重命名为config，参数内容与3d一致。3D热力图属性
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型      | 说明
---|---------|---|
zooms | Array   | 支持的缩放级别范围，默认范围 [3-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number  | 图层叠加的顺序值，1 表示最底层。默认 zIndex：130
opacity | Array   | 热力图透明度区间数组，取值范围 [0,1] ，0表示完全透明，1表示不透明，默认： [0,1]
dataSet | Object  | 热力图数据集 {data: points, max: 100}

### config参数
名称 | 类型 | 说明
---|---|---|
heightScale | Number | 高度缩放因子，表示在单位高度上的缩放比例， 默认为 1
heightBezier | Array | 影响高度平滑度的贝塞尔曲线因子，默认 [0.5, 0, 1, 0.5] ,
gridSize | Number | 取样精度，越小越平滑，越大性能越高

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.HeatMap | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.HeatMap | 实例初始化结束
