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
configLoader | Function                            | 配置loader，用于添加draco等扩展
useModelCache | Boolean                             | 是否启用模型缓存，开启后模型批量加载同一个模型地址时只有第一个执行下载，后续模型将直接使用clone能力。默认false |
showPopup | Boolean                                    | 是否显示popup，默认false，如果需要展示popup，需要开启将`el-amap-layer-three`的`create-css-render`属性设置为true
popupHeight | Number                                     | popup的高度，默认 0
popupScale | Number, Array\[number\]                    | 三维弹窗的缩放比例(只有在popupType为3D时生效)
popupType | '2D', '3D' | 信息弹窗类型

## Events

Event Name | Parameters | Description
---|---|---|
init | Object3D, 组件实例 | 实例初始化结束
click | Object3D | 点击事件
mouseover | Object3D | 鼠标悬浮
mouseout | Object3D | 鼠标离开

