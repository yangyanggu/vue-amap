# 灵活点标记 (AMap.ElasticMarker)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-elastic-marker :position="componentMarker.position" title="标号" :visible="componentMarker.visible" :draggable="componentMarker.draggable" :zoom-style-mapping="componentMarker.zoomStyleMapping" :styles="componentMarker.styles" @init="markerInit" @click="clickMarker">
        </el-amap-elastic-marker>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{componentMarker.visible ? '隐藏标记' : '显示标记'}}</button>
        <button type="button" name="button" @click="changePosition">改变标记位置</button>
        <button type="button" name="button" @click="changeDraggable">{{componentMarker.draggable ? '禁止标记移动' : '允许标记移动'}}</button>
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
      name: 'amap-page',
      data() {
        return {
          zoom: 16,
          center: [116.412866, 39.88365],
          componentMarker: {
            position: [116.412866, 39.88365],
            visible: true,
            draggable: false,
            zoomStyleMapping:  {
                14: 0,
                15: 0,
                16: 1,
                17: 1,
                18: 1,
                19: 1,
                20: 1
            },
            styles: [{
               icon: {
                    img: 'https://a.amap.com/jsapi_demos/static/resource/img/故宫.png',
                    size: [16, 16],//可见区域的大小
                    anchor: 'bottom-center',//锚点
                    fitZoom: 14,//最合适的级别
                    scaleFactor: 2,//地图放大一级的缩放比例系数
                    maxScale: 2,//最大放大比例
                    minScale: 1//最小放大比例
                },
                label: {
                    content: '祈年殿',
                    position: 'BM',
                    minZoom: 15
                }
          },{
                icon: {
                    img: 'https://a.amap.com/jsapi_demos/static/resource/img/qiniandian.png',
                    size: [128, 160],
                    anchor: 'bottom-center',
                    fitZoom: 17.5,
                    scaleFactor: 2,
                    maxScale: 2,
                    minScale: 0.125
                },
                label: {
                    content: '祈年殿',
                    position: 'BM'
                }
            }],
          }
        };
      },
      methods: {
        changePosition() {
          let position = this.componentMarker.position;
          this.componentMarker.position = [position[0] + 0.002, position[1] - 0.002];
        },
        changeDraggable() {
          this.componentMarker.draggable = !this.componentMarker.draggable;
        },
        toggleVisible() {
          this.componentMarker.visible = !this.componentMarker.visible;
        },
        markerInit(e){
          console.log('marker init: ', e);
        },
        clickMarker(){
          alert('点击了标号')
        },
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
topWhenClick | Boolean | 鼠标点击时marker是否置顶，默认false ，不置顶
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上, 默认值：false。
zooms | Array | 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示
position | Array | 点标记在地图上显示的位置
offset | Array | 点标记显示位置偏移量，默认值为 [0,0] 。Marker指定position后，默认以marker左上角位置为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
draggable | Boolean | 设置点标记是否可拖拽移动，默认为false。
cursor | String | 指定鼠标悬停时的鼠，默认值：'pointer'
title | String | 鼠标滑过点标记时的文字提示。不设置则鼠标滑过点标无文字提示。
clickable | Boolean | 点标记是否可点击，默认值: true
zoomStyleMapping | Object | 表示地图级别与styles中样式的映射，{14:0,15:0,16:1,17:1,}表示14到15级使用styles中的第0个样式，16-17级使用第二个样式
styles | Array | 多个不同样式的数组。每个style对象有用两个参数 icon 和 label
extData | any | 用户自定义属 ，支持JavaScript API任意数据类型，如 Marker的id等。可将自定义数据保存在该属性上，方便后续操作使用。

### styles.icon参数说明
名称 | 类型 | 说明
---|---|---|
anchor | Array, String | 图标锚点
imageOffset | Array | 图片偏移量
imageSize | Number | 图片大小
fitZoom | Number | 最合适的级别，在此级别下显示为原始大小
scaleFactor | Number | 地图放大一级的缩放比例系数
maxScale | Number | 最大放大比例
minScale | Number | 最小放大比例

### styles.label参数说明
名称 | 类型 | 说明
---|---|---|
content | String | 文本内容
position | String | 文本位置相对于图标的基准点，可选值：BL、BM、BR、ML、MR、TL、TM、TR分别代表左下角、底部中央、右下角、左侧中央、右侧中央、左上角、顶部中央、右上角
offset | Array | 相对position的偏移量
minZoom | Number | label的最小显示级别

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.ElasticMarker | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.ElasticMarker | `AMap.ElasticMarker`实例
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
rightclick | MapsEvent | 鼠标右键单击事件
mousemove | MapsEvent | 鼠标移动
mouseover | MapsEvent | 鼠标移近点标记时触发事件
mouseout | MapsEvent | 鼠标移出点标记时触发事件
mousedown | MapsEvent | 鼠标在点标记上按下时触发事件
mouseup | MapsEvent | 鼠标在点标记上按下后抬起时触发事件
dragstart | MapsEvent | 开始拖拽点标记时触发事件
dragging | MapsEvent | 鼠标拖拽移动点标记时触发事件
dragend | MapsEvent | 点标记拖拽移动结束触发事件
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
