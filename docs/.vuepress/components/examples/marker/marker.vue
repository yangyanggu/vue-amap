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

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data(){
    return {
      center: [121.5273285, 31.21515044],
      zoom: 16,
      markers: [
        {
          position: [121.5273285, 31.21515044],
          id: 1
        }
      ],
      componentMarker: {
        position: [121.5273285, 31.21315058],
        visible: true,
        draggable: false
      },
      componentMarker2: {
        position: [121.5283285, 31.21315058],
        content: 'hello world'
      },
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    changeCenter(){
      const lng = this.center[0]+0.01;
      const lat = this.center[1]+0.01;
      this.center = [lng, lat];
    },
    changePosition() {
      const position = this.componentMarker.position;
      this.componentMarker.position = [position[0] + 0.002, position[1] - 0.002];
    },
    changeDraggable() {
      this.componentMarker.draggable = !this.componentMarker.draggable;
    },
    toggleVisible() {
      this.componentMarker.visible = !this.componentMarker.visible;
    },
    markerInit(e){
      console.log('marker init: ', e);
    },
    clickMarker(){
      alert('点击了标号')
    },
    clickArrayMarker(marker){
      alert(`点击了标号,标号ID： ${marker.id}`)
    }
  }
})
</script>

<style scoped>
</style>
