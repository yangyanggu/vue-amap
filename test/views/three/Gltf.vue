<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="60"
      :show-building-block="false"
      :features="['bg', 'road']"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-loca>
        <el-amap-loca-line :source-url="sourceUrl" :layer-style="layerStyle" />
      </el-amap-loca>
      <el-amap-layer-three
        :visible="true"
        :hdr="hdrOptions"
        :alpha="true"
        :antialias="true"
        :create-canvas="false"
        css-render-type="3D"
        @init="initLayer"
        @click="clickLayer"
        @mouseover="mouseoverLayer"
        @mouseout="mouseoutLayer"
      >
        <el-amap-three-light-ambient color="rgb(255,255,255)" :intensity="1" />
        <el-amap-three-light-directional
          color="rgb(255,0,255)"
          :intensity="1"
          :position="{ x: 0, y: 1, z: 0 }"
        />
        <el-amap-three-light-hemisphere
          color="blue"
          :intensity="1"
          :position="{ x: 1, y: 0, z: 0 }"
        />
        <el-amap-three-light-point
          :position="{ x: 116.106206, y: 39.975468, z: 100 }"
        />
        <el-amap-three-light-spot :position="{ x: 0, y: 1, z: 0 }" />
        <!--        <el-amap-three-gltf
          v-for="(p,index) in positions"
          :key="index"
          url="/gltf/sgyj_point_animation.gltf"
          :position="p"
          :scale="[10,10,10]"
          :rotation="rotation"
          :visible="visible"
          @init="init"
        />-->
        <el-amap-three-gltf
          v-if="visible"
          ref="animation"
          url="/gltf/sgyj_point_animation.gltf"
          :position="center"
          :scale="[10, 10, 10]"
          :rotation="rotation"
          :height="1000"
          :visible="visible"
          @init="init"
          @click="clickGltf"
        />
        <el-amap-three-gltf
          url="/gltf/car2.gltf"
          :position="carPosition"
          :scale="[10, 10, 10]"
          :angle="carAngle"
          :rotation="rotation"
          :move-animation="moveAnimation"
          :show-popup="true"
          :popup-height="2"
          :popupScale="0.1"
          @init="initCar"
        >
          <div
            style="
              width: 100px;
              height: 100px;
              background: #f44336bd;
              color: #fff;
              text-align: center;
              vertical-align: middle;
            "
          >
            测试三维信息弹窗
          </div>
        </el-amap-three-gltf>
        <el-amap-three-gltf
          ref="animation"
          url="/gltf/ferrari.glb"
          :position="center"
          :scale="[10, 10, 10]"
          :config-loader="configLoader"
        />
      </el-amap-layer-three>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? "隐藏" : "显示" }}
      </el-button>
      <el-button @click="stop"> 停止动画 </el-button>
      <el-button @click="start"> 开始动画 </el-button>
      <el-button @click="stopCar"> 停止车辆 </el-button>
      <el-button @click="startCar"> 移动车辆 </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { bearing } from "@turf/turf";
import ElAmapLayerThree from "@vuemap/vue-amap-extra/packages/ThreeLayer/ThreeLayer.vue";
import ElAmapThreeGltf from "@vuemap/vue-amap-extra/packages/ThreeGltf/ThreeGltf.vue";
import ElAmapThreeLightAmbient from "@vuemap/vue-amap-extra/packages/ThreeLightAmbient/ThreeLightAmbient.vue";
import ElAmapThreeLightDirectional from "@vuemap/vue-amap-extra/packages/ThreeLightDirectional/ThreeLightDirectional.vue";
import ElAmapThreeLightHemisphere from "@vuemap/vue-amap-extra/packages/ThreeLightHemisphere/ThreeLightHemisphere.vue";
import ElAmapThreeLightPoint from "@vuemap/vue-amap-extra/packages/ThreeLightPoint/ThreeLightPoint.vue";
import ElAmapThreeLightSpot from "@vuemap/vue-amap-extra/packages/ThreeLightSpot/ThreeLightSpot.vue";
import ElAmap from "@vuemap/vue-amap/packages/amap/amap.vue";
import ElAmapLoca from "@vuemap/vue-amap-loca/packages/Loca/Loca.vue";
import ElAmapLocaLine from "@vuemap/vue-amap-loca/packages/LineLayer/LineLayer.vue";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { DotScreenShader } from "three/examples/jsm/shaders/DotScreenShader.js";
import {
  TextureLoader,
  LinearFilter,
  MeshPhongMaterial,
  BoxBufferGeometry,
  Mesh,
} from "three";

const colors = [
  "#f7fcf5",
  "#e5f5e0",
  "#c7e9c0",
  "#a1d99b",
  "#74c476",
  "#41ab5d",
  "#238b45",
  "#006d2c",
  "#00441b",
].reverse();
export default defineComponent({
  name: "Map",
  components: {
    ElAmapThreeGltf,
    ElAmapLayerThree,
    ElAmapThreeLightAmbient,
    ElAmapThreeLightDirectional,
    ElAmapThreeLightHemisphere,
    ElAmapThreeLightPoint,
    ElAmapThreeLightSpot,
    ElAmap,
    ElAmapLoca,
    ElAmapLocaLine,
  },
  data() {
    return {
      center: [116.306206, 39.975468],
      zoom: 16,
      visible: true,
      position: [116.306206, 39.975468],
      positions: [],
      angle: 90,
      rotation: { x: 90, y: 0, z: 0 },
      carPosition: [116.306206, 39.975468],
      carInterval: -1 as any,
      moveAnimation: { duration: 1000, smooth: true },
      carAngle: 90,
      lights: [
        {
          type: "AmbientLight",
          args: [],
        },
      ],
      hdrOptions: {
        urls: ["px.hdr", "nx.hdr", "py.hdr", "ny.hdr", "pz.hdr", "nz.hdr"],
        path: "./hdr/",
      },
      sourceUrl:
        "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/bj_bus.json",
      layerStyle: {
        color(index, prop) {
          const i = index % colors.length;
          return colors[i];
        },
        lineWidth: (index, prop) => {
          const i = index % colors.length;
          return i * 0.1 + 2;
        },
        altitude(index, feature) {
          const i = index % colors.length;
          return 100 * i;
        },
        // dashArray: [10, 5, 10, 0],
        dashArray: [10, 0, 10, 0],
      },
      configLoader: (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(
          "https://cdn.jsdelivr.net/npm/three@0.143/examples/js/libs/draco/"
        );
        loader.setDRACOLoader(dracoLoader);
      },
    };
  },
  methods: {
    clickMap(e) {
      console.log("click map: ", e);
    },
    initMap(map) {
      console.log("init map: ", map);
      const positions = [] as any;
      for (let i = 0; i < 10; i++) {
        const lng = 116.306206 + Math.random() * 0.01;
        const lat = 39.975468 + Math.random() * 0.01;
        positions.push([lng, lat]);
      }
      this.positions = positions;
    },
    changeVisible() {
      this.visible = !this.visible;
    },
    initLayer(layer) {
      // const renderPass = new RenderPass(layer.getScene(), layer.getCamera());
      // renderPass.clear = true;
      // layer.addPass(renderPass);
      // const effect1 = new ShaderPass(DotScreenShader);
      // effect1.uniforms["scale"].value = 4;
      // layer.addPass(effect1);
      // console.log("init layer: ", layer);
      // const texture = new TextureLoader().load(
      //   "https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg"
      // );
      // texture.minFilter = LinearFilter;
      // //  这里可以使用 three 的各种材质
      // const mat = new MeshPhongMaterial({
      //   color: 0xfff0f0,
      //   depthTest: true,
      //   transparent: true,
      //   map: texture,
      // });
      // const geo = new BoxBufferGeometry(50, 50, 50);
      // const mesh = new Mesh(geo, mat);
      // mesh.userData.acceptEvent = true;
      // const r = layer.convertLngLat([116.308206, 39.975468]);
      // mesh.position.set(r[0], r[1], 500);
      // layer.add(mesh);
    },
    clickLayer(group) {
      console.log("click layer: ", group);
    },
    mouseoverLayer(group) {
      console.log("mouseoverLayer layer: ", group);
    },
    mouseoutLayer(group) {
      console.log("mouseoutLayer layer: ", group);
    },
    init(object, $vue) {
      console.log("init gltf: ", object);
      $vue.$$startAnimations();
    },
    clickGltf(e) {
      console.log(" click gltf: ", e);
    },
    stop() {
      (this.$refs.animation as any).$$stopAnimations();
    },
    start() {
      (this.$refs.animation as any).$$startAnimations();
    },
    initCar() {
      this.startCar();
    },
    startCar() {
      this.carInterval = setInterval(() => {
        const lng = this.carPosition[0] + Math.random() * 0.001;
        const lat = this.carPosition[1] + Math.random() * 0.001;
        const newPosition = [lng, lat];
        const angle = bearing(this.carPosition, newPosition) + 90;
        this.carPosition = newPosition;
        this.carAngle = angle;
      }, 1000);
    },
    stopCar() {
      clearInterval(this.carInterval);
    },
  },
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.control-container {
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 2;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>
