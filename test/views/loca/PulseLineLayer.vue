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
      <el-amap-loca @init="initLoca">
        <el-amap-loca-pulse-line
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
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue'
import ElAmapLoca from "@vuemap/vue-amap-loca/packages/Loca/Loca.vue";
import ElAmapLocaPulseLine from "@vuemap/vue-amap-loca/packages/PulseLineLayer/PulseLineLayer.vue";

const headColors = ['#ECFFB1', '#146968', '#146968', '#146968', '#146968', '#146968', '#146968', '#146968'];
const trailColors = [
  'rgba(255,178,6, 0.2)',
  'rgba(255,178,6, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
];

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLocaPulseLine,
    ElAmapLoca,
    ElAmap
  },
  data() {
    return {
      center: [109.595668,35.447184],
      zoom: 5,
      pitch: 55,
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
    }
  },
  methods: {
    clickMap(e) {
      console.log('click map: ', e);
    },
    initMap(e) {
      console.log('init map: ', e);
    },
    changeVisible() {
      this.visible = !this.visible;
    },
    initLoca(loca){
      loca.animate.start();
    }
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
