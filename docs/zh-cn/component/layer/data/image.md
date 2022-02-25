---
title: 图片图层
description: AMap.ImageLayer 图片图层类，用户可以将一张静态图片作为图层添加在地图上，图片图层会随缩放级别而自适应缩放
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 图片图层, AMap.ImageLayer
---

# 图片图层 (AMap.ImageLayer)
图片图层类，用户可以将一张静态图片作为图层添加在地图上，图片图层会随缩放级别而自适应缩放。

## 基础示例

::: demo
examples/layer/data/image
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
url | String | 图片地址链接
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
bounds | Array, AMap.Bounds | 图片的范围大小经纬度，如果传递数字数组类型: [minlng,minlat,maxlng,maxlat]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：6
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.ImageLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.ImageLayer | 实例初始化结束
complete |  | 加载完成事件

