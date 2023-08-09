<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="initMap"
    >
      <el-amap-layer-custom-xyz
        url="http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        :subdomains="subdomains"
        :visible="visible"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      center: [116.306206, 39.975468],
      zoom: 16,
      visible: true,
      subdomains: ["1", "2", "3", "4"]
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
    initMap(map){
      console.log('map: ', map);
    },
  }
});
</script>

<style>
</style>
