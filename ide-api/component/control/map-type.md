---
title: AmapControlMapType
---

# AmapControlMapType
地图类型切换插件。用户通过该插件进行地图切换。

## Attributes

Attribute | Type | Description
---|---|---|
defaultType | Number | 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
showTraffic  | Boolean | 叠加实时交通图层 默认值：false
showRoad | Boolean | 叠加路网图层 默认值：false
visible | Boolean | 是否显示，默认true


## Events

| Event Name | Parameters                      | Description        |
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
