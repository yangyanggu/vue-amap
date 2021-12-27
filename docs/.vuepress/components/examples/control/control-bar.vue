<template>
  <div class="map-page-container">
    <el-amap :center="center" :zoom="zoom">
      <el-amap-control-control-bar :visible="visible" ></el-amap-control-control-bar>
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
      zoom: 12,
      center: [121.59996, 31.197646],
      visible: true
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
  }
});
</script>
