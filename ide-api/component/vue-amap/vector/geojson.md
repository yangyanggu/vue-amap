---
title: AmapGeojson
---

# AmapGeojson
GeoJSON类，继承自OverLayGroup，可实现GeoJSON对象与OverlayGroup的相互转换

## Attributes

Attribute | Type | Description
---|---|---|
markerOptions | Object | marker的默认样式。存在getMarker参数时，该属性失效。该属性里的参数会全部带入marker中，但会被geojson的properties中的属性给覆盖。
getMarker | Funtion (geojson, lnglats) | 指定点要素的绘制方式，缺省时为Marker的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
polylineOptions | Object | polyline的默认样式。存在getPolyline参数时，该属性失效。该属性里的参数会全部带入polyline中，但会被geojson的properties中的属性给覆盖。
getPolyline | Funtion (geojson, lnglats) | 指定线要素的绘制方式，缺省时为Polyline的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
polygonOptions | Object | polygon的默认样式。存在getPolygon参数时，该属性失效。该属性里的参数会全部带入polygon中，但会被geojson的properties中的属性给覆盖。
getPolygon | Funtion (geojson, lnglats) | 指定线要素的绘制方式，缺省时为Polygon的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
geo | Object| 要加载的标准GeoJSON对象
visible | Boolean | 是否可见
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
rightclick | MapsEvent | 右键单击
mousedown | MapsEvent | 鼠标按下
mouseup | MapsEvent | 鼠标抬起
mouseover | MapsEvent | 鼠标经过
mouseout | MapsEvent | 鼠标移出
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
