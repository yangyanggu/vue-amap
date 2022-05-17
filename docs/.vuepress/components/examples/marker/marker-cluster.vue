<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-marker-cluster
        v-if="visible"
        :points="points"
        @init="markerInit"
        @click="clickMarker"
      />
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
import China from '../../../assets/china.json';

export default defineComponent({
  name: "Map",
  data(){
    return {
      center: [104.937478,35.439575],
      zoom: 5,
      points: Object.freeze(China),
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
    changeVisible(){
      this.visible = !this.visible;
    },
    markerInit(e){
      console.log('marker init: ', e);
    },
    clickMarker(e){
      console.log('marker click: ', e);
    }
  }
})
</script>

<style scoped>
</style>
