---
title: AmapLayerBuildings
---

# AmapLayerBuildings
建筑楼块 3D 图层。

## Attributes

Attribute | Type | Description
---|---|---|
wallColor | Array<String>,String | 楼块侧面颜色，支持 rgba、rgb、十六进制等
roofColor | Array<String>,String | 楼块顶面颜色，支持 rgba、rgb、十六进制等
heightFactor | Number | 楼块的高度系数因子，默认为 1，也就是正常高度
styleOpts | Object | 楼块的围栏和样式设置
zooms | Array | 图层缩放等级范围，默认 [2, 20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.Buildings | 实例初始化结束
complete |  | 图块切片加载完成事件
