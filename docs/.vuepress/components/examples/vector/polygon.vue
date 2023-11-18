<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-polygon
        :path="polygon.path"
        :visible="polygon.visible"
        :editable="polygon.edit"
        :draggable="polygon.draggable"
        @click="click"
        @dragstart="dragstart"
        @dragging="dragging"
        @dragend="dragend"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="toggleVisible">
      {{ polygon.visible ? '隐藏标记' : '显示标记' }}
    </button>
    <button @click="changeDraggable">
      {{ polygon.draggable ? '禁止标记移动' : '允许标记移动' }}
    </button>
    <button @click="changeEditable">
      {{ polygon.edit ? '停止编辑' : '开始编辑' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive} from "vue";
import {ElAmap, ElAmapPolygon} from "@vuemap/vue-amap";

const zoom = ref(15);
const center = ref([121.5273285, 31.21515044]);
const polygon = reactive({
  draggable: false,
  visible: true,
  edit: true,
  path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
});

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
}
const toggleVisible = () => {
  polygon.visible = !polygon.visible;
}
const changeEditable = () => {
  polygon.edit = !polygon.edit;
}
const changeDraggable = () => {
  polygon.draggable = !polygon.draggable;
}
const click = (e) => {
  alert('click GeoJSON');
}
const dragstart = () => {
  console.log('开始移动')
}
const dragging = () => {
  console.log('正在移动...')
}
const dragend = () => {
  console.log('结束移动')
}

</script>

<style scoped>
</style>
