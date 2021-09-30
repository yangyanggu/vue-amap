# 圆点图层 (Loca.PointLayer)
圆点图层，拥有描边的原点，可以支持边缘模糊特效。<br/>
支持对每个圆点的半径、颜色、描边信息单独设置。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" :show-label="false" class="amap-demo">
        <el-amap-loca>
          <el-amap-loca-point :visible="visible" :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-point>
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
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
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
            borderWidth: 0,
            blurRadius: -1,
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
blend | String | 图层里面元素的叠加效果，normal：正常透明度叠加，lighter：叠加后可能更加明亮

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

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.PointLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.PointLayer | 实例
