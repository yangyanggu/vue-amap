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
      <el-amap-text
        :visible="meshVisible"
        :position="meshPosition"
        :offset="[0, -80]"
        text="测试模型事件"
      />
      <el-amap-layer-three
        :hdr="hdrOptions"
        :create-canvas="true"
        @init="initLayer"
        @click="clickLayer"
        @mouseover="mouseoverLayer"
        @mouseout="mouseoutLayer"
      >
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="0.6"
        />
        <el-amap-three-light-directional
          color="rgb(255,0,255)"
          :intensity="1"
          :position="{x:0, y:1, z:0}"
        />
        <el-amap-three-light-hemisphere
          color="blue"
          :intensity="1"
          :position="{x:1, y:0, z:0}"
        />
        <el-amap-three-light-spot :position="{x:0, y:1, z:0}" />
        <el-amap-three-gltf
          :url="baseUrl + '/gltf/sgyj_point_animation.gltf'"
          :position="position"
          :scale="[10,10,10]"
          :rotation="rotation"
          :visible="visible"
          @init="init"
        />
      </el-amap-layer-three>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";
import {BoxBufferGeometry, LinearFilter, Mesh, MeshPhongMaterial, TextureLoader} from "three";
import {ElAmap, ElAmapText} from "@vuemap/vue-amap";
import {
  ElAmapLayerThree,
  ElAmapThreeGltf,
  ElAmapThreeLightAmbient,
  ElAmapThreeLightDirectional,
  ElAmapThreeLightHemisphere,
  ElAmapThreeLightSpot
} from '@vuemap/vue-amap-extra';

const baseUrl = import.meta.env.VITE_ASSERT_BASE_URL;

const zoom = ref(18);
const center = ref([121.59996, 31.197646]);
const visible = ref(true);
const position = ref([121.59996, 31.197646]);
const rotation = ref({x: 90, y: 0, z: 0});
const hdrOptions = ref({
  urls: ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'],
  path: `${baseUrl}/hdr/`
});
const meshPosition = [121.59896, 31.197646];

const switchVisible = () => {
  visible.value = !visible.value;
}
const initLayer = (layer) => {
  const texture = new TextureLoader().load(
      'https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg'
  );
  texture.minFilter = LinearFilter;
  //  这里可以使用 three 的各种材质
  const mat = new MeshPhongMaterial({
    color: 0xfff0f0,
    depthTest: true,
    transparent: true,
    map: texture,
  });
  const geo = new BoxBufferGeometry(50, 50, 50);
  const mesh = new Mesh(geo, mat);
  mesh.userData.acceptEvent = true;
  const r = layer.convertLngLat(meshPosition)
  mesh.position.set(r [0], r [1], 0);
  layer.add(mesh);
}
const init = (object, $vue) => {
  $vue.$$startAnimations();
  console.log('gltf object: ', object);
  console.log('gltf $vue: ', $vue);
}
const clickLayer = (group) => {
  console.log('click layer: ', group);
}

const meshVisible = ref(false)
const mouseoverLayer = (group) => {
  meshVisible.value = true;
  console.log('mouseoverLayer layer: ', group);
}
const mouseoutLayer = (group) => {
  meshVisible.value = false;
  console.log('mouseoutLayer layer: ', group);
}


</script>

<style>
</style>
