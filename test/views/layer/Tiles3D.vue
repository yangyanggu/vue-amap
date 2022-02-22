<template>
  <div class="map-container">
    <el-amap
      :resize-enable="true"
      :show-label="false"
      :center="center"
      :zoom="zoom"
      :pitch="pitch"
      :rotation="rotation"
      view-mode="3D"
      :map-style="mapStyle"
      :show-building-block="false"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-tiles3d
        :url="url"
        :layer-style="layerStyle"
      />
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
import ElAmapLayerTiles3d from "@vue-map/packages/layer/data/Tiles3D/Tiles3D.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerTiles3d,
    ElAmap},
  data(){
    return {
      center: [121.502325,31.238165],
      zoom: 16,
      pitch: 90,
      rotation: -50,
      visible: true,
      url: 'https://a.amap.com/jsapi_demos/static/data3d/single.json',
      mapStyle: 'amap://styles/darkblue',
      layerStyle: {
        light: {
          color: 'rgb(44,59,75)', // 设置光照颜色
          intensity: 2, // 设置光照强度
        }
      },
      features: ['bg'],
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
