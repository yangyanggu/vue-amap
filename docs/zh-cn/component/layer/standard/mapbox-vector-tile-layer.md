---
title: 矢量瓦片块图层
description: AMap.MapboxVectorTileLayer 矢量瓦片块图层可以使用标准的 MVT 瓦片服务作为数据源
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 矢量瓦片块图层, AMap.MapboxVectorTileLayer
---

# 矢量瓦片块 (AMap.MapboxVectorTileLayer)
为了满足基于矢量瓦片块的数据可视化、矢量瓦片边界展示等开发需求，通过 AMap.MapboxVectorTileLayer 插件提供了简易矢量瓦片图层
此图层可以使用标准的 MVT 瓦片服务作为数据源。
可以配合[GeoHub-数据中心](https://geohub.amap.com/)发布的矢量瓦片服务。 注意：使用高德数据平台发布服务，由于服务 URL 地址是明文，建议自行做服务代理转发，防止服务 ID 和 Key 明文传输导致数据泄露。
[相关示例](https://lbs.amap.com/demo/jsapi-v2/example/thirdlayer/mvt-layer)

## 基础示例

::: demo
examples/layer/standard/mapbox-vector
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
url | String | MVT 数据的链接地址
dataZooms | Array | 瓦片数据等级范围，超过范围会使用最大/最小等级的数据，默认范围 [2,18]
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2,22]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1
styles | Object | 样式

### styles
名称 | 类型 | 说明
---|---|---|
polygon | Object | 面类型的样式
line | Object | 线类型数据的样式
point | Object | 点类型数据的样式

#### polygon 面类型的样式
名称 | 类型 | 说明
---|---|---|
color | String, Function | 面填充颜色
borderWidth | Number, Function | 描边宽度
dash | Array[Number], Function | 描边线的虚线配置，例如： [10,5,8,5]
borderColor | String, Function | 描边颜色
injection | Array[any] | 其他属性值中对于函数形式的值，假如需要获取外部变量，要使用数组的形式传入，便于在函数内部访问外部变量。请看下面的示例。
visible | Boolean, Function | 是否显示

#### line 线类型数据的样式
名称 | 类型 | 说明
---|---|---|
color | String, Function | 线填充颜色
lineWidth | Number, Function | 宽度
dash | Array[Number], Function | 描边线的虚线配置，例如： [10,5,8,5]
injection | Array[any] | 其他属性值中对于函数形式的值，假如需要获取外部变量，要使用数组的形式传入，便于在函数内部访问外部变量。请看下面的示例。
visible | Boolean, Function | 是否显示

#### point 点类型数据的样式
名称 | 类型 | 说明
---|---|---|
radius | String, Function | 圆点的半径，单位像素
color | String, Function | 圆的填充颜色
borderWidth | Number, Function | 描边宽度
dash | Array[Number], Function | 描边线的虚线配置，例如： [10,5,8,5]
borderColor | String, Function | 描边颜色
injection | Array[any] | 其他属性值中对于函数形式的值，假如需要获取外部变量，要使用数组的形式传入，便于在函数内部访问外部变量。请看下面的示例。
visible | Boolean, Function | 是否显示


### styles示例
```js
{
   point: {
       visible: function (f, inject) {
           // 这里的 inject 参数就是一个数组，他的值就是 injection 字段的数组值：[visis]。
           return inject[0].indexOf('这是') > -1;
       },
       injection: [globalVar],
       radius: function (props) {
           return Math.random() * 20 + 5;
       },
       color: 'red',
       borderWidth: 20 || function (props) {
           return Math.random() * 5 + 2;
       },
       borderColor: 'rgba(255,255,255,1)',
   },
   polygon: {
       color: function (props) {
           return 'rgba(0,0,0,1)';
       },
       dash: [10, 0, 10, 0],
       borderColor: 'rgba(30,112,255,1)',
       borderWidth: 5,
   },
   line: {
       color: 'rgba(20,140,40,1)',
       lineWidth: 5,
       dash: [10, 0, 10, 0],
   },
}
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.TileLayer.WMS | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | TileLayer.WMS | 实例初始化结束

