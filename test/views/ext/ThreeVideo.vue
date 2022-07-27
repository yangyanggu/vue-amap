<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="60"
      :show-building-block="false"
      :features="['bg','road']"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-three :lights="lights">
        <!--        <el-amap-three-gltf
          v-for="(p,index) in positions"
          :key="index"
          url="/gltf/sgyj_point_animation.gltf"
          :position="p"
          :scale="[10,10,10]"
          :rotation="rotation"
          :visible="visible"
          @init="init"
        />-->
        <el-amap-three-video video="/test.mp4" :position="center"></el-amap-three-video>
      </el-amap-layer-three>
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
import ElAmapLayerThree from "@vue-map/packages/ext/ThreeLayer/ThreeLayer.vue";
import ElAmapThreeVideo from "@vue-map/packages/ext/ThreeVideo/ThreeVideo.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapThreeVideo,
    ElAmapLayerThree,
    ElAmap},
  data(){
    return {
      center: [116.306206, 39.975468],
      zoom: 16,
      visible: true,
      position: [116.306206, 39.975468],
      angle: 90,
      rotation: {x:90, y:0, z:0},
      lights: [{
        type: 'AmbientLight',
        args: []
      }]
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
    initLayer(layer){
      console.log('init layer: ', layer);
    },
    init(object, $vue){
    },
    clickGltf(e){
      console.log(' click gltf: ', e);
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
