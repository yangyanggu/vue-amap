# 轨迹线图层 (Loca.PulseLineLayer)
轨迹线图层，支持设置轨迹样式和轨迹点。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" view-mode="3D" :pitch="0" :show-label="false" class="amap-demo">
        <el-amap-loca @init="initLoca">
          <el-amap-loca-pulse-line :visible="visible" :depth="true" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-pulse-line>
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
    // 颜色配置
    var headColors = ['#ECFFB1', '#146968', '#146968', '#146968', '#146968', '#146968', '#146968', '#146968'];
    var trailColors = [
        'rgba(255,178,6, 0.2)',
        'rgba(255,178,6, 0.2)',
        'rgba(20,105,104, 0.2)',
        'rgba(20,105,104, 0.2)',
        'rgba(20,105,104, 0.2)',
        'rgba(20,105,104, 0.2)',
        'rgba(20,105,104, 0.2)',
        'rgba(20,105,104, 0.2)',
    ];
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 5.29,
          center: [109.595668,35.447184],
          visible: true,
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-in.json',
          layerStyle: {
             altitude: 0,
            lineWidth: (_, feature) => feature.properties.lineWidthRatio * 4 + 1,
            headColor: (_, feature) => headColors[feature.properties.type],
            trailColor: (_, feature) => trailColors[feature.properties.type],
            interval: 0.5,
            duration: 2000,
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
lineWidth | Number, Function | 脉冲线的宽度。 default 1
headColor | String, Function | 脉冲头部颜色，每段脉冲的颜色由头部到尾部渐变. default 'rgba(0, 0, 0, 0.75)'
trailColor | String, Function  | 脉冲尾部颜色. default 'rgba(0, 0, 0, 0.25)'
altitude | Number | 线整体海拔高度. default 0
interval | Number | 每段脉冲占整条路径长度的比例，例如interval = 0.25, 则表示每条路径上同时有4段脉冲. default 1
duration | Number | 表示一条脉冲动画从头走到尾的时间（毫秒）。 default 2000

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.PulseLineLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.PulseLineLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
