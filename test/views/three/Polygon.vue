<template>
  <div class="map-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :show-building-block="false"
      :pitch="60"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-three :axes-helper="true">
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="1"
        />
        <!--        <el-amap-three-polygon
          v-if="source"
          :visible="visible"
          :source="source"
          side-texture="./img/qiang.jpeg"
          top-color="rgba(255,0,0,0)"
          bottom-color="rgba(255,0,0,0.4)"
          :depth-test="true"
          :height="1500"
        />-->
        <el-amap-three-polygon
          v-if="source"
          :visible="visible"
          :source="source"
          top-color="rgba(255,255,255,1)"
          bottom-color="rgba(255,255,255,1)"
          side-top-color="rgba(255,0,0,0.2)"
          side-bottom-color="rgba(0,255,0,0.8)"
          :depth-test="true"
          :height="1500"
        />
        <!--        <el-amap-three-pass-circle :position="center" />-->
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
import ElAmapLayerThree from "@vue-map/packages/three/ThreeLayer/ThreeLayer.vue";
import ElAmapThreePolygon from "@vue-map/packages/three/ThreePolygon/ThreePolygon.vue";
import ElAmapThreeLightAmbient from "@vue-map/packages/three/ThreeLightAmbient/ThreeLightAmbient.vue";
import ElAmapThreePassCircle from "@vue-map/packages/three/ThreePassCircle/ThreePassCircle.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapThreePolygon,
    ElAmapLayerThree,
    ElAmapThreeLightAmbient,
    ElAmapThreePassCircle,
    ElAmap},
  data(){
    return {
      center: [116.45916, 39.917359],
      zoom: 16,
      visible: true,
      source: null
    }
  },
  mounted() {
    fetch('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/guomao.geojson')
        .then(res => res.json())
        .then(res => {
          res.features.forEach( v => {
            v.properties.height = v.properties.h
          })
          this.source = res;
        })
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
