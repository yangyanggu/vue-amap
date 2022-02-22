<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="pitch"
      @init="initMap"
    >
      <el-amap-layer-tiles3d
        :url="url"
        :layer-style="layerStyle"
      />
    </el-amap>
  </div>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      center: [121.502325,31.238165],
      zoom: 15,
      pitch: 90,
      url: 'https://a.amap.com/jsapi_demos/static/data3d/single.json',
      layerStyle: {
        light: {
          color: 'rgb(44,59,75)', // 设置光照颜色
          intensity: 2, // 设置光照强度
        }
      },
    };
  },

  methods: {
    initMap(map){
      console.log('init map: ', map);
    },
  }
});
</script>
