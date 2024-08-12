---
title: 区划聚合图层
description: AMap.DistrictCluster 高德地图的区划聚合图层，图层基于AMapUI的区划插件改造实现
head:
  - - meta
    - name: keywords
      content: 区划聚合图层, AMap.DistrictCluster, AMapUI
---

# 区划聚合图层
高德地图的区划聚合图层，图层基于AMapUI的区划插件改造实现。[插件文档](https://github.com/yangyanggu/amap-district-cluster)

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/data/district-cluster
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

| 名称              | 类型                                                    | 说明                                                                                                                                                                                                                                                     |
|-----------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getPosition     | (dataItem: any, dataIndex: number) => AMap.LngLatLike | 返回数据项中的经纬度信息                                                                                                                                                                                                                                           |
| autoSetFitView  | Boolean                                               | 是否在绘制后自动调整地图视野以适合全部点，默认true                                                                                                                                                                                                                            |
| topAdcodes      | number[]                                              | 顶层区划的adcode列表。（[TXT](https://webapi.amap.com/ui/1.0/ui/geo/DistrictExplorer/assets/d_v1/area_tree.txt)，[JSON](https://webapi.amap.com/ui/1.0/ui/geo/DistrictExplorer/assets/d_v1/area_tree.json)）默认为[100000]，即全国范围.假如仅需要展示河北和北京，可以设置为[130000, 110000], |
| excludedAdcodes | number[]                                              | 需要排除的区划的adcode列表                                                                                                                                                                                                                                       |
| renderOptions   | RenderOptions                                         | 绘制的引擎的参数，参数列表见[下面](#RenderOptions参数说明)                                                                                                                                                                                                                 |
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

###### RenderOptions参数说明
| 属性名                                  | 属性类型                                             | 属性描述                                                                                                                                                     |
|--------------------------------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| minHeightToShowSubFeatures           | Number                                           | 父级区划的最小显示高度，默认630                                                                                                                                        |
| minSiblingAvgHeightToShowSubFeatures | Number                                           | 父级区划的同级兄弟区划的最小平均显示高度，默认600                                                                                                                               |
| minSubAvgHeightToShowSubFeatures     | Number                                           | 子级区划的最小平均显示高度，默认300, 当上面3个条件同时满足时，切换到子级显示                                                                                                                |
| featureStyleByLevel                  | FeatureStyleByLevelOption                        | 按区划级别（如下4类）定义的区划面样式  ```{country: FeatureStyle, province: FeatureStyle, city: FeatureStyle, district: FeatureStyle}  ```, [默认值](#featureStyleByLevel默认值) |
| minHeightToShowSubFeatures           | Number                                           | 父级区划的最小显示高度，默认630                                                                                                                                        |
| areaNodeCacheLimit                   | Number                                           | AreaNode缓存的数量，默认-1，即不限制                                                                                                                                  |
| getFeatureStyle                      | (feature: any, dataItems: any[]) => StyleOption  | 直接指定某个区划的样式，优先级最高                                                                                                                                        |
| zooms                                | [Number, Number]                                 | 绘制的层级范围，默认 [2, 30]                                                                                                                                       | 
| renderPolygon                        | (feature: any, dataItems: any[]) => AMap.Polygon | 自定义绘制多边形                                                                                                                                                 |
| renderClusterMarker                  | (feature: any, dataItems: any[]) => AMap.Marker  | 自定义绘制聚合标号                                                                                                                                                |
| clusterMarkerEventSupport            | Boolean                                          | 聚合标注是否开启事件支持，默认true。                                                                                                                                     |
| clusterMarkerClickToShowSub          | Boolean                                          | 点击聚合标注是否触发展示子级区划（即调用 zoomToShowSubFeatures 方法），默认true                                                                                                    |
| featureEventSupport                  | Boolean                                          | 区划面是否开启事件支持，默认true                                                                                                                                       |
| featureClickToShowSub                | Boolean                                          | 点击区划面是否触发进入子级区划，默认false                                                                                                                                  |

###### FeatureStyle参数说明
| 属性名 | 属性类型   | 属性描述                              |
| ---- |--------|-----------------------------------|
| strokeColor | String | 线条颜色，使用16进制颜色代码赋值。                |
| strokeOpacity | Number | 轮廓线透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明 |
| strokeWeight | Number | 轮廓线宽度                             |
| fillColor | String | 多边形填充颜色，使用16进制颜色代码赋值 | 
| fillOpacity | Number | 多边形填充透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明 |

<a name="featureStyleByLevel默认值" ></a>
###### featureStyleByLevel默认值
```js
{
  country: {
    strokeColor: 'rgb(31, 119, 180)',
    strokeOpacity: 0.9,
    strokeWeight: 2,
    fillColor: 'rgb(49, 163, 84)',
    fillOpacity: 0.8
  },
  province: {
    strokeColor: 'rgb(31, 119, 180)',
    strokeOpacity: 0.9,
    strokeWeight: 2,
    fillColor: 'rgb(116, 196, 118)',
    fillOpacity: 0.7
  },
  city: {
    strokeColor: 'rgb(31, 119, 180)',
    strokeOpacity: 0.9,
    strokeWeight: 2,
    fillColor: 'rgb(161, 217, 155)',
    fillOpacity: 0.6
  },
  district: {
    strokeColor: 'rgb(31, 119, 180)',
    strokeOpacity: 0.9,
    strokeWeight: 2,
    fillColor: 'rgb(199, 233, 192)',
    fillOpacity: 0.5
  }
}
```


## 动态属性
支持响应式。

| 名称      | 类型      | 说明                 |
|---------|---------|--------------------|
| zIndex  | Number  | 图层的层级，默认为 10       |
| visible | Boolean | 图层是否可见，默认为 true    |
| data    | Array   | 数据源数组，每个元素即为点相关的信息 |


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.CanvasLayer | 获取实例

## 事件

| 事件                 | 参数                                                              | 说明                  |
|--------------------|-----------------------------------------------------------------|---------------------|
| init               | AMap.DistrictCluster                                            | 实例初始化结束             |
| featureClick       | event, feature                                                  | 鼠标点击feature对应的区域时触发 |
| featureMouseover   | event, feature                                                  | 鼠标移入feature对应的区域时触发 |
| featureMouseout    | event, feature                                                  | 鼠标移出feature对应的区域时触发 |
| clusterMarkerClick | event, record: { adcode:number,feature:Feature,dataItems:Array} | 鼠标点击聚合标注时触发         |

