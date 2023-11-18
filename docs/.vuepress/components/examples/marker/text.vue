<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-text
        :position="componentText.position"
        :text-style="{color: 'red'}"
        :visible="componentText.visible"
        :text="componentText.text"
        :draggable="componentText.draggable"
        @init="initText"
        @click="clickText"
      />
      <el-amap-text
        v-for="(marker, index) in texts"
        :key="index"
        :position="marker.position"
        :text="marker.text"
        @click="(e) => {clickArrayMarker(marker, e)}"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changePosition">
      更换位置
    </button>
    <button @click="toggleVisible">
      {{ componentText.visible ? '隐藏标记' : '显示标记' }}
    </button>
    <button @click="changeDraggable">
      {{ componentText.draggable ? '禁止标记移动' : '允许标记移动' }}
    </button>
    <button @click="addMarker">
      添加标记
    </button>
    <button @click="removeMarker">
      移除标记
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapText} from "@vuemap/vue-amap";

const center = ref([121.5273285, 31.21515044]);
const zoom = ref(16);
const texts = ref([
  {
    position: [121.5273285, 31.21515044],
    id: 1,
    text: '数组1'
  }
]);
const componentText = ref({
  position: [121.5273285, 31.21315058],
  visible: true,
  draggable: false,
  text: '测试Text'
});

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
}
const changePosition = () => {
  const position = componentText.value.position;
  componentText.value.position = [position[0] + 0.002, position[1] - 0.002];
}
const changeDraggable = () => {
  componentText.value.draggable = !componentText.value.draggable;
}
const toggleVisible = () => {
  componentText.value.visible = !componentText.value.visible;
}
const addMarker = () => {
  const marker = {
    position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02],
    id: new Date().getTime(),
    text: new Date().getTime()
  };
  texts.value.push(marker);
}
const removeMarker = () => {
  if (!texts.value.length) return;
  texts.value.splice(texts.value.length - 1, 1);
}
const initText = (e) => {
  console.log('marker init: ', e);
}
const clickText = () => {
  alert('点击了标号')
}
const clickArrayMarker = (marker) => {
  alert(`点击了标号,标号ID： ${marker.id}`)
}

</script>

<style scoped>
</style>
