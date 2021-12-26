---
title: AmapControlHawkEye
---

# AmapControlHawkEye
鹰眼控件，用于显示缩略地图，显示于地图右下角，可以随主图的视口变化而变化，也可以配置成固定位置实现类似于南海附图的效果。

## Attributes

Attribute | Type | Description
---|---|---|
autoMove | Boolean | 是否随主图视口变化移动
showRectangle | Boolean | 是否显示视口矩形
showButton | Boolean | 是否显示打开关闭的按钮
mapStyle | String | 缩略图要显示的地图自定义样式，如'amap://styles/dark'
layers | Array | 缩略图要显示的图层类型，默认为普通矢量地图
width | String | 缩略图的宽度，同CSS，如'200px'
height | String | 缩略图的高度，同CSS，如'200px'
offset | Array | 缩略图距离地图右下角的像素距离，如 [2,2]
borderStyle | String | 缩略图的边框样式，同CSS，如"double solid solid double"
borderColor | String | 缩略图的边框颜色，同CSS，如'silver'
borderRadius | String | 缩略图的边框角度，同CSS，如'5px'
borderWidth | String | 缩略图的边框宽度，同CSS，如'2px'
buttonSize | String | 箭头按钮的像素尺寸，同CSS，如'12px'
visible | Boolean | 是否显示，默认true
isOpen | Boolean | 默认是否展开


## Events

| Event Name | Parameters                      | Description        |
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
