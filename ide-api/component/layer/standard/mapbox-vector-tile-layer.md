---
title: AmapLayerMapboxVectorTile
---

# AmapLayerMapboxVectorTile
为了满足基于矢量瓦片块的数据可视化、矢量瓦片边界展示等开发需求，通过 AMap.MapboxVectorTileLayer 插件提供了简易矢量瓦片图层
此图层可以使用标准的 MVT 瓦片服务作为数据源。
可以配合[GeoHub-数据中心](https://geohub.amap.com/)发布的矢量瓦片服务。 注意：使用高德数据平台发布服务，由于服务 URL 地址是明文，建议自行做服务代理转发，防止服务 ID 和 Key 明文传输导致数据泄露。
[相关示例](https://lbs.amap.com/demo/jsapi-v2/example/thirdlayer/mvt-layer)

## Attributes

Attribute | Type | Description
---|---|---|
url | String | MVT 数据的链接地址
dataZooms | Array | 瓦片数据等级范围，超过范围会使用最大/最小等级的数据，默认范围 [2,18]
zooms | Array | 支持的缩放级别范围，默认范围 [2,22]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1
styles | Object | 样式

## Events

Event Name | Parameters | Description
---|---|---|
init | TileLayer.WMS | 实例初始化结束

