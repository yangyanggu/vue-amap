---
title: Gltf模型加载
description: gltf图层用于加载gltf模型，提供基础的模型加载和修改基础属性的能力
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, Gltf, threeJS
---

# GLTF
ThreeJS的gltf加载器封装的组件，用于加载gltf模型

::: tip
来源 ```@vuemap/vue-amap-extra``` 组件库
:::

## 基础示例

::: demo
examples/three/three-gltf
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
url  | String | 模型地址,只支持gltf

## 动态属性
支持响应式。

名称 | 类型                                         | 说明
---|--------------------------------------------|---|
scale | Number,Array | 缩放大小,可以传入number那么X Y Z都会以该值缩放，也可以传入数组[x,y,z]将按该顺序缩放
position | Array                                      | 车辆位置经纬度
visible | Boolean                                    | 是否显示，默认 true
rotation | Object {x:number,y: number, z: number}     | 旋转角度,通过该参数调整模型方向
angle | Number                                     | 模型绕Y轴旋转角度，该参数主要用于车辆模型的位置调整
height | Number                                     | 模型高度
moveAnimation | Object {duration: number, smooth: boolean} | 是否开启移动动画，开启动画后position和angle都会以线性改变

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Object3D | 获取实例
$$startAnimations |   | 开始动画，当模型自带动画时，调用该方法将触发动画
$$stopAnimations |   | 停止动画

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object3D, 组件实例 | 实例初始化结束
click | Object3D | 点击事件
mouseover | Object3D | 鼠标悬浮
mouseout | Object3D | 鼠标离开

