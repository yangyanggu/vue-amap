---
title: Video图层
description: VideoLayer Video图层类，用户可以将一个 Video 作为图层添加在地图上，Video图层会随缩放级别而自适应缩放
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 视频图层, VideoLayer
---

# Video图层 (VideoLayer)
Video图层类，用户可以将一个 Video 作为图层添加在地图上，Video图层会随缩放级别而自适应缩放，基于Canvas图层实现。

## 基础示例

::: demo
examples/layer/data/video
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型                 | 说明
---|--------------------|---|
url | String             | 视频地址
zooms | Array              | 支持的缩放级别范围，默认范围 [2-30]
bounds | Array, AMap.Bounds | 图片的范围大小经纬度，如果传递数字数组类型: [minlng,minlat,maxlng,maxlat]
visible | Boolean            | 是否显示，默认 true
zIndex | Number             | 图层叠加的顺序值，1 表示最底层。默认 zIndex：6
opacity | Number             | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回             | 说明
---|----------------|---|
$$getInstance() | [VideoLayer](https://github.com/yangyanggu/vue-amap/blob/dev/src/packages/layer/data/Video/VideoLayer.ts) | 获取实例
$$play | void           | 继续播放视频
$$pause | void           | 暂停视频

## 事件

事件 | 参数         | 说明
---|------------|---|
init | [VideoLayer](https://github.com/yangyanggu/vue-amap/blob/dev/src/packages/layer/data/Video/VideoLayer.ts) | 实例初始化结束

