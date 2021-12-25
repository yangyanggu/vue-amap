<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-geojson
        :geo="geoJSON"
        :polygon-options="polygonOptions"
        :visible="visible"
        :draggable="draggable"
        @click="click"
      />
    </el-amap>
    <div class="control-container">
      <el-button @click="toggleVisible">
        {{ visible ? '隐藏标记' : '显示标记' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapGeojson from "@vue-map/packages/vector/GeoJSON/GeoJSON.vue";
import geo from '../../assets/chongqing.json'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapGeojson,
    ElAmap},
  data(){
    return {
      zoom: 7,
      center: [107.943579, 30.131735],
      draggable: false,
      visible: true,
      geoJSON: geo,
      polygonOptions: {
        strokeColor: 'red',
        fillColor: 'blue'
      }
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    toggleVisible(){
      this.visible = !this.visible;
    },
    click(e) {
      alert('click GeoJSON');
    },
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
