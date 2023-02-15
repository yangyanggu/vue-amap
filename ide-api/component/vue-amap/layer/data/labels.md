---
title: AmapLayerLabels
---

# AmapLayerLabels
标注层。<br/>
有三种方法添加标注。使用效果见下面示例<br/>
1、通过init事件拿到layer实例，再调用`add`方法进行添加<br/>
2、通过$refs拿到layer的vue实例，再通过`$$add`方法进行添加<br/>
3、通过`slot`方式进行添加

## Attributes

Attribute | Type | Description
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1
collision | Boolean | 标注层内的标注是否避让
allowCollision | Boolean | 标注层内的标注是否允许其它标注层对它避让
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.LabelsLayer | 实例初始化结束


