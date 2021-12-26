---
title: AmapLayerSatellite
---

# AmapLayerSatellite
卫星图层类，继承自TileLayer。

## Attributes

Attribute | Type | Description
---|---|---|
tileSize | Number | 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.TileLayer.Satellite | 实例初始化结束
complete |  | 图块切片加载完成事件

