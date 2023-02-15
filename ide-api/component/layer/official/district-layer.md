---
title: AmapLayerDistrict
---

# AmapLayerDistrict
简易行政区划图。

## Attributes

Attribute | Type | Description
---|---|---|
type | String | 类型，可选值：World 世界, Country 国家, Province 省市
depth | Number | 设定数据的层级深度，depth为0的时候只显示国家面，depth为1的时候显示省级， 当国家为中国时设置depth为2的可以显示市一级
adcode | String | 行政区的编码，可从链接下载[adcode与省市行政区对照表](https://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip)
SOC | String | 设定显示的国家 [SOC 国家代码、名称、Bounds对照表下载](https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json)
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1
styles | Object | 为简易行政区图设定各面的填充颜色和描边颜色。 styles各字段的值可以是颜色值，也可以是一个返回颜色值* 的回调函数function。支持的颜色格式有：<br/>1. #RRGGBB，如：'#FFFFFF' <br/>2. rgba()，如：'rgba(255,255,255,1)'<br/> 3. rgb()，如：'rgb(255,255,255)'<br/>4. [r,g,b,a] ，如： [1,1,1,1]<br/>5. ''，代表不赋予颜色
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.DistrictLayer | 实例初始化结束
