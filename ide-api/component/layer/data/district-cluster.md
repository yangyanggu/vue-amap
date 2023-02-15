---
title: AmapLayerDistrictCluster
---

# AmapLayerDistrictCluster
高德地图的区划聚合图层，图层基于AMapUI的区划插件改造实现

## Attributes

| Attribute   | Type          | Description                                                         
|-------------|---------------|---------------------------------------------------------------------
zIndex      | Number        | 图层的层级，默认为 10                                                        
visible      | Boolean       | 图层是否可见，默认为 true                                                     
data         | Array         | 数据源数组，每个元素即为点相关的信息                                                  
getPosition  | Function      | 返回数据项中的经纬度信息                                                        
autoSetFitView | Boolean       | 是否在绘制后自动调整地图视野以适合全部点，默认true                                         
topAdcodes   | number[]      | 顶层区划的adcode列表。默认为[100000]，即全国范围.假如仅需要展示河北和北京，可以设置为[130000, 110000], 
excludedAdcodes | number[]      | 需要排除的区划的adcode列表                                                    
renderOptions | RenderOptions | 绘制的引擎的参数                                                            
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.DistrictCluster | 实例初始化结束
featureClick      | event, feature                                                  | 鼠标点击feature对应的区域时触发 
featureMouseover  | event, feature                                                  | 鼠标移入feature对应的区域时触发 
featureMouseout   | event, feature                                                  | 鼠标移出feature对应的区域时触发 
clusterMarkerClick | event, record: { adcode:number,feature:Feature,dataItems:Array} | 鼠标点击聚合标注时触发         

