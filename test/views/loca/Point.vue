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
        <el-amap-loca-point
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
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapLoca from "@vue-map/packages/loca/Loca/Loca.vue";
import ElAmapLocaPoint from "@vue-map/packages/loca/PointLayer/PointLayer.vue";

const colors = [
  'rgba(254,255,198,0.95)',
  'rgba(255,238,149,0.95)',
  'rgba(255,217,99,0.95)',
  'rgba(255,175,43,0.95)',
  'rgba(255,135,24,0.95)',
  'rgba(234,10,0,0.95)',
  'rgba(195,0,0,0.95)',
  'rgba(139,0,0,0.95)',
];

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLocaPoint,
    ElAmapLoca,
    ElAmap
  },
  data() {
    return {
      center: [105.601, 35.32],
      zoom: 4.8,
      pitch: 55,
      visible: true,
      sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
      layerStyle: {
        unit: 'meter',
        radius: (index, f) => {
          const n = f.properties['人口'];
          return n * 100;
        },
        color: (index, f) => {
          const n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
          return colors[n];
        },
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
