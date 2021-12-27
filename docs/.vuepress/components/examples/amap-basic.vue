<template>
  <div class="amap-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      class="amap-demo"
      @init="init"
    />
  </div>
  <div class="toolbar">
    <button @click="add()">
      添加标号
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
      map: null
    };
  },

  methods: {
    init(map) {
      const marker = new AMap.Marker({
        position: [121.59996, 31.197646]
      });
      map.add(marker);
      this.map = map;
      console.log('map init: ', map)
    },
    add() {
      const marker = new AMap.Marker({
        position: [121.59996, 31.177646]
      });
      this.map.add(marker);
    }
  }
})
</script>

<style>
.amap-page-container {
  height: 300px;
}
</style>
