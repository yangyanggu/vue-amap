<template>
  <div class="map-container">
    <el-amap
      view-mode="3D"
      :pitch="pitch"
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-loca>
        <el-amap-loca-ambient-light color="#fff" />
        <el-amap-loca-directional-light
          :position="[0,-1,0]"
          :target="[0,0,0]"
          color="rgb(255,255,255)"
          :intensity="0.5"
        />
        <el-amap-loca-point-light
          :position="[center[0], center[1], 1000]"
          :distance="0"
          :intensity="5"
          color="#fff"
        />
        <el-amap-loca-polygon
          v-if="create"
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
        />
      </el-amap-loca>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeCreate">
        {{ create ? '销毁图层' : '创建图层' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue'
import ElAmapLoca from "@vuemap/vue-amap-loca/packages/Loca/Loca.vue";
import ElAmapLocaPolygon from "@vuemap/vue-amap-loca/packages/PolygonLayer/PolygonLayer.vue";
import ElAmapLocaAmbientLight from "@vuemap/vue-amap-loca/packages/AmbientLight/AmbientLight.vue";
import ElAmapLocaDirectionalLight from "@vuemap/vue-amap-loca/packages/DirectionalLight/DirectionalLight.vue";
import ElAmapLocaPointLight from "@vuemap/vue-amap-loca/packages/PointLight/PointLight.vue";

const colors = ['#FFF8B4', '#D3F299', '#9FE084', '#5ACA70', '#00AF53', '#00873A', '#006B31', '#004835', '#003829'].reverse();
const height = [1000, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000];

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLocaPointLight,
    ElAmapLocaDirectionalLight,
    ElAmapLocaAmbientLight,
    ElAmapLocaPolygon,
    ElAmapLoca,
    ElAmap
  },
  data() {
    return {
      center: [120.109233,30.246411],
      zoom: 11,
      pitch: 55,
      create: true,
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
    clickMap(e) {
      console.log('click map: ', e);
    },
    initMap(map) {
      console.log('init map: ', map);
    },
    changeVisible() {
      this.visible = !this.visible;
    },
    changeCreate() {
      this.create = !this.create;
    },
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.control-container {
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 2;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>
