<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-layer-district
        :visible="visible"
        type="Province"
        adcode="320000"
        :depth="2"
        :styles="styles"
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
import {ElAmap, ElAmapLayerDistrict} from "@vuemap/vue-amap";

const zoom = ref(6);
const center = ref([118.763563,32.061377]);


const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}
// 颜色辅助方法
const colors: Record<string, string> = {};
const getColorByAdcode = (adcode: string) => {
  if (!colors[adcode]) {
    const gb = Math.random() * 155 + 50;
    colors[adcode] = `rgb(${  gb  },${  gb  },255)`;
  }

  return colors[adcode];
};

const styles = ref({
  'fill': function (properties) {
  // properties为可用于做样式映射的字段，包含
  // NAME_CHN:中文名称
  // adcode_pro
  // adcode_cit
  // adcode
  const adcode = properties.adcode;
  return getColorByAdcode(adcode);
},
'province-stroke': 'cornflowerblue',
    'city-stroke': 'white', // 中国地级市边界
    'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
})
</script>

<style>
</style>
