# 连接飞线图层 (Loca.PulseLinkLayer)
连接飞线图层，可以支持弧度，宽度，过渡色等能力。 并且还支持脉冲动画，可以表达数据的朝向。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" view-mode="3D" :pitch="0" :show-label="false" class="amap-demo">
        <el-amap-loca @init="initLoca">
          <el-amap-loca-pulse-link :visible="visible" :depth="true" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-pulse-link>
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
          zoom: 4.7,
          center: [104.780269, 34.955403],
          visible: true,
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-out.json',
          layerStyle: {
             unit: 'meter',
            dash: [40000, 0, 40000, 0],
            lineWidth: function () {
                return [20000, 1000];
            },
            height: function (index, feat) {
                return feat.distance / 3 + 10;
            },
            // altitude: 1000,
            smoothSteps: 30,
            speed: function (index, prop) {
                return 1000 + Math.random() * 200000;
            },
            flowLength: 100000,
            lineColors: function (index, feat) {
                return ['rgb(255,228,105)', 'rgb(255,164,105)', 'rgba(1, 34, 249,1)'];
            },
            maxHeightScale: 0.3, // 弧顶位置比例
            headColor: 'rgba(255, 255, 0, 1)',
            trailColor: 'rgba(255, 255,0,0)',
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
depth | Boolean | 图层中的要素是否具有前后遮盖关系，默认开启
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
lineColors | Array, Function | 链接线颜色数组。 类型为String时代表单根线的颜色，支持16进制，rgb，rgba和"red"，"blue"等color keywords； 类型为Array时，可设置颜色渐变，color[0]为起始色，color[color.lenth-1]为终止色，中间为过渡色； 类型为Function时，返回每根线的颜色。参数为(index,item)，item为一个对象{link,distance}，link为该条线的初始信息。返回结果必须是颜色数组 Array(渐变)。
height | Number, Function | 高度，单位为米，代表弧顶的高度。
maxHeightScale | Number | 弧顶位置，代表距离起点的哪个位置是弧顶最高点，可以用来模拟抛物线。 类型为Function时，返回每根线的高度。参数为(index,item)，item中有distance属性，代表两点间的距离（米），可以用该属性处理高度。
smoothSteps | Number, Function | 平滑步数，代表弧线的分隔段数，越大平滑度越好，但更消耗性能，默认为50。
lineWidth | [Number,Number], Function | 连接线的头尾宽度设置：[起点宽度，终点宽度];单位跟随 unit 字段变化。
unit | String | px 和 meter，代表此图层的样式单位，像素或者米。
dash | [Number, Number, Number, Number], Function | 连接线的虚线配置信息：[实线长度, 虚线长度, 实线长度, 虚线长度];
speed | Number, Function | 速度，每个脉冲点行进的速度（可以针对每个线路进行单独设置速度）。单位：米/秒 或者 像素/秒。
headColor | String, Function | 脉冲点的头部颜色。
trailColor | String, Function | 脉冲点的头部颜色。
flowLength | Number | 脉冲点的长度。单位跟随 unit 字段变化。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.PulseLinkLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.PulseLinkLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
