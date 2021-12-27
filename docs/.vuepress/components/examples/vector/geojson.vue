<template>
  <div class="map-page-container">
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
  </div>
  <div class="toolbar">
    <button @click="toggleVisible">
      {{ visible ? '隐藏标记' : '显示标记' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import geo from '../../../assets/chongqing.json'

export default defineComponent({
  name: "Map",
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
</style>
