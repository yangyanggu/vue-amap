# 面图层 (Loca.PolygonLayer)
面图层，支持多边形、复杂多边形、带洞多边形的绘制。支持底面海拔高度和面的厚度效果。 并且还支持对每个多边形设置不同的个性化样式，而且性能依然很好。 我们还对重复设置图层样式进行了性能优化，保证在某些频繁切换面样式的情况下依然流畅。 当你的希望你的面有透明度效果，并且面和面直接有高度的压盖关系时，我们对渲染效果进行了优化。 能让你看到清晰的透明面！ 注意：在侧面进行贴图的时候，如果你希望图片在侧面进行重复贴图，那么必须要求贴图纹理的宽高大小一定是 2 的 n 次方。 例如：256x512、1024x1024 等

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" :pitch="pitch" view-mode="3D" @init="initMap" :show-label="false" class="amap-demo">
        <el-amap-loca :amb-light="ambLight" :dir-light="dirLight" :point-light="pointLight">
          <el-amap-loca-polygon :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-polygon>
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
    var colors = ['#FFF8B4', '#D3F299', '#9FE084', '#5ACA70', '#00AF53', '#00873A', '#006B31', '#004835', '#003829'].reverse();
    var height = [1000, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000];
    var map = null;
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 11,
          pitch: 55,
          center: [120.109233,30.246411],
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
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_gn.json',
          layerStyle: {
              topColor: function (index, feature) {
                  var v = feature.properties.health * 100;
                  return v < 40 ? colors[8] :
                      v < 50 ? colors[7] :
                          v < 55 ? colors[6] :
                              v < 60 ? colors[5] :
                                  v < 65 ? colors[4] :
                                      v < 70 ? colors[3] :
                                          v < 75 ? colors[2] :
                                              v < 80 ? colors[1] :
                                                  v < 100 ? colors[0] : 'green';
              },
              sideTopColor: function (index, feature) {
                  // var v = feature.properties.value;
                  var v = feature.properties.health * 100;
                  return v < 40 ? colors[8] :
                      v < 50 ? colors[7] :
                          v < 55 ? colors[6] :
                              v < 60 ? colors[5] :
                                  v < 65 ? colors[4] :
                                      v < 70 ? colors[3] :
                                          v < 75 ? colors[2] :
                                              v < 80 ? colors[1] :
                                                  v < 100 ? colors[0] : 'green';
              },
              sideBottomColor: function (index, feature) {
                  // var v = feature.properties.value;
                  var v = feature.properties.health * 100;
                  return v < 40 ? colors[8] :
                      v < 50 ? colors[7] :
                          v < 55 ? colors[6] :
                              v < 60 ? colors[5] :
                                  v < 65 ? colors[4] :
                                      v < 70 ? colors[3] :
                                          v < 75 ? colors[2] :
                                              v < 80 ? colors[1] :
                                                  v < 100 ? colors[0] : 'green';
              },
              height: function (index, feature) {
                  var v = feature.properties.health * 100;
                  return v < 40 ? height[8] :
                      v < 50 ? height[7] :
                          v < 55 ? height[6] :
                              v < 60 ? height[5] :
                                  v < 65 ? height[4] :
                                      v < 70 ? height[3] :
                                          v < 75 ? height[2] :
                                              v < 80 ? height[1] :
                                                  v < 100 ? height[0] : 0;
              },
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
topColor | String, Function | 棱柱的顶面颜色值。default '#fff'
sideTopColor | String, Function | 棱柱的侧面顶部颜色值。default '#fff'
sideBottomColor | String, Function | 棱柱的侧面底部颜色值。default '#fff'
altitude  | Number, Function | 海拔高度，代表棱柱的离地高度。支持动画过渡效果。 default 0
height  | Number, Function | 棱柱的高度。单位是 unit 的值。支持动画过渡效果。default 100
texture  | Canvas, URL, Image, Base64 | 带有高度的时候，侧面的贴图纹理，目前仅支持侧面。如果需要纹理在侧面重复贴图，需要图片的宽高是 2 的 n 次方像素值。比如：256x256，64x1024
textureSize  | Array[Number,Number], Function | 一个纹理图片覆盖的大小，[宽度, 高度]，单位是米，默认是宽 20 米，高 3 米贴一张纹理，会重复贴图。default [20,3]

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.PolygonLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.PolygonLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
