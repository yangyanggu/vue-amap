---
title: AmapLayerWmts
---

# AmapLayerWmts
用于加载OGC标准的WMS地图服务的一种图层类，仅支持EPSG3857坐标系统的WMTS图层。
[查看 WMTS 标准](http://www.opengeospatial.org/standards/wmts)

## Attributes

Attribute | Type | Description
---|---|---|
blend  | Boolean | 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为false
url | String | wmts服务的url地址，如：' https://services.arcgisonline.com/arcgis/rest/services/'+ 'Demographics/USA_Population_Density/MapServer/WMTS/'
params | Object | OGC标准的WMS地图服务的GetMap接口的参数，包括VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT等，<br/>CRS、BBOX、REQUEST、WIDTH、HEIGHT等参数请勿添加，例如：<br/>{ </br/>  LAYERS: 'topp:states',<br/>  VERSION:'1.3.0',<br/>  FORMAT:'image/png'<br/>  }
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

## Events

Event Name | Parameters | Description
---|---|---|
init | TileLayer.WMTS | 实例初始化结束

