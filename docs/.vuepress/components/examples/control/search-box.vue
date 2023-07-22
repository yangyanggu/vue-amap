<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-search-box
        :visible="visible"
        :debounce="1000"
        @select="selectPoi"
        @choose="choosePoi"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible? '隐藏' : '显示' }}
    </button>
  </div>
</template>

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
    selectPoi(e){
      console.log('selectPoi: ', e);
    },
    choosePoi(e){
      console.log('choosePoi: ', e);
    }
  }
});
</script>

<style>
</style>
