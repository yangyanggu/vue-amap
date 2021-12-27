<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
      @complete="completeMap"
      @moveend="moveendMap"
    >
      <el-amap-info-window
        v-model:visible="visible"
        :position="center"
      >
        <div>hello world</div>
      </el-amap-info-window>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      显隐
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data(){
    return {
      center: [120,31],
      zoom: 16,
      visible: true
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    completeMap(e){
      console.log(e);
    },
    moveendMap(e){
      console.log('moveendMap: ', e);
    },
    changeCenter(){
      const lng = this.center[0]+0.01;
      const lat = this.center[1]+0.01;
      this.center = [lng, lat];
    },
    changeVisible(){
      this.visible = !this.visible;
    }
  }
})
</script>

<style scoped>
</style>
