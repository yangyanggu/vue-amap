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

<script lang="ts" setup>
import {ref, onBeforeMount} from "vue";
import {ElAmap} from "@vuemap/vue-amap";
import {
  ElAmapLayerThree,
  ElAmapThreeGltf,
  ElAmapThreeLightAmbient,
} from '@vuemap/vue-amap-extra';

const zoom = ref(18);
const center = ref([121.59996, 31.197646]);
const rotation = ref({x: 90, y: 0, z: 0});
const positions = ref([]);

onBeforeMount(() => {
  const array = [];
  const position = [121.59996, 31.197646];
  for (let i = 0; i < 1000; i++) {
    const lnglat = [position[0] + Math.random() * 0.01, position[1] + Math.random() * 0.01];
    array.push({
      lnglat,
      id: lnglat.join(',')
    })
  }
  positions.value = array;
});
</script>

<style>
</style>
