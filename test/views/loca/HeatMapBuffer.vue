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
        <el-amap-loca-heatmap
          :visible="visible"
          geo-buffer-source="/test.pbf"
          :layer-style="layerStyle"
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
import ElAmapLocaHeatmap from "@vuemap/vue-amap-loca/packages/HeatMapLayer/HeatMapLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLocaHeatmap,
    ElAmapLoca,
    ElAmap
  },
  data() {
    return {
      center: [117.100524,36.657919],
      zoom: 11,
      pitch: 55,
      visible: true,
      layerStyle: {
        unit: 'meter',
        radius: 200,
        value (index, feature) {
          return feature.properties.total_price;
        },
        gradient: {
          '1': '#FF4C2F',
          '0.2': '#29CF6F',
          '0.4': '#5CE182',
          '0.5': '#7DF675',
          '0.6': '#FFF100',
          '0.8': '#FAA53F',
        },
        height: 0,
        heightBezier: [0, 0.53, 0.37, 0.98],
        min: 0,
        max: 8000,
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
