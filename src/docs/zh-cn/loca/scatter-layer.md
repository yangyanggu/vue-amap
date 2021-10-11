# 贴地点图层 (Loca.ScatterLayer)
大地面上的点，可展示三种类型：颜色圆、图标、动画图标。动画开启需要使用 **loca.animate.start();**

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" :show-label="false" class="amap-demo">
        <el-amap-loca @init="initLoca">
          <el-amap-loca-scatter :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-scatter>
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
          zoom: 11,
          center: [113.97199630737305, 22.5807295363949],
          visible: true,
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_F.json',
          layerStyle: {
             unit: 'meter',
              size: [2600, 2600],
              borderWidth: 0,
              texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
              duration: 500,
              animate: true,
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
size | [Number, Number], Function | 图标长宽，单位取决于 unit 字段。default [20,20]
rotation | Number, Function | 图标的旋转角度，以正北方向为起点，沿顺时针方向旋转。default 0
color | String , Function | 没有纹理的情况下，圆片的填充颜色。default 'rgba(200,200,200,1)'
altitude | Number , Function | 图标的海拔高度。单位：米。default 0
borderWidth | Number, Function | 描边宽度，单位和 size 保持一致。default 0
borderColor | String, Function | 没有纹理的情况下，圆片的描边颜色。default 'rgba(250,250,250,1)'
texture  | Canvas , String , Base64 | 图标纹理资源，如果需要有动态效果，请使用帧序列图片资源：url，并且为了效果更好，我们建议使用宽高: 4096x128 像素的图片。⚠: 帧序列图片是头尾相连可以循环的图片。default null
unit | String | size 和 borderWidth 的单位，可以是 'px' 和 'meter'，meter 是实际地理的米，px 是屏幕像素。  default 'px'
animate | Boolean | 是否有动画，动画开启需要使用序列帧的纹理，否则没有动画效果。default false
duration | Number | 一轮动画的时长，单位毫秒(ms)。需要开启 animate 才能使用。default 0

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.ScatterLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.ScatterLayer | 实例
click | Feature | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
