<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-marker
        :position="componentMarker.position"
        :visible="componentMarker.visible"
        :draggable="componentMarker.draggable"
        :move-options="moveOptions"
        @init="markerInit"
        @click="clickMarker"
      >
        <div style="padding: 5px 10px;white-space: nowrap;background: blue;color: #fff;">
          测试content
        </div>
      </el-amap-marker>
      <el-amap-marker
        :position="componentMarker2.position"
        :content="componentMarker2.content"
      />
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        @click="(e) => {clickArrayMarker(marker, e)}"
      />
    </el-amap>
  </div>
  <div class="control-container">
    <button @click="changePosition">
      更换位置
    </button>
    <button @click="toggleVisible">
      {{ componentMarker.visible ? '隐藏标记' : '显示标记' }}
    </button>
    <button @click="changeDraggable">
      {{ componentMarker.draggable ? '禁止标记移动' : '允许标记移动' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapMarker} from "@vuemap/vue-amap";

const zoom = ref(16);
const center = ref([121.5273285, 31.21515044]);

const markers = ref([
  {
    position: [121.5273285, 31.21515044],
    id: 1
  }
])

const componentMarker = ref({
  position: [121.5273285, 31.21315058],
  visible: true,
  draggable: false
});

const componentMarker2 = ref({
  position: [121.5283285, 31.21315058],
  content: 'hello world'
});

const moveOptions = ref({
  duration: 200,
  autoRotation: false
})

const clickMap = (e: any) => {
  console.log('click map: ', e);
}
const initMap = (map: any) => {
  console.log('init map: ', map);
}

const clickMarker = () => {
  alert('点击了标号');
}

const changePosition = () => {
  const position = componentMarker.value.position;
  componentMarker.value.position = [position[0] + 0.0002, position[1] - 0.0002];
}
const changeDraggable = () =>  {
  componentMarker.value.draggable = !componentMarker.value.draggable;
}
const toggleVisible = () =>   {
  componentMarker.value.visible = !componentMarker.value.visible;
}
const markerInit = (e: any) => {
  console.log('marker init: ', e);
}
const clickArrayMarker = (marker: any) => {
  alert(`点击了标号,标号ID： ${marker.id}`)
}


</script>

<style scoped>
</style>
