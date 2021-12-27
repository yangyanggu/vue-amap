<template>
  <div class="map-page-container">
    <el-amap :center="center" :zoom="zoom">
      <el-amap-layer-vector :visible="visible">
        <el-amap-circle :center="center" :radius="100"></el-amap-circle>
      </el-amap-layer-vector>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">{{visible? '隐藏' : '显示'}}</button>
  </div>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      zoom: 14,
      center: [121.5273285, 31.21515044],
      visible: true,
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
  }
});
</script>
