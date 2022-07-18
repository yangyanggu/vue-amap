<template>
  <div class="map-container">
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
        <div>{{ text }}</div>
      </el-amap-info-window>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeCenter">
        更换中心点
      </el-button>
      <el-button @click="changeVisible">
        显隐
      </el-button>
      <el-button @click="changeText">
        更新内容
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmapInfoWindow from "@vue-map/packages/infoWindow/InfoWindow/InfoWindow.vue";
import ElAmap from '../../src/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapInfoWindow,
    ElAmap},
  data(){
    return {
      center: [120,31],
      zoom: 16,
      visible: true,
      text: 'hello world'
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
    },
    changeText(){
      this.text = `MutationObserver ${ new Date().toLocaleString()}`
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
