# 简易行政区划图 (AMap.DistrictLayer)
简易行政区划图。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-district :visible="visible" type="Country" adcode="100000" :dept="2" :styles="styles"></el-amap-layer-district>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏图层' : '显示图层'}}</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    // 颜色辅助方法
    var colors = {};
    var getColorByAdcode = function (adcode) {
        if (!colors[adcode]) {
            var gb = Math.random() * 155 + 50;
            colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
        }

        return colors[adcode];
    };
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 8,
          center: [121.5273285, 31.21515044],
          visible: true,
          styles: {
              'fill': function (properties) {
                  // properties为可用于做样式映射的字段，包含
                  // NAME_CHN:中文名称
                  // adcode_pro
                  // adcode_cit
                  // adcode
                  var adcode = properties.adcode;
                  return getColorByAdcode(adcode);
              },
              'province-stroke': 'cornflowerblue',
              'city-stroke': 'white', // 中国地级市边界
              'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
          }
        };
      },
      methods: {
        toggleVisible(){
          this.visible = !this.visible;
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
tileSize | Number | 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.TileLayer.Traffic | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
complete |  | 图块切片加载完成事件
