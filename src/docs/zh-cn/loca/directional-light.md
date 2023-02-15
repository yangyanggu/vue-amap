# 平行光 (Loca.DirectionalLight)
平行光，对于可以接受光照的图层（PolygonLayer 等）会增加平行光的影响。平行光一般用来模拟太阳的光照。 它的方向由 position 射向 target。position和target的坐标是一个位置加 z 值（单位米）高度决定。比如: [1, 1, 1000] 代表x:1, y:1, 高度1000米。 如果模拟一个从正南方向的平行光，可以设置target: [0,0,0], position: [0,-1,0]

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap
      class="amap-demo"
      view-mode="3D"
      :pitch="pitch"
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @init="initMap"
    >
      <el-amap-loca>
        <el-amap-loca-directional-light
          :position="[0,-1,0]"
          :target="[0,0,0]"
          color="rgb(255,255,255)"
          :intensity="0.5"
        ></el-amap-loca-directional-light>
        <el-amap-loca-polygon
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
        ></el-amap-loca-polygon>
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
        const colors = ['#FFF8B4', '#D3F299', '#9FE084', '#5ACA70', '#00AF53', '#00873A', '#006B31', '#004835', '#003829'].reverse();
        const height = [1000, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000];
        return {
          center: [120.109233,30.246411],
          zoom: 11,
          pitch: 55,
          visible: true,
          sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_gn.json',
          layerStyle: {
            topColor (index, feature) {
              const v = feature.properties.health * 100;
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
            sideTopColor (index, feature) {
              // var v = feature.properties.value;
              const v = feature.properties.health * 100;
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
            sideBottomColor (index, feature) {
              // var v = feature.properties.value;
              const v = feature.properties.health * 100;
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
            height (index, feature) {
              const v = feature.properties.health * 100;
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
        }
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
        },
        initMap(e){
          console.log('init map: ', e);
        }
      }
    };
  </script>

</script>

## 静态属性

名称 | 类型 | 说明
---|---------------|---|
color | String        | 平行光颜色
intensity | Number        | 平行光强度
position | `Array<Number>` | 坐标位置
target | `Array<Number>` | 光射向的目标位置
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca.DirectionalLight | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.DirectionalLight | 实例
