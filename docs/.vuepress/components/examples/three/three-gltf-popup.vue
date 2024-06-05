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
        :create-css-render="true"
      >
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="0.6"
        />
        <el-amap-three-gltf
          :visible="visible"
          :url="baseUrl + '/gltf/car2.gltf'"
          :position="center"
          :scale="[10,10,10]"
          :rotation="rotation"
          :show-popup="popupVisible"
          :popup-height="popupHeight"
          :popup-scale="0.1"
          popup-type="3D"
        >
          <div
            style="
              width: 100px;
              height: 100px;
              background: #f44336bd;
              color: #fff;
              text-align: center;
              vertical-align: middle;
            "
          >
            测试三维3D信息弹窗
          </div>
        </el-amap-three-gltf>
        <el-amap-three-gltf
          :visible="visible"
          :url="baseUrl + '/gltf/car2.gltf'"
          :position="carPosition"
          :scale="[10,10,10]"
          :rotation="rotation"
          :move-animation="moveAnimation"
          :angle="carAngle"
          :show-popup="popupVisible"
          :popup-height="popupHeight"
          @init="initCar"
        >
          <div
            style="
              width: 100px;
              height: 100px;
              background: #f44336bd;
              color: #fff;
              text-align: center;
              vertical-align: middle;
            "
          >
            测试三维2D信息弹窗
          </div>
        </el-amap-three-gltf>
      </el-amap-layer-three>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible ? '隐藏' : '显示' }}
    </button>
    <button @click="switchPopupVisible()">
      {{ popupVisible ? '隐藏popup' : '显示popup' }}
    </button>
    <button @click="addPopupHeight()">
      增加popup高度
    </button>
    <button @click="subPopupHeight()">
      减少popup高度
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
} from '@vuemap/vue-amap-extra';

const baseUrl = import.meta.env.VITE_ASSERT_BASE_URL;

const zoom = ref(18);
const center = ref([121.59996, 31.197646]);
const visible = ref(true);
const rotation = ref({x: 90, y: 0, z: 0});
const carPosition = ref([121.60106, 31.197646]);
const moveAnimation = ref({duration: 1000, smooth: true});
const carAngle = ref(90);
const hdrOptions = ref({
  urls: ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'],
  path: `${baseUrl}/hdr/`
});
let carInterval: any = -1;

const switchVisible = () => {
  visible.value = !visible.value;
};
const initCar = () => {
  startCar();
};
const startCar = () => {
  carInterval = setInterval(() => {
    const lng = carPosition.value[0] + Math.random() * 0.0001;
    const lat = carPosition.value[1] + Math.random() * 0.0001;
    const newPosition = [lng, lat];
    const angle = Math.random() * 360;
    carPosition.value = newPosition;
    carAngle.value = angle;
  }, 1000);
};
const stopCar = () => {
  clearInterval(carInterval);
};

const popupVisible = ref(true);
const popupHeight = ref(0);

const switchPopupVisible = () => {
  popupVisible.value = !popupVisible.value;
};

const addPopupHeight = () => {
  popupHeight.value += 2;
};
const subPopupHeight = () => {
  popupHeight.value -= 2;
};
</script>

<style>
</style>
