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
          auto-focus
          :url="url"
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

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap} from "@vuemap/vue-amap";
import {ElAmapLayerThree, ElAmapThreeLightAmbient, ElAmapThreeTiles3d} from "@vuemap/vue-amap-extra";

const zoom = ref(16);
const center = ref([116.404987, 39.90946]);

const url = 'https://raw.githubusercontent.com/yangyanggu/layer-3dtiles/master/test/hutong/tileset.json';
// const url = 'https://myserver.guyixi.cn:10081/bl/tileset.json';

const visible = ref(true);
const changeVisible = () => {
  visible.value = !visible.value;
};

const clickMap = (e) => {
  console.log('click map: ', e);
};
const initMap = (map) => {
  console.log('init map: ', map);
};

const create = ref(true);
const changeCreate = () => {
  create.value = !create.value;
};

</script>
