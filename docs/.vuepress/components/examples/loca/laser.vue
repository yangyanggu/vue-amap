<template>
  <div class="map-page-container">
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
        <el-amap-loca-laser
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
        />
      </el-amap-loca>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data() {
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
    return {
      center: [105.601, 35.32],
      zoom: 4.8,
      pitch: 55,
      visible: true,
      sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
      layerStyle: {
        unit: 'px',
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
    initLoca(loca) {
      loca.animate.start();
    }
  }
})
</script>

<style scoped>
</style>
