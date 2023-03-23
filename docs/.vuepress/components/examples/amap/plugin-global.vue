<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="init"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      zoom: 12,
      center: [121.59996, 31.197646]
    };
  },

  methods: {
    init(map) {
      const eye = new AMap.HawkEye();
      map.addControl(eye);
      console.log('map init: ', map)
    },
  }
})
</script>

<style>
</style>
