---
title: AmapLayerCanvas
---

# AmapLayerCanvas
Canvas图层类，用户可以将一个 Canvas 作为图层添加在地图上，Canvas图层会随缩放级别而自适应缩放。

## Attributes

Attribute | Type | Description
---|---|---|
canvas | HTMLCanvasElement | Canvas DOM 对象
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
bounds | Array, AMap.Bounds | 图片的范围大小经纬度，如果传递数字数组类型: [minlng,minlat,maxlng,maxlat]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：6
opacity | Number | 透明度，默认 1
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.CanvasLayer | 实例初始化结束
complete |  | 加载完成事件

