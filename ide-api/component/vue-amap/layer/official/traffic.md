---
title: AmapLayerTraffic
---

# AmapLayerTraffic
实时交通图层类，继承自TileLayer。

## Attributes

Attribute | Type | Description
---|---|---|
autoRefresh  | Boolean | 是否自动更新数据，默认开启
tileSize | Number | 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
interval | Number | 自动更新数据的间隔毫秒数，默认 180ms
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.TileLayer.Traffic | 实例初始化结束
complete |  | 图块切片加载完成事件
