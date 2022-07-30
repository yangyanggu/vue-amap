---
title: AmapThreeVideo
---

# AmapThreeVideo
ThreeJS的视频实现，支持任意旋转，支持三维展示。

## Attributes

Attribute | Type              | Description
---|-------------------|---|
video | String,Array,HTMLVideoElement    | 视频地址
visible | Boolean           | 是否显示，默认 true
zIndex | Number            | 图层叠加的顺序值，1 表示最底层。默认 zIndex：0
opacity | Number            | 透明度，默认 1
videoTranslate | {x:number, y:number, z: number}  | 视频位置偏移，主要用于配合背景使用
videoWidth | Number | 视频宽度，不填写时默认使用实际宽度
videoHeight | Number | 视频高度，不填写时默认使用实际高度
canvas | HTMLCanvasElement | 背景Canvas
position | Array | 位置经纬度
altitude | Number | 视频海拔高度
rotation | {x:number, y:number, z:number} | 旋转角度
scale | Number, Array | 缩放大小
angle | Number | 旋转角度
alwaysFront | Boolean | 是否一直面朝屏幕,默认false


## Events

Event Name | Parameters | Description
---|------------|---|
init | ThreeVideo | 实例初始化结束


