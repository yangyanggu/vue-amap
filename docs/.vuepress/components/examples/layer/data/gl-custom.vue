<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="50"
      @init="initMap"
    >
      <el-amap-layer-gl-custom
        :visible="visible"
        :init="initGL"
        :render="render"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref, onBeforeUnmount} from "vue";
import {ElAmap, ElAmapLayerGlCustom} from "@vuemap/vue-amap";
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  AmbientLight,
  DirectionalLight,
  TextureLoader,
  LinearFilter,
  MeshPhongMaterial,
  BoxBufferGeometry,
  Mesh
} from "three";

let camera: any;
let renderer: any;
let scene: any;
let meshes = [];
let data = [];
let customCoords: any = null;

const zoom = ref(14);
const center = ref([116.54, 39.79]);
const visible = ref(true);
let map: any = null;
let timer: any = null;

onBeforeUnmount(() => {
  cancelAnimationFrame(timer);
  camera = null;
  renderer = null;
  scene = null;
  meshes = null;
  data = null;
  customCoords = null;
})
const switchVisible = () => {
  visible.value = !visible.value;
}
const initMap = (mapInstance: any) => {
  map = mapInstance;
  // 数据转换工具
  customCoords = map.customCoords;
  // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
  data = customCoords.lngLatsToCoords([
    [116.52, 39.79],
    [116.54, 39.79],
    [116.56, 39.79],
  ]);

  function animate() {
    for (let i = 0; i < meshes.length; i++) {
      let {mesh, count} = meshes[i];
      count += 1;
      mesh.rotateZ(count / 180 * Math.PI);
    }
    map.render();
    timer = requestAnimationFrame(animate);
  }

  animate();
}
const initGL = (gl: any) => {
  const container = map.getContainer();
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  camera = new PerspectiveCamera(60, width / height, 100, 1 << 30);

  renderer = new WebGLRenderer({
    context: gl,  // 地图的 gl 上下文
    // alpha: true,
    // antialias: true,
    // canvas: gl.canvas,
  });
  renderer.setSize(width, height);

  // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
  renderer.autoClear = false;
  scene = new Scene();

  // 环境光照和平行光
  const aLight = new AmbientLight(0xffffff, 0.3);
  const dLight = new DirectionalLight(0xffffff, 1);
  dLight.position.set(1000, -100, 900);
  scene.add(dLight);
  scene.add(aLight);


  const texture = new TextureLoader().load('https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg');
  texture.minFilter = LinearFilter;
  //  这里可以使用 three 的各种材质
  const mat = new MeshPhongMaterial({
    color: 0xfff0f0,
    depthTest: true,
    transparent: true,
    map: texture,
  });
  const geo = new BoxBufferGeometry(1000, 1000, 1000);
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const mesh = new Mesh(geo, mat);
    mesh.position.set(d[0], d[1], 0);
    meshes.push({
      mesh,
      count: i,
    });
    scene.add(mesh);
  }
}
const render = () => {
  renderer.resetState();
  const {near, far, fov, up, lookAt, position} = customCoords.getCameraParams();

  // 2D 地图下使用的正交相机
  // var { near, far, top, bottom, left, right, position, rotation } = customCoords.getCameraParams();

  // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
  camera.near = near;
  camera.far = far;
  camera.fov = fov;
  camera.position.set(...position);
  camera.up.set(...up);
  camera.lookAt(...lookAt);
  camera.updateProjectionMatrix();

  // 2D 地图使用的正交相机参数赋值
  // camera.top = top;
  // camera.bottom = bottom;
  // camera.left = left;
  // camera.right = right;
  // camera.position.set(...position);
  // camera.updateProjectionMatrix();

  renderer.render(scene, camera);
  renderer.resetState();
}
</script>

<style>
</style>
