# 海量点 (AMap.MassMarks)
海量点类

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-mass-marks :data="points" :visible="visible" :styles="styles" @init="markerInit" @click="clickMarker">
        </el-amap-mass-marks>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏海量点' : '显示海量点'}}</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    const cities = require('./assets/js/citys.js');
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 3,
          center: [102.342785, 35.312316],
          visible: true,
          points: cities,
          styles: [{
              url: 'https://webapi.amap.com/images/mass/mass0.png',
              anchor: [6, 6],
              size: [11, 11],
              zIndex: 3,
            }, {
                url: 'https://webapi.amap.com/images/mass/mass1.png',
                anchor: [4, 4],
                size: [7, 7],
                zIndex: 2,
            }, {
                url: 'https://webapi.amap.com/images/mass/mass2.png',
                anchor: [3, 3],
                size: [5, 5],
                zIndex: 1,
            }
          ]
        };
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
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
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖


## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
data | Array | 海量点数据
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
zooms | Array | 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
cursor | String | 指定鼠标悬停时的鼠，默认值：'pointer'
styles | Array, Object | 标号样式，可以是Object代表所有点样式一样，也可以是Array，根据各个点的设定来判断选择哪个样式

### data参数
名称 | 类型 | 说明
---|---|---|
lnglat | Array | 经纬度
style | Number | 样式索引值

### styles参数
名称 | 类型 | 说明
---|---|---|
url | String | 图标 url
size | Array | 图标显示大小
rotation | Number | 旋转角度
anchor | Array | 锚点位置
zIndex | Number | 点展示优先级，默认为使用样式的索引值。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.MassMarks | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.MassMarks | `AMap.MassMarks`实例
complete | | 海量点加载完成事件
click | MapsEvent | 鼠标左键单击事件
dblclick | MapsEvent | 鼠标左键双击事件
mousemove | MapsEvent | 鼠标移动
mouseover | MapsEvent | 鼠标移近点标记时触发事件
mouseout | MapsEvent | 鼠标移出点标记时触发事件
mousedown | MapsEvent | 鼠标在点标记上按下时触发事件
mouseup | MapsEvent | 鼠标在点标记上按下后抬起时触发事件
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
