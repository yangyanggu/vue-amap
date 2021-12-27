<template>
  <div class="map-page-container">
    <el-amap :center="center" :zoom="zoom">
      <el-amap-layer-mapbox-vector-tile :visible="visible" :url="url"></el-amap-layer-mapbox-vector-tile>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">{{visible? '隐藏' : '显示'}}</button>
  </div>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      zoom: 12,
      center: [121.59996, 31.197646],
      visible: true,
      url: 'https://restapi.amap.com/rest/lbs/geohub/tiles/mvt?key=747f980f217a31ba68d99301045a3fa7&z=[z]&x=[x]&y=[y]&size=512&id=1ed4ee90-dd77-11eb-9642-a7be29d36ac6',
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
  }
});
</script>
