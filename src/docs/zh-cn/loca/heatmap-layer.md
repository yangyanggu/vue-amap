# 热力图 (Loca.HeatMapLayer)
热力图，支持 3D 和不同颜色设置的聚合点数据显示。并且支持像素单位和米单位的热力聚合。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" :pitch="pitch" view-mode="3D" @init="initMap" :show-label="false" class="amap-demo">
        <el-amap-loca :amb-light="ambLight" :dir-light="dirLight" :point-light="pointLight">
          <el-amap-loca-heatmap :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-heatmap>
        </el-amap-loca>
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
    var map = null;
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 11.7,
          pitch: 55,
          center: [120.19660949707033, 30.234747338474293],
          visible: true,
          ambLight: {
              intensity: 0.7,
              color: '#7b7bff',
          },
          dirLight: {
              intensity: 0.8,
              color: '#fff',
              target: [0, 0, 0],
              position: [0, -1, 1],
          },
          pointLight:  {
              color: 'rgb(240,88,25)',
              position: [112.028276, 31.58538, 2000000],
              intensity: 3,
              // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
              distance: 5000000,
          },
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_house_order.json',
          layerStyle: {
            radius: 20,
            unit: 'px',
            height: 90,
            // radius: 10,
            // unit: 'px',
            // height: 10,
            gradient: {
                0.1: 'rgba(50,48,118,1)',
                0.2: 'rgba(127,60,255,1)',
                0.4: 'rgba(166,53,219,1)',
                0.6: 'rgba(254,64,95,1)',
                0.8: 'rgba(255,98,4,1)',
                1: 'rgba(236,220,79,1)',
            },
            value: function (index, feature) {
                return feature.properties.count;
            },
            min: 0,
            max: 10,  //4.6
            heightBezier: [0, .53, .37, .98],
          }
        };
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
        },
        initMap(e){
          map = e;
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
depth | Boolean | 是否开启深度检测，开启后可能会影响zIndex  default true
initEvents | Boolean | 是否创建事件，自动为loca图层创建click和mousemove事件。 默认 true
defaultStyleValue | Object | 默认样式，可以查看下面属性说明
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
sourceUrl | String | 数据源的链接地址，一般是接口地址，返回的数据必须是 geojson 格式。
sourceData | Object | 数据对象。如果你不想使用 url 方式请求数据，可以直接填写请求好的 geojson 对象。  sourceUrl与sourceData只会生效一个，默认优先判断sourceUrl
layerStyle | Object | 图层样式
zooms | Array | 图层缩放等级范围，默认[2,20]
opacity | Number | 图层整体透明度，默认 1
visibleDuration | Number | 图层显隐时候过渡的时间，默认为0

### layerStyle参数(覆盖所有默认值)
名称 | 类型 | 说明
---|---|---|
radius | Number, Function | 半径（默认单位: px）。支持动画过渡效果。 default 20
value | Number, Function | 每个热力点的值，会影响最终的聚合结果，值越高代表越热。
gradient  | Object | 热力的颜色梯度，值是对象映射的形式。default {0.5:'blue',0.65:'rgb(117,211,248)',0.7:'rgb(0, 255, 0)',0.9:'#ffea00',1.0:'red'}
opacity | Array[Number,Number] | 热力颜色的透明度区间，热力颜色的透明度过渡将在此区间取值，可以用来调节热力图的透明度效果。default [0,1]
height  | Number, Function | 热力最高点的高度值，单位取决于 unit 字段。支持动画过渡效果。default 100
heightBezier | Array | 热力的最低点到最高点的变化曲线。default [0.4,0.2,0.4,0.8]
max | Number | 热力值的最大值，默认为数据中的最高值，也可以自定义设置，会控制热力的最热区域的显示效果。default null
min | Number | 热力值的最小值，默认为数据中的最小值，也可以自定义设置，会控制热力的最冷区域的显示效果。default null
unit | String | 热力的单位，可选值：px：像素，meter：地理单位米  default 'px',
difference | Boolean | 热力图默认的过渡效果，颜色默认会渐变过渡，如果开启 difference，将会有明显的边缘效果。default false

### defaultStyleValue参数(提供默认参数，但会被geojson的properties属性中的值覆盖)
名称 | 类型 | 说明
---|---|---|
radius | Number | 半径（默认单位: px）。支持动画过渡效果。 default 20
value | Number | 每个热力点的值，会影响最终的聚合结果，值越高代表越热。
gradient  | Object | 热力的颜色梯度，值是对象映射的形式。default {0.5:'blue',0.65:'rgb(117,211,248)',0.7:'rgb(0, 255, 0)',0.9:'#ffea00',1.0:'red'}
opacity | Array[Number,Number] | 热力颜色的透明度区间，热力颜色的透明度过渡将在此区间取值，可以用来调节热力图的透明度效果。default [0,1]
height  | Number | 热力最高点的高度值，单位取决于 unit 字段。支持动画过渡效果。default 100
heightBezier | Array | 热力的最低点到最高点的变化曲线。default [0.4,0.2,0.4,0.8]
max | Number | 热力值的最大值，默认为数据中的最高值，也可以自定义设置，会控制热力的最热区域的显示效果。default null
min | Number | 热力值的最小值，默认为数据中的最小值，也可以自定义设置，会控制热力的最冷区域的显示效果。default null
unit | String | 热力的单位，可选值：px：像素，meter：地理单位米  default 'px'
difference | Boolean | 热力图默认的过渡效果，颜色默认会渐变过渡，如果开启 difference，将会有明显的边缘效果。default false



### style说明
所有loca的Layer组件对Style设置提供了默认处理，支持function回调方式的属性都提供了默认回调实现，优先读取gesjson的properties中的值，读取不到的情况下会读取defaultStyleValue配置的值，最后会使用组件内默认设置的值。<br/>
该默认处理可以被layerStyle中的设置给覆盖。目前默认设置已基本符合日常使用，如果需要在选中目标时做高亮处理，则推荐根据示例使用事件监听然后动态修改layerStyle来实现。<br/>
style数据有可以有三个来源，优先级按顺序处理，第一个最高<br/>
##### 1、layerStyle属性配置
```javascript
{
  radius: 20,
  unit: 'px',
  height: 90,
  // radius: 10,
  // unit: 'px',
  // height: 10,
  gradient: {
    0.1: 'rgba(50,48,118,1)',
    0.2: 'rgba(127,60,255,1)',
    0.4: 'rgba(166,53,219,1)',
    0.6: 'rgba(254,64,95,1)',
    0.8: 'rgba(255,98,4,1)',
    1: 'rgba(236,220,79,1)',
  },
  value: function (index, feature) {
    return feature.properties.count;
  },
  min: 0,
    max: 10,  //4.6
    heightBezier: [0, .53, .37, .98],
}
```

##### 2、geojson的properties属性
```json
{
  "type": "FeatureCollection",
  "name": "Polygon",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    { 
      "type": "Feature", 
      "properties": {
        "radius": 50,
        "height": 100
      }, 
      "geometry": { 
        "type": "MultiPolygon", 
        "coordinates": [ [ [ [ 119.958676782427744, 32.121127961388339, 9.900800000003301 ], [ 119.958672295405933, 32.121125856630357, 9.900800000003301 ], [ 119.958649511242555, 32.121161034502613, 9.866549999998824 ], [ 119.958649466189797, 32.121161104062303, 9.900800000003301 ], [ 119.958653953212774, 32.121163208821088, 9.900800000003301 ], [ 119.958653991614412, 32.121163149530432, 9.866750000001275 ], [ 119.958676782427744, 32.121127961388339, 9.900800000003301 ] ] ] ]
      }
    }
  ]
}
```
##### 3、defaultStyleValue属性配置
```javascript
{
  radius: 20,
  value: 10,
  gradient: {0.5: 'blue', 0.65: 'rgb(117,211,248)', 0.7: 'rgb(0, 255, 0)', 0.9: '#ffea00', 1.0: 'red'},
  opacity: [0, 1],
  height: 100,
  heightBezier: [0.4, 0.2, 0.4, 0.8],
  max: null,
  min: null,
  unit: 'px'
}
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.HeatMapLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.HeatMapLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
