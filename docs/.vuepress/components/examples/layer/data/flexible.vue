<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-layer-flexible
        :visible="visible"
        :create-tile="createTile"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapLayerFlexible} from "@vuemap/vue-amap";

const zoom = ref(12);
const center = ref([121.59996, 31.197646]);

const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

const createTile = (x: number, y: number, z: number, success: (item: HTMLCanvasElement) => void, fail) => {
  const c = document.createElement('canvas');
  c.width = c.height = 256;

  const cxt = c.getContext("2d");
  cxt.font = "15px Verdana";
  cxt.fillStyle = "#ff0000";
  cxt.strokeStyle = "#FF0000";
  cxt.strokeRect(0, 0, 256, 256);
  cxt.fillText(`(${  [x, y, z].join(',')  })`, 10, 30);
  // 通知API切片创建完成
  success(c);
}

</script>

<style>
</style>
