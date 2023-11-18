<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
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
import {ElAmap} from "@vuemap/vue-amap";

export default defineComponent({
  components: {
    ElAmap
  },
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
</style>
