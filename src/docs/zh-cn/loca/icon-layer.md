# 图标图层 (Loca.IconLayer)
图标图层

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" :show-label="false" class="amap-demo">
        <el-amap-loca>
          <el-amap-loca-icon :visible="visible" :source-data="sourceData" :layer-style="layerStyle"></el-amap-loca-icon>
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
    var events = require('./assets/js/events.js');
    var trafficIcons = {
        1: 'https://a.amap.com/Loca/static/loca-v2/demos/images/traffic-control.png',
        2: 'https://a.amap.com/Loca/static/loca-v2/demos/images/jam.png',
        3: 'https://a.amap.com/Loca/static/loca-v2/demos/images/construction.png',
        4: 'https://a.amap.com/Loca/static/loca-v2/demos/images/close.png',
        5: 'https://a.amap.com/Loca/static/loca-v2/demos/images/fog.png',
        0: 'https://a.amap.com/Loca/static/loca-v2/demos/images/accident.png',
    };
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 4.8,
          center: [105.601, 35.32],
          visible: true,
          sourceData: {},
          layerStyle: {
              unit: 'px',
              icon: (index, feature) => {
                  let data = feature.properties.rawData;
                  let url = trafficIcons[data.type % Object.keys(trafficIcons).length];
                  return url;
              },
              iconSize: [40,40],
              rotation: 0,
          }
        };
      },
      mounted(){
        this.createData();
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
        },
        createData(){
          let _events = events[0].events;
          var list = _events.map(e => {
              let ll = e.lngLat.split(',');
              let arr = [parseFloat(ll[0]), parseFloat(ll[1])]
              return {
                  "type": "Feature",
                  "properties": {
                      rawData: e
                  },
                  "geometry": {
                      "type": "Point",
                      "coordinates": arr
                  }
              }
          })
  
          this.sourceData = {
              "type": "FeatureCollection",
              "features": list,
          };
        }
      },
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|

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

### layerStyle参数
名称 | 类型 | 说明
---|---|---|
unit | String | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'
icon  | String, Function | 图标资源,接受三种值（Svg,Image,Url），可通过回调函数对每个点进行设置
iconSize | Array, Function | 图标大小，影响宽高。支持动画过渡效果，动画 key 字段名称为 radius。 default [20,20]
rotation  | Number, Function | 图标的旋转角度，可以通过回调为每个点设置不同的旋转角（单位:角度） default 0
opacity | Number, Function | 透明度,支持通过回调函数为每个点设置不同的透明度 default 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.IconLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.IconLayer | 实例