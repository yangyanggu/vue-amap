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

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      draggable: false,
      visible: true,
      edit: true,
      path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044]],
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
      this.visible = !this.visible;
    },
    changeEditable() {
      this.edit = !this.edit;
    },
    changeDraggable(){
      this.draggable = !this.draggable;
    },
    click(e) {
      alert('click GeoJSON');
    },
  }
})
</script>

<style scoped>
</style>
