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
          :source-url="sourceUrl"
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
      center: [114.341232, 30.567523],
      zoom: 11,
      pitch: 55,
      visible: true,
      sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_house_order.json',
      layerStyle: {
        radius: 20,
        unit: 'px',
        height: 90,
        // radius: 10,
        // unit: 'px',
        // height: 10,
        gradient: {
          0.1: 'rgba(50,48,118,1)',
          0.2: 'rgba(127,60,255,1)',
          0.4: 'rgba(166,53,219,1)',
          0.6: 'rgba(254,64,95,1)',
          0.8: 'rgba(255,98,4,1)',
          1: 'rgba(236,220,79,1)',
        },
        value (index, feature) {
          return feature.properties.count;
        },
        min: 0,
        max: 10,  //4.6
        heightBezier: [0, .53, .37, .98],
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
