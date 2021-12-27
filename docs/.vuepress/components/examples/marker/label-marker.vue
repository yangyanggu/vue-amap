<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-labels>
        <el-amap-label-marker
          :visible="labelOptions.visible"
          :position="labelOptions.position"
          :text="labelOptions.text"
          :icon="labelOptions.icon"
          @click="clickMarker"
        />
      </el-amap-layer-labels>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ labelOptions.visible? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data(){
    return {
      center: [121.5495395, 31.21515044],
      zoom: 16,
      labelOptions: {
        visible: true,
        position: [121.5495395, 31.21515044],
        text: {
          content: '测试content',
          direction: 'right',
          style: {
            fontSize: 15,
            fillColor: '#fff',
            strokeColor: 'rgba(255,0,0,0.5)',
            strokeWidth: 2,
            padding: [3, 10],
            backgroundColor: 'yellow',
            borderColor: '#ccc',
            borderWidth: 3,
          }
        },
        icon: {
          image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
          anchor: 'bottom-center',
          size: [25, 34],
          clipOrigin: [459, 92],
          clipSize: [50, 68]
        }
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
    changeCenter(){
      const lng = this.center[0]+0.01;
      const lat = this.center[1]+0.01;
      this.center = [lng, lat];
    },
    changeVisible(){
      this.labelOptions.visible = !this.labelOptions.visible;
    },
    markerInit(e){
      console.log('marker init: ', e);
    },
    clickMarker(e){
      alert('click marker');
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
