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

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data(){
    return {
      center: [121.5273285, 31.21515044],
      zoom: 16,
      texts: [
        {
          position: [121.5273285, 31.21515044],
          id: 1,
          text: '数组1'
        }
      ] as any,
      componentText: {
        position: [121.5273285, 31.21315058],
        visible: true,
        draggable: false,
        text: '测试Text'
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
    changePosition() {
      const position = this.componentText.position;
      this.componentText.position = [position[0] + 0.002, position[1] - 0.002];
    },
    changeDraggable() {
      this.componentText.draggable = !this.componentText.draggable;
    },
    toggleVisible() {
      this.componentText.visible = !this.componentText.visible;
    },
    addMarker() {
      const marker = {
        position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02],
        id: new Date().getTime(),
        text: new Date().getTime()
      };
      this.texts.push(marker);
    },
    removeMarker() {
      if (!this.texts.length) return;
      this.texts.splice(this.texts.length - 1, 1);
    },
    initText(e){
      console.log('marker init: ', e);
    },
    clickText(){
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
