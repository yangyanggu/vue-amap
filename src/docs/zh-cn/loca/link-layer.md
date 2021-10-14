# 链接线图层 (Loca.LinkLayer)
链接线图层

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center":pitch="pitch" view-mode="3D" :show-label="false" class="amap-demo">
        <el-amap-loca>
          <el-amap-loca-link :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-link>
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
    var colors = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'].reverse();
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 8,
          center: [116.335036, 39.900082],
          pitch: 55,
          visible: true,
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/bj_bus.json',
          layerStyle: {
              lineColors : colors,
              height : (index, prop) => {
                  var i = index % colors.length;
                  return i * 200 + 40;
              },
              smoothSteps : 100,
              // dashArray: [10, 5, 10, 0],
          }
        };
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
        },
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
lineColors | Array, Function | 链接线颜色。 类型为Array时，可设置颜色渐变，color[0]为起始色，color[color.lenth-1]为终止色，中间为过渡色； 类型为Function时，返回每根线的颜色。参数为(index,item)，item为一个对象{link,distance}，link为该条线的初始信息。返回结果为Array(渐变)。
height  | Number, Function | 高度，单位为米，代表弧顶的最高高度。 类型为Function时，返回每根线的高度。参数为(index,item)，item中有distance属性，代表两点间的距离（米），可以用该属性处理高度。
smoothSteps | Number, Function | 平滑步数，代表弧线的分隔段数，越大平滑度越好，默认为100。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.LinkLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.LinkLayer | 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined
