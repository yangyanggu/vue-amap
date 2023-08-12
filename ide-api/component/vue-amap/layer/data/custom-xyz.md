---
title: AmapLayerCustomXyz
---

# AmapLayerCustomXyz
自定义瓦片纠偏图层是基于GLCustomLayer实现的瓦片加载图层，支持瓦片坐标系纠偏，支持`wgs84` `gcj02` `bd09`三种坐标系。

## Attributes

 Attribute         | Type | Description
-------------------|---|---|
| url               | string                                         | 瓦片地址，支持 {s} {x} {y} {z}，示例：`http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}` |
| subdomains        | string[]                                       | 子域名数组，当url中设置{s}后，该属性必填                                                                            | 
| tileType          | 'xyz' \| 'bd09'                                | 瓦片分割类型，默认是`xyz`，xyz代表瓦片是编号是从左上角开始，百度瓦片是由中间开始，所以需要区分普通瓦片还是百度                                        |
| proj              | 'wgs84' \| 'gcj02' \| 'bd09'                   | 瓦片使用的坐标系，默认是`gcj02`                                                                                |
| zooms             | [number,number]                                | 图层缩放等级范围，默认 [2, 18]                                                                                |
| opacity           | number                                         | 图层透明度，默认为 1                                                                                        |
| visible           | boolean                                        | 图层是否可见，默认为 true                                                                                    |
| zIndex            | number                                         | 图层的层级，默认为 120                                                                                      | 
| debug             | boolean                                        | 开启debug后瓦片上将显示瓦片编号                                                                                 |
| mask              | number[][] \| number[][][]   \| number[][][][] | 瓦片掩膜，数据结构与AMap.Map的mask参数一致                                                                        |
| cacheSize         | number                                         | 瓦片缓存数量，默认-1，不限制缓存瓦片数                                                                               |
| reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false
|  extraOptions     | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖
| tileMaxZoom | number                                         | 瓦片在服务器的最大层级，当地图zoom超过该层级后直接使用该层级作为做大层级瓦片，默认18                                                      |
| altitude    | number                                         | 加载的瓦片海拔，设置该值后，在3D模式下瓦片将浮空，默认：0                                                                     |

## Events

Event Name | Parameters | Description
---|---|---|
init | CustomXyzLayer | 实例初始化结束

