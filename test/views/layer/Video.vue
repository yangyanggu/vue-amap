<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-video
        :url="url"
        :bounds="bounds"
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
import ElAmapLayerVideo from "@vue-map/packages/layer/data/Video/Video.vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerVideo,
    ElAmap},
  data(){
    return {
      center: [116.33719, 39.942384],
      bounds: [116.327911, 39.939229,116.342659, 39.946275],
      zoom: 16,
      url: '/video.mp4',
      visible: true,
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
