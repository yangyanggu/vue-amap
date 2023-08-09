<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-custom-xyz
        url="http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        :subdomains="subdomains"
        :visible="visible"
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
import ElAmapLayerCustomXyz from "@vuemap/vue-amap/packages/layer/data/CustomXyz/CustomXyz.vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerCustomXyz,
    ElAmap},
  data(){
    return {
      center: [121.5273285, 31.21515044],
      zoom: 16,
      visible: true,
      subdomains: ["1", "2", "3", "4"]
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
