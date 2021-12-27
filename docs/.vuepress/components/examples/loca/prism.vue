<template>
  <div class="map-page-container">
    <el-amap
      view-mode="3D"
      :pitch="pitch"
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-loca>
        <el-amap-loca-prism
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
        />
      </el-amap-loca>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

let map = null;

export default defineComponent({
  name: "Map",
  data() {
    const topConf = {
      '上海市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-one.png',
      '北京市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-two.png',
      '广州市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-three.png',
    };
    return {
      center: [103.594884,36.964587],
      zoom: 2,
      pitch: 55,
      visible: true,
      sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
      layerStyle: {
        unit: 'meter',
        sideNumber: 32,
        topColor: (index, f) => {
          const n = f.properties['GDP'];
          return n > 7000 ? '#E97091' : '#2852F1';
        },
        sideTopColor: (index, f) => {
          const n = f.properties['GDP'];
          return n > 7000 ? '#E97091' : '#2852F1';
        },
        sideBottomColor: '#002bb9',
        radius: 15000,
        height: (index, f) => {
          const props = f.properties;
          const height = Math.max(100, Math.sqrt(props['GDP']) * 9000 - 50000);
          const conf = topConf[props['名称']];
          // top3 的数据，增加文字表达
          if (conf) {
            map.add(
                new AMap.Marker({
                  anchor: 'bottom-center',
                  position: [f.coordinates[0], f.coordinates[1], height],
                  content: `<div style="margin-bottom: 10px; float: left; font-size: 14px;height: 57px; width: 180px; color:#fff; background: no-repeat url(${
                      conf
                      }); background-size: 100%;"><p style="margin: 7px 0 0 35px; height: 20px; line-height:20px;">${
                      props['名称']  }人口 ${  props['人口']  }</p>` +
                      `<p style="margin: 4px 0 0 35px; height: 20px; line-height:20px; color: #00a9ff; font-size: 13px;">${
                      props['GDP']  } 元` +
                      `</p></div>`,
                }),
            );
          }
          return height;
          // return 60000 + n * 100;
        },
        // rotation: 360 * 100,
        altitude: 0,
      }
    }
  },
  methods: {
    clickMap(e) {
      console.log('click map: ', e);
    },
    initMap(e) {
      map = e;
      console.log('init map: ', e);
    },
    changeVisible() {
      this.visible = !this.visible;
    },
  }
})
</script>

<style scoped>
</style>
