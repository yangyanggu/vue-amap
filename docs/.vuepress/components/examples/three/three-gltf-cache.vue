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
    >
      <el-amap-layer-three
        :create-canvas="true"
      >
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="0.6"
        />
        <el-amap-three-gltf
          v-for="item in positions"
          :key="item.id"
          url="/gltf/sgyj_point_animation.gltf"
          :position="item.lnglat"
          :use-model-cache="true"
          :scale="[10,10,10]"
          :rotation="rotation"
        />
      </el-amap-layer-three>
    </el-amap>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      zoom: 18,
      center: [121.59996, 31.197646],
      visible: true,
      positions: [],
      rotation: {x:90, y:0, z:0},
      carAngle: 90,
      carInterval: -1
    };
  },
  beforeMount() {
    const array = [];
    const position = [121.59996, 31.197646];
    for(let i=0;i<1000;i++){
      const lnglat = [position[0]+Math.random()*0.01, position[1]+Math.random()*0.01];
      array.push({
        lnglat,
        id: lnglat.join(',')
      })
    }
    this.positions = array;
  },
  methods: {
  }
});
</script>

<style>
</style>
