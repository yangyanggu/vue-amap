<template>
  <div class="map-page-container">
    <el-amap
      view-mode="3D"
      :pitch="pitch"
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-loca @init="initLoca">
        <el-amap-loca-scatter
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
        />
      </el-amap-loca>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap} from "@vuemap/vue-amap";
import {ElAmapLoca, ElAmapLocaScatter} from "@vuemap/vue-amap-loca";

const zoom = ref(11);
const center = ref([113.97199630737305, 22.5807295363949]);
const pitch = ref(55)

const sourceUrl = ref('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_F.json');
const layerStyle = ref({
  unit: 'meter',
  size: [2600, 2600],
  borderWidth: 0,
  texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
  duration: 500,
  animate: true,
})


const visible = ref(true)
const changeVisible = () => {
  visible.value = !visible.value;
}

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
}

const initLoca = (loca: any) => {
  loca.animate.start();
}

</script>

<style scoped>
</style>
