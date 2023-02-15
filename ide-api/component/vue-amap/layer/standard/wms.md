---
title: AmapLayerWms
---

# AmapLayerWms
用于加载OGC标准的WMS地图服务的一种图层类，仅支持EPSG3857坐标系统的WMS图层。
[查看 WMS的OGC标准](http://www.opengeospatial.org/standards/wms)

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
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init | TileLayer.WMS | 实例初始化结束
complete |  | 图块切片加载完成事件

