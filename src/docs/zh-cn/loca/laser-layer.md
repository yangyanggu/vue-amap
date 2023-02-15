# 激光图层 (Loca.LaserLayer)
激光图层，支持展示点类型数据的激光放射效果。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center":pitch="pitch" view-mode="3D" :show-label="false" class="amap-demo">
        <el-amap-loca @init="initLoca">
          <el-amap-loca-laser :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-laser>
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
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 14.8,
          center: [116.487349, 39.994334],
          pitch: 55,
          visible: true,
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/laser_point.json',
          layerStyle: {
              unit: 'meter',
              height: (index, feat) => {
                  return feat.properties.h * 9;
              },
              color: (index, feat) => {
                  return ['#FF6F47', '#4FDDC7', '#4FDDC7'][index % 3];
              },
              lineWidth: 6,
              trailLength: 600,
              angle: 0,
              duration: 1500,
              interval: 1000,
              repeat: Infinity,
              delay: () => {
                  return Math.random() * 2000;
              },
          }
        };
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
        },
        initLoca(loca){
          loca.animate.start();
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
initEvents | Boolean | 是否创建事件，自动为loca图层创建click和mousemove事件。 默认 true
defaultStyleValue | Object | 默认样式，可以查看下面属性说明
depth | Boolean | 图层中的要素是否具有前后遮盖关系，默认开启
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
geoBufferSource | ArrayBuffer, String | protocol-buffers(PBF) 格式的数据源，能够大幅压缩数据体积，有效减少数据传输时间。目前仅支持基于 mapbox/geobuf 的 GeoJSON PBF 实现

### layerStyle参数(覆盖所有默认值)

名称 | 类型                                       | 说明
---|------------------------------------------|---|
unit  | String                                   | 图层的单位。可选值：px：像素，meter：地理单位米 默认 px
height  | Number, Function                         | 最大放射高度 default 200  default 'rgba(255,255,0,0.5)'
color   | String, Function                         | 激光颜色 
angle  | Number                           | 倾斜角度，取值0～360deg，默认垂直向上，180时表示垂直向下 default 0
lineWidth | Number                         | 激光线宽度  default 2
trailLength  | Number | 激光线长度  default 30
fadeOpacity | Number | 接近最高点时的颜色衰减 default 0.2
duration | Number, Function | 单次放射的时长（毫秒） default 2000
interval | Number, Function | 每次放射的间隔时间（毫秒） default 0
delay  | Number, Function | 首次放射的延迟时间（毫秒） default 0
repeat | Number | 放射次数，默认循环

### defaultStyleValue参数(提供默认参数，但会被geojson的properties属性中的值覆盖)

名称 | 类型 | 说明
---|---|---|
unit  | String                                   | 图层的单位。可选值：px：像素，meter：地理单位米 默认 px
height  | Number, Function                         | 最大放射高度 default 200  default 'rgba(255,255,0,0.5)'
color   | String, Function                         | 激光颜色
angle  | Number                           | 倾斜角度，取值0～360deg，默认垂直向上，180时表示垂直向下 default 0
lineWidth | Number                         | 激光线宽度  default 2
trailLength  | Number | 激光线长度  default 30
fadeOpacity | Number | 接近最高点时的颜色衰减 default 0.2
duration | Number, Function | 单次放射的时长（毫秒） default 2000
interval | Number, Function | 每次放射的间隔时间（毫秒） default 0
delay  | Number, Function | 首次放射的延迟时间（毫秒） default 0
repeat | Number | 放射次数，默认循环

### style说明
所有loca的Layer组件对Style设置提供了默认处理，支持function回调方式的属性都提供了默认回调实现，优先读取geojson的properties中的值，读取不到的情况下会读取defaultStyleValue配置的值，最后会使用组件内默认设置的值。<br/>
该默认处理可以被layerStyle中的设置给覆盖。目前默认设置已基本符合日常使用，如果需要在选中目标时做高亮处理，则推荐根据示例使用事件监听然后动态修改layerStyle来实现。<br/>
style数据有可以有三个来源，优先级按顺序处理，第一个最高<br/>
##### 1、layerStyle属性配置
```javascript
{
  unit: 'meter',
    height: (index, feat) => {
    return feat.properties.h * 9;
  },
    color: (index, feat) => {
    return ['#FF6F47', '#4FDDC7', '#4FDDC7'][index % 3];
  },
    lineWidth: 6,
    trailLength: 600,
    angle: 0,
    duration: 1500,
    interval: 1000,
    repeat: Infinity,
    delay: () => {
    return Math.random() * 2000;
  },
}
```

##### 2、geojson的properties属性
```json
{
  "type": "FeatureCollection",
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
        "height": 90
      },
      "geometry": {
        "type": "point",
        "coordinates": [ 120.019779202981709, 32.144026229373154 ]
      }
    }
  ]
}
```
##### 3、defaultStyleValue属性配置
```javascript
{
  unit: 'px',
  height: 200,
  color: 'rgba(255,255,0,0.5)',
  lineWidth: 2,
  angle: 0,
  trailLength: 30,
  fadeOpacity: 0.2,
  duration: 2000,
  interval: 0,
  delay: 0,
  repeat: Infinity
}
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.LaserLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.LaserLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
