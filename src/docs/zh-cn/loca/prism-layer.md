# 棱柱图层 (Loca.PrismLayer)
棱柱图层，使用点类型数据表达带有高度的立体棱柱，使用高度、颜色、半径等样式表达点数据的不同维度属性信息。支持动画、光照效果。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" :pitch="pitch" view-mode="3D" @init="initMap" :show-label="false" class="amap-demo">
        <el-amap-loca :amb-light="ambLight" :dir-light="dirLight" :point-light="pointLight">
          <el-amap-loca-prism :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-prism>
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
    var topConf = {
        '上海市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-one.png',
        '北京市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-two.png',
        '广州市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-three.png',
    };
    var map = null;
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 2,
          pitch: 55,
          center: [103.594884,36.964587],
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
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
          layerStyle: {
              unit: 'meter',
              sideNumber: 32,
              topColor: (index, f) => {
                  var n = f.properties['GDP'];
                  return n > 7000 ? '#E97091' : '#2852F1';
              },
              sideTopColor: (index, f) => {
                  var n = f.properties['GDP'];
                  return n > 7000 ? '#E97091' : '#2852F1';
              },
              sideBottomColor: '#002bb9',
              radius: 15000,
              height: (index, f) => {
                  var props = f.properties;
                  var height = Math.max(100, Math.sqrt(props['GDP']) * 9000 - 50000);
                  var conf = topConf[props['名称']];
                  // top3 的数据，增加文字表达
                  if (conf) {
                      map.add(
                          new AMap.Marker({
                              anchor: 'bottom-center',
                              position: [f.coordinates[0], f.coordinates[1], height],
                              content: '<div style="margin-bottom: 10px; float: left; font-size: 14px;height: 57px; width: 180px; color:#fff; background: no-repeat url(' +
                                  conf +
                                  '); background-size: 100%;"><p style="margin: 7px 0 0 35px; height: 20px; line-height:20px;">' +
                                  props['名称'] + '人口 ' + props['人口'] + '</p>' +
                                  '<p style="margin: 4px 0 0 35px; height: 20px; line-height:20px; color: #00a9ff; font-size: 13px;">' +
                                  props['GDP'] + ' 元' +
                                  '</p></div>',
                          }),
                      );
                  }
                  return height;
                  // return 60000 + n * 100;
              },
              // rotation: 360 * 100,
              altitude: 0,
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
radius | Number, Function | 半径（默认单位: px）。支持动画过渡效果。 default 20
unit | String | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'
sideNumber  | Number, Function | 棱柱的边数，默认是 3，如果希望做成圆柱体效果，可以尝试此字段设置一个较大的值，例如：32。  default 3
rotation | Number, Function | 每个棱柱的旋转角度，取值范围 0 ~ 360；可以支持动画效果。default 0
altitude  | Number, Function | 海拔高度，代表棱柱的离地高度。支持动画过渡效果。 default 0
height  | Number, Function | 棱柱的高度。单位是 unit 的值。支持动画过渡效果。default 100
topColor | String, Function | 棱柱的顶面颜色值。default '#fff'
sideTopColor | String, Function | 棱柱的侧面顶部颜色值。default '#fff'
sideBottomColor | String, Function | 棱柱的侧面底部颜色值。default '#fff'

### defaultStyleValue参数(提供默认参数，但会被geojson的properties属性中的值覆盖)
名称 | 类型 | 说明
---|---|---|
radius | Number | 半径（默认单位: px）。支持动画过渡效果。 default 20
unit | String | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'
sideNumber  | Number | 棱柱的边数，默认是 3，如果希望做成圆柱体效果，可以尝试此字段设置一个较大的值，例如：32。  default 3
rotation | Number | 每个棱柱的旋转角度，取值范围 0 ~ 360；可以支持动画效果。default 0
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
    sideNumber: 32,
    topColor: (index, f) => {
    var n = f.properties['GDP'];
    return n > 7000 ? '#E97091' : '#2852F1';
  },
    sideTopColor: (index, f) => {
    var n = f.properties['GDP'];
    return n > 7000 ? '#E97091' : '#2852F1';
  },
    sideBottomColor: '#002bb9',
    radius: 15000,
    height: (index, f) => {
    var props = f.properties;
    var height = Math.max(100, Math.sqrt(props['GDP']) * 9000 - 50000);
    var conf = topConf[props['名称']];
    // top3 的数据，增加文字表达
    if (conf) {
      map.add(
        new AMap.Marker({
          anchor: 'bottom-center',
          position: [f.coordinates[0], f.coordinates[1], height],
          content: '<div style="margin-bottom: 10px; float: left; font-size: 14px;height: 57px; width: 180px; color:#fff; background: no-repeat url(' +
            conf +
            '); background-size: 100%;"><p style="margin: 7px 0 0 35px; height: 20px; line-height:20px;">' +
            props['名称'] + '人口 ' + props['人口'] + '</p>' +
            '<p style="margin: 4px 0 0 35px; height: 20px; line-height:20px; color: #00a9ff; font-size: 13px;">' +
            props['GDP'] + ' 元' +
            '</p></div>',
        }),
      );
    }
    return height;
    // return 60000 + n * 100;
  },
    // rotation: 360 * 100,
  altitude: 0,
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
        "topColor": 'blue',
        "height": 50
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [ [ [ [ 119.958676782427744, 32.121127961388339 ], [ 119.958672295405933, 32.121125856630357 ], [ 119.958649511242555, 32.121161034502613 ], [ 119.958649466189797, 32.121161104062303 ], [ 119.958653953212774, 32.121163208821088 ], [ 119.958653991614412, 32.121163149530432 ], [ 119.958676782427744, 32.121127961388339 ] ] ] ]
      }
    }
  ]
}
```
##### 3、defaultStyleValue属性配置
```javascript
{
  radius: 20,
  unit: 'px',
  sideNumber: 3,
  rotation: 0,
  altitude: 0,
  height: 100,
  topColor: '#fff',
  sideTopColor: '#fff',
  sideBottomColor: '#fff'
}
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.PrismLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.PrismLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
