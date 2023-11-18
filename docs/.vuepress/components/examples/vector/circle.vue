<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-circle
        :center="circleCenter"
        :radius="radius"
        :visible="visible"
        :editable="edit"
        :draggable="draggable"
        @click="click"
      />
      <el-amap-layer-vector>
        <el-amap-circle
          :center="layer.circleCenter"
          :radius="layer.radius"
        />
      </el-amap-layer-vector>
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
import {ElAmap, ElAmapLayerVector, ElAmapCircle} from "@vuemap/vue-amap";

const zoom = ref(13);
const center = ref([121.5273285, 31.21515044]);
const draggable = ref(false);
const visible = ref(true);
const edit = ref(true);
const circleCenter = ref([121.5273285, 31.21515044]);
const radius = ref(500);
const layer = ref({
  circleCenter: [121.5283285, 31.21615044],
  radius: 500,
})

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
}
const changeEditable = () => {
  edit.value = !edit.value;
}
const toggleVisible = () => {
  visible.value = !visible.value;
}
const changeDraggable = () => {
  draggable.value = !draggable.value;
}
const click = (e) => {
  alert('click Circle');
}
</script>

<style scoped>
</style>
