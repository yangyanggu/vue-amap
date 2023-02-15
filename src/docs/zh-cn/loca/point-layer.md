# 圆点图层 (Loca.PointLayer)
圆点图层，拥有描边的原点，可以支持边缘模糊特效。<br/>
支持对每个圆点的半径、颜色、描边信息单独设置。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" :show-label="false" class="amap-demo" @init="initMap">
        <el-amap-loca>
          <el-amap-loca-point v-if="sourceUrl" :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle" :default-style-value="defaultStyle" :visible-duration="300"></el-amap-loca-point>
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
    var colors = [
        'rgba(254,255,198,0.95)',
        'rgba(255,238,149,0.95)',
        'rgba(255,217,99,0.95)',
        'rgba(255,175,43,0.95)',
        'rgba(255,135,24,0.95)',
        'rgba(234,10,0,0.95)',
        'rgba(195,0,0,0.95)',
        'rgba(139,0,0,0.95)',
    ];
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 4.8,
          center: [105.601, 35.32],
          visible: true,
          sourceUrl: '',
          layerStyle: {
            unit: 'meter',
            radius: (index, f) => {
                var n = f.properties['人口'];
                return n * 100;
            },
            color: (index, f) => {
                var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
                return colors[n];
            },
          },
          defaultStyle: {
            borderWidth: 5000,
            blurRadius: 3,
          }
        };
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
        },
        initMap(){
          setTimeout(() => {
            this.sourceUrl = 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json';
          }, 1000)
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
blend | String | 图层里面元素的叠加效果，normal：正常透明度叠加，lighter：叠加后可能更加明亮
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
color | String, Function | 填充色，支持回调设置不同的颜色（Hex颜色） default  '#fff'
unit | String | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'
borderWidth | Number, Function | 边框宽度（默认单位:px） default 10
borderColor | String, Function | 边框填充色，支持回调设置不同的颜色 default  '#fff'
blurWidth | Number, Function | 模糊半径，从哪个位置开始向边缘模糊。负数代表不进行模糊。 default -1

### defaultStyleValue参数(提供默认参数，但会被geojson的properties属性中的值覆盖)
名称 | 类型 | 说明
---|---|---|
radius | Number | 半径（默认单位: px）。支持动画过渡效果。 default 20
color | String | 填充色，支持回调设置不同的颜色（Hex颜色） default  '#fff'
unit | String | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'
borderWidth | Number | 边框宽度（默认单位:px） default 10
borderColor | String | 边框填充色，支持回调设置不同的颜色 default  '#fff'
blurWidth | Number | 模糊半径，从哪个位置开始向边缘模糊。负数代表不进行模糊。 default -1

### style说明
所有loca的Layer组件对Style设置提供了默认处理，支持function回调方式的属性都提供了默认回调实现，优先读取gesjson的properties中的值，读取不到的情况下会读取defaultStyleValue配置的值，最后会使用组件内默认设置的值。<br/>
该默认处理可以被layerStyle中的设置给覆盖。目前默认设置已基本符合日常使用，如果需要在选中目标时做高亮处理，则推荐根据示例使用事件监听然后动态修改layerStyle来实现。<br/>
style数据有可以有三个来源，优先级按顺序处理，第一个最高<br/>
##### 1、layerStyle属性配置
```javascript
{
  unit: 'meter',
  radius: (index, f) => {
    var n = f.properties['人口'];
    return n * 100;
  },
  color: (index, f) => {
    var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
    return colors[n];
  },
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
        "icon": '/img/1.png',
        "color": 'red'
      }, 
      "geometry": {
        "type": "Point",
        "coordinates": [ 119.958676782427744, 32.121127961388339]
      }
    }
  ]
}
```
##### 3、defaultStyleValue属性配置
```javascript
{
  radius: 20,
  color: '#fff',
  unit: 'px',
  borderWidth: 10,
  borderColor: '#fff',
  blurWidth: -1
}
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.PointLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.PointLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
