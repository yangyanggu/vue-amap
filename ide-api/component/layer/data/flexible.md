---
title: AmapLayerFlexible
---

# AmapLayerFlexible
灵活切片图层，继承自AMap.TileLayer，开发者可通过构造时传入给其传入createTile字段来指定每一个切片的内容<br/>
[相关示例](https://lbs.amap.com/api/jsapi-v2/example/selflayer/flex-canvas/)

## Attributes

Attribute | Type | Description
---|---|---|
cacheSize | Number | 缓存瓦片数量
createTile | Function | 由开发者实现，由API自动调用，xyz分别为切片横向纵向编号和层级，切片大小 256。假设每次创建的贴片为A(支持img或者canvas)，当创建或者获取成功时请回调success(A)，不需要显示或者失败时请回调fail()
tileSize | Number | 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.TileLayer.Flexible | 实例初始化结束
complete |  | 图块切片加载完成事件
