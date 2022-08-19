<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-rectangle
        v-model:bounds="path"
        :visible="visible"
        :editable="edit"
        :draggable="draggable"
        @click="click"
      />
    </el-amap>
    <div class="control-container">
      <el-button @click="toggleVisible">
        {{ visible ? '隐藏标记' : '显示标记' }}
      </el-button>
      <el-button @click="changeDraggable">
        {{ draggable ? '禁止标记移动' : '允许标记移动' }}
      </el-button>
      <el-button @click="changeEditable">
        {{ edit ? '停止编辑' : '开始编辑' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapRectangle from "@vue-map/packages/vector/Rectangle/Rectangle.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapRectangle,
    ElAmap},
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
.map-container{
  width: 100%;
  height: 100%;
  position: relative;
}
.control-container{
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 2;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>
