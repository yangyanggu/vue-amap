<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-layer-video
        :url="url"
        :bounds="bounds"
        :visible="visible"
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
import {ElAmap, ElAmapLayerVideo} from "@vuemap/vue-amap";

const zoom = ref(15);
const center = ref([116.33719, 39.942384]);

const bounds = ref([116.327911, 39.939229,116.342659, 39.946275]);

const url = ref('/video/test.mp4');

const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

</script>

<style>
</style>
