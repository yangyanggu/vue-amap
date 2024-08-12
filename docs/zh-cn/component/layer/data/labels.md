---
title: 标注层
description: AMap.LabelsLayer 标注层，可以通过init事件、vue实例中的$$add方法、slot三种方式添加标注
head:
  - - meta
    - name: keywords
      content: 标注层, AMap.LabelsLayer, 标注, Label
---

# 标注层 (AMap.LabelsLayer)
标注层。<br/>
有三种方法添加标注。使用效果见下面示例<br/>
1、通过init事件拿到layer实例，再调用`add`方法进行添加<br/>
2、通过$refs拿到layer的vue实例，再通过`$$add`方法进行添加<br/>
3、通过`slot`方式进行添加

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/data/labels
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1
collision | Boolean | 标注层内的标注是否避让
allowCollision | Boolean | 标注层内的标注是否允许其它标注层对它避让

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.LabelsLayer | 获取实例
$$add() | | 添加LabelMarker，可以传单个实例，也可以传多个实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.LabelsLayer | 实例初始化结束


