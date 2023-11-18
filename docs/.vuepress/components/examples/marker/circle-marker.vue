<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-circle-marker
        :center="circleCenter"
        :radius="radius"
        :visible="visible"
        :draggable="draggable"
        @click="click"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="toggleVisible">
      {{ visible ? '隐藏标记' : '显示标记' }}
    </button>
    <button @click="changeDraggable">
      {{ draggable ? '禁止标记移动' : '允许标记移动' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapCircleMarker} from "@vuemap/vue-amap";

const zoom = ref(13);
const center = ref([121.5273285, 31.21515044]);

const draggable = ref(false);

const visible = ref(true)

const circleCenter = ref([121.5273285, 31.21515044]);
const radius = ref(500);
const toggleVisible = () => {
  visible.value = !visible.value;
}

const clickMap = (e: any) => {
  console.log('click map: ', e);
}
const initMap = (map: any) => {
  console.log('init map: ', map);
}

const changeDraggable = () => {
  draggable.value = !draggable.value;
}
const click = (e: any) => {
  alert('click Circle');
}

</script>

<style scoped>
</style>
