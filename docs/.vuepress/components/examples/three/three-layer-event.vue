<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="60"
      :show-building-block="false"
      :features="['bg','road']"
    >
      <el-amap-text
        :visible="meshVisible"
        :position="meshPosition"
        :offset="[0, -80]"
        text="测试模型事件"
      />
      <el-amap-layer-three
        :hdr="hdrOptions"
        :create-canvas="true"
        @init="initLayer"
        @click="clickLayer"
        @mouseover="mouseoverLayer"
        @mouseout="mouseoutLayer"
      >
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="0.6"
        />
        <el-amap-three-light-directional
          color="rgb(255,0,255)"
          :intensity="1"
          :position="{x:0, y:1, z:0}"
        />
        <el-amap-three-light-hemisphere
          color="blue"
          :intensity="1"
          :position="{x:1, y:0, z:0}"
        />
        <el-amap-three-light-spot :position="{x:0, y:1, z:0}" />
        <el-amap-three-gltf
          url="/gltf/sgyj_point_animation.gltf"
          :position="position"
          :scale="[10,10,10]"
          :rotation="rotation"
          :visible="visible"
          @init="init"
        />
      </el-amap-layer-three>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {BoxBufferGeometry, LinearFilter, Mesh, MeshPhongMaterial, TextureLoader} from "three";

export default defineComponent({
  components: {},
  data() {
    return {
      zoom: 18,
      center: [121.59996, 31.197646],
      visible: true,
      position: [121.59996, 31.197646],
      rotation: {x:90, y:0, z:0},
      hdrOptions: {
        urls: [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
        path: '/hdr/'
      },
      meshPosition: [121.59896, 31.197646],
      meshVisible: false
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
    initLayer(layer) {
      const texture = new TextureLoader().load(
          'https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg'
      );
      texture.minFilter = LinearFilter;
      //  这里可以使用 three 的各种材质
      const mat = new MeshPhongMaterial({
        color: 0xfff0f0,
        depthTest: true,
        transparent: true,
        map: texture,
      });
      const geo = new BoxBufferGeometry(50, 50, 50);
      const mesh = new Mesh(geo, mat);
      mesh.userData.acceptEvent = true;
      const r = layer.convertLngLat(this.meshPosition)
      mesh.position.set(r [0], r [1], 0);
      layer.add(mesh);
    },
    clickLayer(group){
      console.log('click layer: ', group);
    },
    mouseoverLayer(group){
      this.meshVisible = true;
      console.log('mouseoverLayer layer: ', group);
    },
    mouseoutLayer(group){
      this.meshVisible = false;
      console.log('mouseoutLayer layer: ', group);
    },
    init(object, $vue){
      $vue.$$startAnimations();
      console.log('gltf object: ', object);
      console.log('gltf $vue: ', $vue);
    },
  }
});
</script>

<style>
</style>
