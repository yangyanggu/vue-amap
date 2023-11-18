<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-layer-vector :visible="visible">
        <el-amap-circle
          :center="center"
          :radius="100"
        />
      </el-amap-layer-vector>
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
import {ElAmap, ElAmapLayerVector, ElAmapCircle} from "@vuemap/vue-amap";

const zoom = ref(14);
const center = ref([121.5273285, 31.21515044]);

const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

</script>

<style>
</style>
