<template>
  <div class="map-container">
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
    <div class="control-container">
      <el-button @click="changeVisible">
        显隐
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapMarkerCluster from "@vue-map/packages/marker/MarkerCluster/MarkerCluster.vue";
import China from '../../assets/china.json';

export default defineComponent({
  name: "Map",
  components: {
    ElAmapMarkerCluster,
    ElAmap},
  data(){
    return {
      center: [104.937478,35.439575],
      zoom: 5,
      points: China,
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
.map-container{
  width: 100%;
  height: 100%;
  position: relative;
}
.control-container{
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 2;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>
