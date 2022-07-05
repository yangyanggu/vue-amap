---
title: AmapLocaPrism
---

# AmapLocaPrism
棱柱图层，使用点类型数据表达带有高度的立体棱柱，使用高度、颜色、半径等样式表达点数据的不同维度属性信息。支持动画、光照效果。

## Attributes

Attribute | Type | Description
---|---|---|
cullface | String | 剔除背面/前面的面（选择剔除将会提升性能），可选：back/front/none，back是剔除背面的面，front是剔除前面的面，none是不进行剔除。default 'back'
acceptLight | Boolean | 面是否接受光照，光照信息在 loca 对象中配置 default true
shininess | Number | 立体网格的粗糙度，值越高，说明表面越粗糙。default 30
hasSide | Boolean | 当面有厚度的时候，有没有侧面和底面 default true
depth | Boolean | 是否开启深度检测，开启后可能会影响zIndex  default true
initEvents | Boolean | 是否创建事件，自动为loca图层创建click和mousemove事件。 默认 true
defaultStyleValue | Object | 默认样式，可以查看下面属性说明
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
sourceUrl | String | 数据源的链接地址，一般是接口地址，返回的数据必须是 geojson 格式。
sourceData | Object | 数据对象。如果你不想使用 url 方式请求数据，可以直接填写请求好的 geojson 对象。  sourceUrl与sourceData只会生效一个，默认优先判断sourceUrl
layerStyle | Object | 图层样式
zooms | Array | 图层缩放等级范围，默认[2,20]
opacity | Number | 图层整体透明度，默认 1
visibleDuration | Number | 图层显隐时候过渡的时间，默认为0
geoBufferSource | [ArrayBuffer, String] | protocol-buffers(PBF) 格式的数据源，能够大幅压缩数据体积，有效减少数据传输时间。目前仅支持基于 mapbox/geobuf 的 GeoJSON PBF 实现

## Events

Event Name | Parameters | Description
---|---|---|
init | Loca.PrismLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
