<template>
  <div class="map-page-container">
    <el-amap
      ref="map"
      :min-zoom="10"
      :max-zoom="22"
      :center="center"
      :zoom="zoom"
      @init="init"
      @click="click"
    />
  </div>
  <div class="toolbar">
    <button @click="getMap()">
      获取地图实例
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
      zoom: 16,
      center: [121.59996, 31.197646],
      map: null,
    };
  },
  methods: {
    getMap() {
      // bmap vue component
      console.log('$refs: ', this.$refs.map.$$getInstance())
    },
    init(o) {
      this.map = o;
      console.log(o.getCenter())
      console.log(this.$refs.map.$$getInstance())
    },
    click(){
      alert('click map')
    }
  }
});
</script>
<style>
</style>
