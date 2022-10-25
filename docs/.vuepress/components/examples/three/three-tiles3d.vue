<template>
  <div class="map-page-container">
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
      <el-amap-layer-three>
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
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
    <button @click="changeCreate">
      {{ create ? '销毁' : '创建' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ThreeTiles3D",
  data(){
    return {
      center: [116.404987, 39.90946],
      zoom: 16,
      visible: true,
      create: true,
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
