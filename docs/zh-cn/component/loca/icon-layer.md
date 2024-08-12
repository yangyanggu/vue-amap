---
title: 图标图层
description: Loca.IconLayer 图标图层,可以大批量展示图标，支持自定义图标大小和图标地址
head:
  - - meta
    - name: keywords
      content: 图标图层, Loca.IconLayer, 海量点
---

# 图标图层 (Loca.IconLayer)
图标图层

::: tip
来源 ```@vuemap/vue-amap-loca``` 组件库
:::

## 基础示例

::: demo
examples/loca/icon
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
initEvents | Boolean | 是否创建事件，自动为loca图层创建click和mousemove事件。 默认 true
defaultStyleValue | Object | 默认样式，可以查看下面属性说明
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
sourceUrl | String | 数据源的链接地址，一般是接口地址，返回的数据必须是 geojson 格式。
sourceData | Object | 数据对象。如果你不想使用 url 方式请求数据，可以直接填写请求好的 geojson 对象。  sourceUrl与sourceData只会生效一个，默认优先判断sourceUrl
layerStyle | Object | 图层样式
zooms | Array | 图层缩放等级范围，默认[2,20]
opacity | Number | 图层整体透明度，默认 1
visibleDuration | Number | 图层显隐时候过渡的时间，默认为0
geoBufferSource | ArrayBuffer, String | protocol-buffers(PBF) 格式的数据源，能够大幅压缩数据体积，有效减少数据传输时间。目前仅支持基于 mapbox/geobuf 的 GeoJSON PBF 实现

### layerStyle参数

::: warning
layerStyle参数覆盖所有默认值
:::

名称 | 类型 | 说明
---|---|---|
unit | String | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'
icon  | String, Function | 图标资源,接受三种值（Svg,Image,Url），可通过回调函数对每个点进行设置
iconSize | Array, Function | 图标大小，影响宽高。支持动画过渡效果，动画 key 字段名称为 radius。 default [20,20]
rotation  | Number, Function | 图标的旋转角度，可以通过回调为每个点设置不同的旋转角（单位:角度） default 0
opacity | Number, Function | 透明度,支持通过回调函数为每个点设置不同的透明度 default 1

### defaultStyleValue参数

::: tip
defaultStyleValue提供默认参数，但会被geojson的properties属性中的值覆盖
:::

名称 | 类型 | 说明
---|---|---|
unit | String | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'
icon  | String | 图标资源,接受三种值（Svg,Image,Url），可通过回调函数对每个点进行设置
iconSize | Array | 图标大小，影响宽高。支持动画过渡效果，动画 key 字段名称为 radius。 default [20,20]
rotation  | Number | 图标的旋转角度，可以通过回调为每个点设置不同的旋转角（单位:角度） default 0
opacity | Number | 透明度,支持通过回调函数为每个点设置不同的透明度 default 1

### style说明
所有loca的Layer组件对Style设置提供了默认处理，支持function回调方式的属性都提供了默认回调实现，优先读取geojson的properties中的值，读取不到的情况下会读取defaultStyleValue配置的值，最后会使用组件内默认设置的值。<br/>
该默认处理可以被layerStyle中的设置给覆盖。目前默认设置已基本符合日常使用，如果需要在选中目标时做高亮处理，则推荐根据示例使用事件监听然后动态修改layerStyle来实现。<br/>
style数据有可以有三个来源，优先级按顺序处理，第一个最高<br/>
##### 1、layerStyle属性配置
```javascript
{
  unit: 'px',
  icon: (index, feature) => {
    let data = feature.properties.rawData;
    let url = trafficIcons[data.type % Object.keys(trafficIcons).length];
    return url;
  },
  iconSize: [40,40],
  rotation: 0,
}
```

##### 2、geojson的properties属性
```json
{
  "type": "FeatureCollection",
  "name": "Polygon",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "icon": '/img/1.png',
        "rotation": 90
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 119.958676782427744, 32.121127961388339]
      }
    }
  ]
}
```
##### 3、defaultStyleValue属性配置
```javascript
{
  unit: 'px',
  icon: '',
  iconSize: [20, 20],
  rotation: 0,
  opacity: 1
}
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.IconLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.IconLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
rightclick | Feature, event | 鼠标右击时返回对应的feature，否则返回undefined
