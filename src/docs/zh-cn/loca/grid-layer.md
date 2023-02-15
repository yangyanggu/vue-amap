# 网格图 (Loca.GridLayer)
网格图，将普通的点数据按照网格划分成若干区域，每个网格区域都会包含落在此区域内的点数据信息。 每个网格格子支持单独设置自定义的高度信息、颜色信息。 要注意的是：我们认为所有网格格子必须是唯一的大小（radius）和间隙（gap）。我们还在带有高度的网格中加入了可接受光照信息的属性：acceptLight。假如设置了光照并在图层中开启接受光照， 那么每个立体网格将会有光照反射的效果。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" :pitch="pitch" view-mode="3D" @init="initMap" :show-label="false" class="amap-demo">
        <el-amap-loca :amb-light="ambLight" :dir-light="dirLight" :point-light="pointLight">
          <el-amap-loca-grid :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-grid>
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
    var colors = ['#FAE200', '#D27E37', '#C53634', '#C12B6E', '#A92E9A', '#67238A', '#211A50', '#18244E'].reverse();
    var heights = [100, 200, 400, 600, 800, 1400, 1800, 4000];
    var map = null;
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 11,
          pitch: 55,
          center: [114.341232,30.567523],
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
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/wh_car.json',
          layerStyle: {
              unit: 'meter',
              radius:66,
              gap: 0,
              altitude: 100,
              height: function (index, feature) {
                  var ranks = feature.coordinates && feature.coordinates.length || 0;
                  return ranks < 5 ?
                      heights[0] : ranks < 10 ?
                          heights[1] : ranks < 20 ?
                              heights[2] : ranks < 30 ?
                                  heights[3] : ranks < 50 ?
                                      heights[4] : ranks < 80 ?
                                          heights[5] : ranks < 100 ?
                                              heights[6] : heights[7];
              },
              topColor: function (index, feature) {
                  var ranks = feature.coordinates && feature.coordinates.length || 0;
                  return ranks < 5 ?
                      colors[0] : ranks < 10 ?
                          colors[1] : ranks < 20 ?
                              colors[2] : ranks < 30 ?
                                  colors[3] : ranks < 50 ?
                                      colors[4] : ranks < 80 ?
                                          colors[5] : ranks < 100 ?
                                              colors[6] : colors[7];
              },
              sideTopColor: function (index, feature) {
                  var ranks = feature.coordinates && feature.coordinates.length || 0;
                  return ranks < 5 ?
                      colors[0] : ranks < 10 ?
                          colors[1] : ranks < 20 ?
                              colors[2] : ranks < 30 ?
                                  colors[3] : ranks < 50 ?
                                      colors[4] : ranks < 80 ?
                                          colors[5] : ranks < 100 ?
                                              colors[6] : colors[7];
              },
              sideBottomColor: function (index, feature) {
                  var ranks = feature.coordinates && feature.coordinates.length || 0;
                  return ranks < 5 ?
                      colors[0] : ranks < 10 ?
                          colors[1] : ranks < 20 ?
                              colors[2] : ranks < 30 ?
                                  colors[3] : ranks < 50 ?
                                      colors[4] : ranks < 80 ?
                                          colors[5] : ranks < 100 ?
                                              colors[6] : colors[7];
              }
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
cullface | String | 剔除背面/前面的面（选择剔除将会提升性能），可选：back/front/none，back是剔除背面的面，front是剔除前面的面，none是不进行剔除。default 'back'
acceptLight | Boolean | 面是否接受光照，光照信息在 loca 对象中配置 default true
shininess | Number | 立体网格的粗糙度，值越高，说明表面越粗糙。default 30
hasSide | Boolean | 当面有厚度的时候，有没有侧面和底面 default true
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
radius | Number, Function | 一个网格的半径大小，只能是一个常量值。单位由 unit 决定。 default 1000
unit | String | 单位，只能是一个常量值。可选项: px, meter。一个是屏幕像素单位，一个是地理单位。地理单位性能更加优异。default 'meter'
gap | Number | 相邻网格的间隙大小，只能是一个常量值。单位由 unit 决定。default 0
altitude  | Number, Function | 海拔高度，代表棱柱的离地高度。支持动画过渡效果。 default 0
height  | Number, Function | 棱柱的高度。单位是 unit 的值。支持动画过渡效果。default 100
topColor | String, Function | 棱柱的顶面颜色值。default '#fff'
sideTopColor | String, Function | 棱柱的侧面顶部颜色值。default '#fff'
sideBottomColor | String, Function | 棱柱的侧面底部颜色值。default '#fff'


### defaultStyleValue参数(提供默认参数，但会被geojson的properties属性中的值覆盖)
名称 | 类型 | 说明
---|---|---|
radius | Number | 一个网格的半径大小，只能是一个常量值。单位由 unit 决定。 default 1000
unit | String | 单位，只能是一个常量值。可选项: px, meter。一个是屏幕像素单位，一个是地理单位。地理单位性能更加优异。default 'meter'
gap | Number | 相邻网格的间隙大小，只能是一个常量值。单位由 unit 决定。default 0
altitude  | Number | 海拔高度，代表棱柱的离地高度。支持动画过渡效果。 default 0
height  | Number | 棱柱的高度。单位是 unit 的值。支持动画过渡效果。default 100
topColor | String | 棱柱的顶面颜色值。default '#fff'
sideTopColor | String | 棱柱的侧面顶部颜色值。default '#fff'
sideBottomColor | String | 棱柱的侧面底部颜色值。default '#fff'


### style说明
所有loca的Layer组件对Style设置提供了默认处理，支持function回调方式的属性都提供了默认回调实现，优先读取gesjson的properties中的值，读取不到的情况下会读取defaultStyleValue配置的值，最后会使用组件内默认设置的值。<br/>
该默认处理可以被layerStyle中的设置给覆盖。目前默认设置已基本符合日常使用，如果需要在选中目标时做高亮处理，则推荐根据示例使用事件监听然后动态修改layerStyle来实现。<br/>
style数据有可以有三个来源，优先级按顺序处理，第一个最高<br/>
##### 1、layerStyle属性配置
```javascript
{
  unit: 'meter',
  radius:66,
  gap: 0,
  altitude: 100,
  height: function (index, feature) {
      var ranks = feature.coordinates && feature.coordinates.length || 0;
      return ranks < 5 ?
          heights[0] : ranks < 10 ?
              heights[1] : ranks < 20 ?
                  heights[2] : ranks < 30 ?
                      heights[3] : ranks < 50 ?
                          heights[4] : ranks < 80 ?
                              heights[5] : ranks < 100 ?
                                  heights[6] : heights[7];
  },
  topColor: function (index, feature) {
      var ranks = feature.coordinates && feature.coordinates.length || 0;
      return ranks < 5 ?
          colors[0] : ranks < 10 ?
              colors[1] : ranks < 20 ?
                  colors[2] : ranks < 30 ?
                      colors[3] : ranks < 50 ?
                          colors[4] : ranks < 80 ?
                              colors[5] : ranks < 100 ?
                                  colors[6] : colors[7];
  },
  sideTopColor: function (index, feature) {
      var ranks = feature.coordinates && feature.coordinates.length || 0;
      return ranks < 5 ?
          colors[0] : ranks < 10 ?
              colors[1] : ranks < 20 ?
                  colors[2] : ranks < 30 ?
                      colors[3] : ranks < 50 ?
                          colors[4] : ranks < 80 ?
                              colors[5] : ranks < 100 ?
                                  colors[6] : colors[7];
  },
  sideBottomColor: function (index, feature) {
      var ranks = feature.coordinates && feature.coordinates.length || 0;
      return ranks < 5 ?
          colors[0] : ranks < 10 ?
              colors[1] : ranks < 20 ?
                  colors[2] : ranks < 30 ?
                      colors[3] : ranks < 50 ?
                          colors[4] : ranks < 80 ?
                              colors[5] : ranks < 100 ?
                                  colors[6] : colors[7];
  }
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
  topColor: '#fff',
  sideTopColor: '#fff',
  sideBottomColor: '#fff',
  altitude: 0,
  height: 0,
  radius: 1000,
  gap: 0,
  unit: 'meter'
}
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.GridLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.GridLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
