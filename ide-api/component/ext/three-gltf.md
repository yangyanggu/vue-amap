---
title: AmapThreeGltf
---

# AmapThreeGltf
ThreeJS的gltf加载器封装的组件，用于加载gltf模型

## Attributes

Attribute | Type                                | Description
---|-------------------------------------|---|
url  | String                              | 模型地址,只支持gltf
scale | Number,Array[x,y,z]                 | 缩放大小
position | Array                               | 车辆位置经纬度
visible | Boolean                             | 是否显示，默认 true
rotation | Object                              | 旋转角度,通过该参数调整模型方向
angle | Number                              | 模型绕Y轴旋转角度，该参数主要用于车辆模型的位置调整
moveAnimation | {duration: number, smooth: boolean} | 是否开启移动动画

## Events

Event Name | Parameters | Description
---|---|---|
init | Object3D, 组件实例 | 实例初始化结束
click | Object3D | 点击事件
mouseover | Object3D | 鼠标悬浮
mouseout | Object3D | 鼠标离开

