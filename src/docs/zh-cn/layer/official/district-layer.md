# 简易行政区划图 (AMap.DistrictLayer)
简易行政区划图。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-district :visible="visible" type="Province" adcode="320000" :depth="2" :styles="styles"></el-amap-layer-district>
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
          zoom: 6,
          center: [118.763563,32.061377],
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
type | String | 类型，可选值：World 世界, Country 国家, Province 省市
depth | Number | 设定数据的层级深度，depth为0的时候只显示国家面，depth为1的时候显示省级， 当国家为中国时设置depth为2的可以显示市一级
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
adcode | String | 行政区的编码，可从链接下载[adcode与省市行政区对照表](https://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip)
SOC | String | 设定显示的国家 [SOC 国家代码、名称、Bounds对照表下载](https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json)
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1
styles | Object | 为简易行政区图设定各面的填充颜色和描边颜色。 styles各字段的值可以是颜色值，也可以是一个返回颜色值* 的回调函数function。支持的颜色格式有：<br/>1. #RRGGBB，如：'#FFFFFF' <br/>2. rgba()，如：'rgba(255,255,255,1)'<br/> 3. rgb()，如：'rgb(255,255,255)'<br/>4. [r,g,b,a] ，如： [1,1,1,1]<br/>5. ''，代表不赋予颜色

## styles属性
名称 | 类型 | 说明
---|---|---|
stroke-width | Number, Function | 描边线宽
zIndex | Number, Function | 图层中每个区域层级，数值越大，层级越高。 默认 0
coastline-stroke | ``Array<String>``, String, Function | 海岸线颜色，默认 [0.18,0.63,0.94,1]
nation-stroke | ``Array<String>``, String, Function | 国境线颜色，默认 [0.35,0.35,0.35,1]
province-stroke | ``Array<String>``, String, Function | 省界颜色，默认 [0.5,0.5,0.5,1]
city-stroke | ``Array<String>``, String, Function | 城市界，默认 [0.7,0.7,0.7,1]
county-stroke | ``Array<String>``, String, Function | 区/县界颜色，默认 [0.85,0.85,0.85,1]
fill | ``Array<String>``, String, Function | 填充色，默认 [1,1,1,1]

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.DistrictLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.DistrictLayer | 实例初始化结束
