<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-polyline
        :editable="polyline.editable"
        :visible="polyline.visible"
        :draggable="polyline.draggable"
        :path="polyline.path"
        @click="click"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="toggleVisible">
      {{ polyline.visible ? '隐藏标记' : '显示标记' }}
    </button>
    <button @click="changeDraggable">
      {{ polyline.draggable ? '禁止标记移动' : '允许标记移动' }}
    </button>
    <button @click="changeEditable">
      {{ polyline.editable ? '停止编辑' : '开始编辑' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.25515044],
      polyline: {
        path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
        editable: false,
        visible: true,
        draggable: false
      }
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    toggleVisible(){
      this.polyline.visible = !this.polyline.visible;
    },
    changeEditable() {
      this.polyline.editable = !this.polyline.editable;
    },
    changeDraggable(){
      this.polyline.draggable = !this.polyline.draggable;
    },
    click(e) {
      alert('click GeoJSON');
    },
  }
})
</script>

<style scoped>
</style>
