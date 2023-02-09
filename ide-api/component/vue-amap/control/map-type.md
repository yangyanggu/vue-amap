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
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false


## Events

| Event Name | Parameters                      | Description        |
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
