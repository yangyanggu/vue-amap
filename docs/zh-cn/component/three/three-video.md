---
title: ThreeJS播放视频
description: ThreeJS的视频实现，支持任意旋转，支持三维展示。
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, Video, threeJS
---


# ThreeVideo
ThreeJS的视频实现，支持任意旋转，支持三维展示。

## 基础示例

::: demo
examples/three/three-video
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
video | String,Array,HTMLVideoElement    | 视频地址
videoTranslate | {x:number, y:number, z: number}  | 视频位置偏移，主要用于配合背景使用
videoWidth | Number | 视频宽度，不填写时默认使用实际宽度
videoHeight | Number | 视频高度，不填写时默认使用实际高度
canvas | HTMLCanvasElement | 背景Canvas
alwaysFront | Boolean | 是否一直面朝屏幕,默认false


## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean           | 是否显示，默认 true
zIndex | Number            | 图层叠加的顺序值，1 表示最底层。默认 zIndex：0
opacity | Number            | 透明度，默认 1
position | Array | 位置经纬度
altitude | Number | 视频海拔高度
rotation | {x:number, y:number, z:number} | 旋转角度
scale | Number, Array | 缩放大小
angle | Number | 旋转角度


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Object3D | 获取实例
$$start |   | 播放视频
$$pause |   | 暂停视频

## 事件

事件 | 参数 | 说明
---|---|---|
init | ThreeVideo | 实例初始化结束


