---
title: 自定义瓦片纠偏图层
description: 自定义瓦片纠偏图层是基于GLCustomLayer实现的瓦片加载图层，支持瓦片坐标系纠偏
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 自定义瓦片图层, 瓦片纠偏
---

# 自定义瓦片纠偏图层 (CustomXyzLayer)
自定义瓦片纠偏图层是基于GLCustomLayer实现的瓦片加载图层，支持瓦片坐标系纠偏，支持`wgs84` `gcj02` `bd09`三种坐标系。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/data/custom-xyz
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

| 名称           | 类型                           | 说明                                                                                                 |
|--------------|------------------------------|----------------------------------------------------------------------------------------------------|
| url          | string                       | 瓦片地址，支持 {s} {x} {y} {z}，示例：`http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}` |
| subdomains   | string[]                     | 子域名数组，当url中设置{s}后，该属性必填，例如：`['1','2','3']`                                                         | 
| tileType     | 'xyz' \| 'bd09'              | 瓦片分割类型，默认是`xyz`，xyz代表瓦片是编号是从左上角开始，百度瓦片是由中间开始，所以需要区分普通瓦片还是百度                                        |
| proj         | 'wgs84' \| 'gcj02' \| 'bd09' | 瓦片使用的坐标系，默认是`gcj02`                                                                                |
| debug        | boolean                      | 开启debug后瓦片上将显示瓦片编号                                                                                 |
| cacheSize    | number                       | 瓦片缓存数量，默认-1，不限制缓存瓦片数                                                                               |
| extraOptions | Object                       | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖                                              |
| tileMaxZoom  | number                       | 瓦片在服务器的最大层级，当地图zoom超过该层级后直接使用该层级作为做大层级瓦片，默认18                                                      |
| altitude     | number                       | 加载的瓦片海拔，设置该值后，在3D模式下瓦片将浮空，默认：0                                                                     |

## 动态属性
支持响应式。

| 名称      | 类型                                             | 说明                             |
|---------|------------------------------------------------|--------------------------------|
| zooms   | Array                                          | 支持的缩放级别范围，默认范围 [2-18]          |
| visible | Boolean                                        | 是否显示，默认 true                   |
| zIndex  | Number                                         | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120 |
| opacity | Number                                         | 透明度，默认 1                       |
| mask    | number[][] \| number[][][]   \| number[][][][] | 瓦片掩膜，数据结构与AMap.Map的mask参数一致    |

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | CustomXyzLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | CustomXyzLayer | 实例初始化结束

