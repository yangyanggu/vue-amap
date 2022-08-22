---
title: AmapEllipse
---

# AmapEllipse
构造椭圆对象

## Attributes

Attribute | Type | Description
---|---|---|
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）默认值：false
editOptions | Object | [设置编辑参数参数](https://a.amap.com/jsapi/static/doc/20210906/index.html?v=2#polygoneditor)
center | Array| 圆心位置
radius | Array | 椭圆的半径，用2个元素的数组表示，单位：米 如： radius: [1000, 2000] 表示横向半径是1000，纵向的半径是2000 默认值： [1000, 1000]
visible | Boolean | 是否可见
editable | Boolean | 多边形当前是否可编辑 (启动编辑时需要关闭 draggable，不然会导致图形被移走，但操作点还在原位)
zIndex | Number | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示默认zIndex：10
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
strokeOpacity | float | 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
strokeWeight | Number | 轮廓线宽度
fillColor | String | 多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
fillOpacity | Float | 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
extData | Any | 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
strokeStyle | String | 轮廓线样式，实线:solid，虚线:dashed
strokeDasharray | Array | 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
draggable | Boolean | 设置多边形是否可拖拽移动，默认为false
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
rightclick | MapsEvent | 右键单击
hide | {type, target} | 隐藏
show | {type, target} | 显示
mousedown | MapsEvent | 鼠标按下
mouseup | MapsEvent | 鼠标抬起
mouseover | MapsEvent | 鼠标经过
mouseout | MapsEvent | 鼠标移出
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
addnode |	{target: Polygon, lnglat: Lnglat, pixel: Pixel} | 	编辑状态下，通过鼠标在折线上增加一个节点或在多边形上增加一个顶点时触发此事件
removenode | {target: Polygon, lnglat: Lnglat, pixel: Pixel} |	编辑状态下，通过鼠标在折线上删除一个节点或在多边形上删除一个顶点时触发此事件
move | {target: Polygon, lnglat: Lnglat, pixel: Pixel} | 移动覆盖物时触发此事件
adjust |	{target: Polygon, lnglat: Lnglat, pixel: Pixel} |	编辑状态下，鼠标调整折线上某个节点或多边形上某个顶点的位置时触发此事件
add | {target: target} | 创建一个覆盖物之后触发该事件，target即为创建对象。当editor编辑对象为空时，调用open接口，再点击一次屏幕就会创建新的覆盖物对象
end |	{type,target}	 | 关闭编辑状态，触发该事件，target即为编辑后的折线/多边形对象

