<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="60"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-three>
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="0.6"
        />
        <el-amap-three-polygon
          v-if="source"
          :visible="visible"
          :source="source"
          side-texture="./images/qiang.jpeg"
          top-color="rgba(255,0,0,0)"
          bottom-color="rgba(255,0,0,0.2)"
          side-color="rgba(255,255,0,0.6)"
          :depth-test="true"
          :height="1500"
        />
      </el-amap-layer-three>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      center: [120.109233,30.246411],
      zoom: 14,
      visible: true,
      source: null
    };
  },

  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
      fetch('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_gn.json')
          .then(res => res.json())
          .then(res => {
            this.source = res;
          })
    },
    changeVisible(){
      this.visible = !this.visible;
    },
  }
});
</script>
