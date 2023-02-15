# GeoJSON(AMap.GeoJSON)
GeoJSON类，继承自OverLayGroup，可实现GeoJSON对象与OverlayGroup的相互转换

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amap" :zoom="zoom" :center="center"
      ref="map"
      class="amap-demo">
        <el-amap-geojson :geo="geoJSON" :polygon-options="polygonOptions" :visible="visible" :draggable="draggable" @click="click"></el-amap-geojson>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏标记' : '显示标记'}}</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    const geo = require('./assets/js/chongqing.js');
    module.exports = {
      data () {
        return {
          zoom: 7,
          center: [107.943579, 30.131735],
          draggable: false,
          visible: true,
          geoJSON: geo,
          polygonOptions: {
            strokeColor: 'red',
            fillColor: 'blue'
          }
        }
      },
      methods: {
        click: (e) => {
          console.log('click event: ', e);
          alert('click geojson');
        },
        toggleVisible(){
          this.visible = !this.visible;
        },
      }
    };
  </script>
</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
markerOptions | Object | marker的默认样式。存在getMarker参数时，该属性失效。该属性里的参数会全部带入marker中，但会被geojson的properties中的属性给覆盖。
getMarker | Funtion (geojson, lnglats) | 指定点要素的绘制方式，缺省时为Marker的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
polylineOptions | Object | polyline的默认样式。存在getPolyline参数时，该属性失效。该属性里的参数会全部带入polyline中，但会被geojson的properties中的属性给覆盖。
getPolyline | Funtion (geojson, lnglats) | 指定线要素的绘制方式，缺省时为Polyline的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
polygonOptions | Object | polygon的默认样式。存在getPolygon参数时，该属性失效。该属性里的参数会全部带入polygon中，但会被geojson的properties中的属性给覆盖。
getPolygon | Funtion (geojson, lnglats) | 指定线要素的绘制方式，缺省时为Polygon的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
geo | Object| 要加载的标准GeoJSON对象
visible | Boolean | 是否可见

### markerOptions参数列表
名称 | 类型 | 说明
---|---|---|
topWhenClick | Boolean | 鼠标点击时marker是否置顶，默认false ，不置顶
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上, 默认值：false。
zooms | Array | 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
offset | Array | 点标记显示位置偏移量，默认值为 [0,0] 。Marker指定position后，默认以marker左上角位置为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
icon | String AMap.Icon | 在点标记中显示的图标。可以传一个图标地址，也可以传Icon对象。有合法的content内容设置时，此属性无效。
content | String HTMLElement | 点标记显示内容。可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖。 支持slot
cursor | String | 指定鼠标悬停时的鼠，默认值：'pointer'
angle | Number | 点标记的旋转角度，，广泛用于改变车辆行驶方向。默认值：0
title | String | 鼠标滑过点标记时的文字提示。不设置则鼠标滑过点标无文字提示。
clickable | Boolean | 点标记是否可点击，默认值: true
label | {content,offset: [x, y]} | 添加文本标注，content为文本标注的内容，offset为偏移量，为偏移量,如设置了 direction，以 direction 方位为基准点进行偏移。
extData | any | 用户自定义属 ，支持JavaScript API任意数据类型，如 Marker的id等。可将自定义数据保存在该属性上，方便后续操作使用。

### polylineOptions参数列表
名称 | 类型 | 说明
---|---|---|
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 默认 false
zIndex | Number | 折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示。默认zIndex：10
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#006600
strokeOpacity | Number | 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
strokeWeight | Number | 线条宽度，单位：像素
borderWeight | Number | 描边线宽度
isOutline | Boolean | 线条是否带描边，默认false
outlineColor | String | 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
strokeStyle | String | 线样式，实线:solid，虚线:dashed
strokeDasharray	| Array | 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
lineJoin | String | 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
lineCap | String | 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
geodesic | Boolean | 是否绘制大地线，默认false
showDir | Boolean | 是否延路径显示白色方向箭头,默认false。建议折线宽度大于6时使用
extData | any | 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等

### polygonOptions参数列表
名称 | 类型 | 说明
---|---|---|
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）默认值：false
zIndex | Number | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示默认zIndex：10
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
strokeOpacity | float | 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
strokeWeight | Number | 轮廓线宽度
fillColor | String | 多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
fillOpacity | Float | 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
extData | Any | 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
strokeStyle | String | 轮廓线样式，实线:solid，虚线:dashed
strokeDasharray | Array | 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.GeoJSON | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
rightclick | MapsEvent | 右键单击
mousedown | MapsEvent | 鼠标按下
mouseup | MapsEvent | 鼠标抬起
mouseover | MapsEvent | 鼠标经过
mouseout | MapsEvent | 鼠标移出
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
