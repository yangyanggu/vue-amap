<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-rectangle
        :bounds="path"
        :visible="visible"
        :editable="edit"
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
    <button @click="changeEditable">
      {{ edit ? '停止编辑' : '开始编辑' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapRectangle} from "@vuemap/vue-amap";

const zoom = ref(15);
const center = ref([121.5273285, 31.21515044]);
const draggable = ref(false);
const visible = ref(true);
const edit = ref(true);
const path = ref([[121.5273285, 31.21515044], [121.5293285, 31.21515044]]);

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
}
const toggleVisible = () => {
  visible.value = !visible.value;
}
const changeEditable = () => {
  edit.value = !edit.value;
}
const changeDraggable = () => {
  draggable.value = !draggable.value;
}
const click = (e) => {
  alert('click GeoJSON');
}
</script>

<style scoped>
</style>
