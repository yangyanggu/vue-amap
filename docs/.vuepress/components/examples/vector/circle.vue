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

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data(){
    return {
      zoom: 13,
      center: [121.5273285, 31.21515044],
      draggable: false,
      visible: true,
      edit: true,
      circleCenter: [121.5273285, 31.21515044],
      radius: 500,
      layer: {
        circleCenter: [121.5283285, 31.21615044],
        radius: 500,
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
    changeEditable() {
      this.edit = !this.edit;
    },
    toggleVisible(){
      this.visible = !this.visible;
    },
    changeDraggable(){
      this.draggable = !this.draggable;
    },
    click(e) {
      alert('click Circle');
    },
  }
})
</script>

<style scoped>
</style>
