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
      <el-amap-layer-three :hdr="hdrOptions">
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="1"
        />
        <el-amap-three-tiles3d
          v-if="create"
          :visible="visible"
          :debug="true"
          :position="center"
          url="https://raw.githubusercontent.com/yangyanggu/layer-3dtiles/master/test/hutong/tileset.json"
        />
      </el-amap-layer-three>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeCreate">
        {{ create ? '销毁' : '创建' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmapLayerThree from "@vuemap/vue-amap-extra/packages/ThreeLayer/ThreeLayer.vue";
import ElAmapThreeTiles3d from "@vuemap/vue-amap-extra/packages/Three3Dtiles/ThreeTiles3d.vue";
import ElAmapThreeLightAmbient from "@vuemap/vue-amap-extra/packages/ThreeLightAmbient/ThreeLightAmbient.vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapThreeTiles3d,
    ElAmapLayerThree,
    ElAmapThreeLightAmbient,
    ElAmap},
  data(){
    return {
      center: [116.404987, 39.90946],
      zoom: 16,
      visible: true,
      create: true,
      hdrOptions: {
        urls: [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
        path: './hdr/'
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
    changeVisible(){
      this.visible = !this.visible;
    },
    changeCreate(){
      this.create = !this.create;
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
