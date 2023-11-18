<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-bezier-curve
        :editable="polyline.editable"
        :visible="polyline.visible"
        :stroke-weight="6"
        :draggable="polyline.draggable"
        :path="polyline.path"
        @click="click"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="toggleVisible">
      {{ polyline.visible ? '隐藏标记' : '显示标记' }}
    </button>
    <button @click="changeDraggable">
      {{ polyline.draggable ? '禁止标记移动' : '允许标记移动' }}
    </button>
    <button @click="changeEditable">
      {{ polyline.editable ? '停止编辑' : '开始编辑' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive} from "vue";
import {ElAmap, ElAmapBezierCurve} from "@vuemap/vue-amap";

const zoom = ref(13);
const center = ref([116.397637, 39.900001]);
const polyline = reactive({
  path: [//每个弧线段有两种描述方式
    [116.37, 39.91],//起点
    //第一段弧线
    [116.380298, 39.907771, 116.38, 39.90],//控制点，途经点
    //第二段弧线
    [116.385298, 39.907771, 116.40, 39.90],//控制点，途经点//弧线段有两种描述方式1
    //第三段弧线
    [//弧线段有两种描述方式2
      [116.392872, 39.887391],//控制点
      [116.40772, 39.909252],//控制点
      [116.41, 39.89]//途经点
    ],
    //第四段弧线
    [116.423857, 39.889498, 116.422312, 39.899639, 116.425273, 39.902273]
    //控制点，控制点，途经点，每段最多两个控制点
  ],
  editable: false,
  visible: true,
  draggable: false,
});

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
}
const changeEditable = () => {
  polyline.editable = !polyline.editable;
}
const toggleVisible = () => {
  polyline.visible = !polyline.visible;
}
const changeDraggable = () => {
  polyline.draggable = !polyline.draggable;
}
const click = (e) => {
  alert('click BezierCurve');
}
</script>

<style scoped>
</style>
