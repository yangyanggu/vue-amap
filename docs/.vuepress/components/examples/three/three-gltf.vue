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
        :hdr="hdrOptions"
        :create-canvas="true"
        @init="initLayer"
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
        <el-amap-three-gltf
          :url="baseUrl + '/gltf/car2.gltf'"
          :position="carPosition"
          :scale="[10,10,10]"
          :rotation="rotation"
          :move-animation="moveAnimation"
          :angle="carAngle"
          @init="initCar"
        />
      </el-amap-layer-three>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible ? '隐藏' : '显示' }}
    </button>
    <button @click="stopCar()">
      停止移动
    </button>
    <button @click="startCar()">
      继续移动
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap} from "@vuemap/vue-amap";
import {
  ElAmapLayerThree,
  ElAmapThreeGltf,
  ElAmapThreeLightAmbient,
  ElAmapThreeLightDirectional,
  ElAmapThreeLightHemisphere,
  ElAmapThreeLightSpot
} from '@vuemap/vue-amap-extra';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {DotScreenShader} from 'three/examples/jsm/shaders/DotScreenShader.js';

const baseUrl = import.meta.env.VITE_ASSERT_BASE_URL;

const zoom = ref(18);
const center = ref([121.59996, 31.197646]);
const visible = ref(true);
const position = ref([121.59996, 31.197646]);
const rotation = ref({x: 90, y: 0, z: 0});
const carPosition = ref([121.59996, 31.197646]);
const moveAnimation = ref({duration: 1000, smooth: true});
const carAngle = ref(90);
const hdrOptions = ref({
  urls: ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'],
  path: `${baseUrl}/hdr/`
});
let carInterval = -1;

const switchVisible = () => {
  visible.value = !visible.value;
}
const initLayer = (layer) => {
  const renderPass = new RenderPass(layer.getScene(), layer.getCamera());
  layer.addPass(renderPass);

  const effect1 = new ShaderPass(DotScreenShader);
  effect1.uniforms['scale'].value = 4;
  layer.addPass(effect1);
}
const init = (object, $vue) => {
  $vue.$$startAnimations();
  console.log('gltf object: ', object);
  console.log('gltf $vue: ', $vue);
}
const initCar = () => {
  startCar();
}
const startCar = () => {
  carInterval = setInterval(() => {
    const lng = carPosition.value[0] + Math.random() * 0.0001;
    const lat = carPosition.value[1] + Math.random() * 0.0001;
    const newPosition = [lng, lat];
    const angle = Math.random() * 360
    carPosition.value = newPosition;
    carAngle.value = angle;
  }, 1000)
}
const stopCar = () => {
  clearInterval(carInterval);
}
</script>

<style>
</style>
