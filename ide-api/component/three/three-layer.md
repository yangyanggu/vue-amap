---
title: AmapLayerThree
---

# AmapLayerThree
ThreeJS图层，基于AMap.GLCustomLayer，增加通用的配置，目前包含lights（灯光）、hdr。
可以通过获取scene来自定义添加模型。


## Attributes

Attribute | Type | Description
---|---|---|
lights  | Array | 配置灯光数据，具体参数见下面
hdr | Object | HDR功能配置，具体参数见下面
alpha | Boolean | canvas是否包含alpha (透明度)。默认为 false
antialias | Boolean | 是否执行抗锯齿。默认为false
zooms | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1
axesHelper | Boolean | 是否开启debug的箭头，默认false


## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.CustomLayer | 实例初始化结束

