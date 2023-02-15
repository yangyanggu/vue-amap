# 折线(AMap.Polyline)
构造折线对象，支持 lineString 和 MultiLineString

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-polyline :editable="polyline.editable" :visible="polyline.visible" :draggable="polyline.draggable" :path="polyline.path" @click="click" ></el-amap-polyline>
      </el-amap>

      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{polyline.visible ? '隐藏标记' : '显示标记'}}</button>
        <button type="button" name="button" @click="changeDraggable">{{polyline.draggable ? '禁止标记移动' : '允许标记移动'}}</button>
        <button type="button" name="button" @click="changeEditable">{{polyline.editable ? '停止编辑' : '开始编辑'}}</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data() {
        return {
          zoom: 12,
          center: [121.5273285, 31.25515044],
          polyline: {
            path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
            editable: false,
            visible: true,
            draggable: false
          }
        };
      },
      methods: {
        changeEditable() {
          this.polyline.editable = !this.polyline.editable;
        },
        toggleVisible(){
          this.polyline.visible = !this.polyline.visible;
        },
        changeDraggable(){
          this.polyline.draggable = !this.polyline.draggable;
        },
        click(e) {
          alert('click polyline');
        },
      }
    };
  </script>

</script>


## 静态属性

仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 默认 false
editOptions | Object | [设置编辑参数参数](https://a.amap.com/jsapi/static/doc/20210906/index.html?v=2#polylineeditor)
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否可见
editable | Boolean | 折线当前是否可编辑
path | Array | polyline 路径，支持 lineString 和 MultiLineString
zIndex | Number | 折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示。默认zIndex：10
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#006600
strokeOpacity | Number | 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
strokeWeight | Number | 线条宽度，单位：像素
borderWeight | Number | 描边线宽度
isOutline | Boolean | 线条是否带描边，默认false
outlineColor | String | 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
draggable | Boolean | 设置多边形是否可拖拽移动，默认为false
strokeStyle | String | 线样式，实线:solid，虚线:dashed
strokeDasharray	| Array | 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
lineJoin | String | 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
lineCap | String | 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
geodesic | Boolean | 是否绘制大地线，默认false
showDir | Boolean | 是否延路径显示白色方向箭头,默认false。建议折线宽度大于6时使用
extData | any | 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.Polyline | 获取实例


## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 高德组件实例
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
rightclick | MapsEvent | 鼠标右键单击事件
hide | {type, target} | 隐藏
show | {type, target} | 显示
mousedown | MapsEvent | 鼠标按下
mouseup | MapsEvent | 鼠标抬起
mouseover | MapsEvent | 鼠标经过
mouseout | MapsEvent | 鼠标移出
dragstart | MapsEvent | 开始拖拽标记时触发事件
dragging | MapsEvent | 鼠标拖拽移动标记时触发事件
dragend | MapsEvent | 标记拖拽移动结束触发事件
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
addnode |	{target: Polygon, lnglat: Lnglat, pixel: Pixel} | 	编辑状态下，通过鼠标在折线上增加一个节点或在多边形上增加一个顶点时触发此事件
removenode | {target: Polygon, lnglat: Lnglat, pixel: Pixel} |	编辑状态下，通过鼠标在折线上删除一个节点或在多边形上删除一个顶点时触发此事件
adjust |	{target: Polygon, lnglat: Lnglat, pixel: Pixel} |	编辑状态下，鼠标调整折线上某个节点或多边形上某个顶点的位置时触发此事件
add | {target: target} | 创建一个覆盖物之后触发该事件，target即为创建对象。当editor编辑对象为空时，调用open接口，再点击一次屏幕就会创建新的覆盖物对象
end |	{type,target}	 | 关闭编辑状态，触发该事件，target即为编辑后的折线/多边形对象
