---
title: AmapLayerHeatMap
---

# AmapLayerHeatMap
热力图，基于第三方heatmap.js实现，以特殊高亮的形式显示数据密集程度。根据密集程度的不同，图上会呈现不同的颜色，以直观的形式展现数据密度。API引用了heatmap.js最新版本v2.0，v2.0基于新的渲染模型，具有更高的渲染效率和更强的性能。支持chrome、firefox、safari、ie9及以上浏览器。

## Attributes

Attribute | Type | Description
---|---|---|
radius  | Number | 热力图中单个点的半径，默认：30，单位：pixel
gradient  | Object | 热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图，例{0.4:'rgb(0, 255, 255)',0.85:'rgb(100, 0, 255)',},其中 key 表示间隔位置，取值范围： [0,1] ，value 为颜色值。默认：heatmap.js标准配色方案
config | Object | 3d参数在组件中被重命名为config，参数内容与3d一致。3D热力图属性
zooms | Array | 支持的缩放级别范围，默认范围 [3-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：130
opacity | Number | 透明度，默认 1
dataSet | Object | 热力图数据集 {data: points, max: 100}

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.HeatMap | 实例初始化结束
