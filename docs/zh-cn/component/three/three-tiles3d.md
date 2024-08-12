---
title: 开源3dtiles方案
description: 高德地图叠加3dtiles的开源实现方案，基于3d-tiles-renderer实现
head:
  - - meta
    - name: keywords
      content: 开源3dtiles方案, 3dtiles
---

# 开源3dtiles方案
高德地图叠加3dtiles的开源实现方案，基于3d-tiles-renderer实现，支持box和region盒模型

::: tip
来源 ```@vuemap/vue-amap-extra``` 组件库
:::

## 基础示例

::: demo
examples/three/three-tiles3d
:::


## 静态属性

名称 | 类型 | 说明
---|----------------|---|
url  | String         | 地址
dracoDecoderPath | String         | DRACOLoader 的decoder路径，默认使用CDN路径，默认：https://cdn.jsdelivr.net/npm/three@0.143/examples/js/libs/draco/|
fetchOptions | Object | 使用fetch下载文件的参数 |
mouseEvent | Boolean | 是否开启事件,默认false |
debug | Boolean | 是否开启debug，开启后将会在页面最顶部显示当前模型处理情况， 默认 false |
autoFocus       | Boolean                                 | 加载后是否自动将地图中心点移动到模型中心，仅在不传position时生效                                                       |
configLoader    | (loader: GLTFLoader) => void            | 配置loader，用于添加draco等扩展                                                                      |

## 动态属性
支持响应式。

名称 | 类型                                         | 说明
---|--------------------------------------------|---|
position | Array          | 模型中心点位置
scale | Number,{x,y,z} | 缩放大小
visible | Boolean        | 是否显示，默认 true
rotation | {x,y,z}        | 旋转角度,通过该参数调整模型方向
translate | {x,y,z}        | 模型偏移设置

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Layer3DTiles | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Layer3DTiles | 实例初始化结束
click | Object3D | 点击事件
mouseover | Object3D | 鼠标悬浮

