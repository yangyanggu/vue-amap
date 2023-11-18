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

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapSearchBox} from "@vuemap/vue-amap";

const zoom = ref(12);
const center = ref([121.59996, 31.197646]);

const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

const selectPoi = (e: any) => {
  console.log('selectPoi: ', e);
}
const choosePoi = (e: any) => {
  console.log('choosePoi: ', e);
}

</script>

<style>
</style>
