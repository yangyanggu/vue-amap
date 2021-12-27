<template>
  <div class="map-page-container">
    <el-amap :center="center" :zoom="zoom" view-mode="3D" :pitch="50" @init="initMap">
      <el-amap-layer-gl-custom :visible="visible" :init="initGL" :render="render"></el-amap-layer-gl-custom>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">{{visible? '隐藏' : '显示'}}</button>
  </div>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";
var camera;
var renderer;
var scene;
var meshes = [];
var data = [];
var customCoords = null;
export default defineComponent({
  data() {

    return {
      zoom: 14,
      center: [116.54, 39.79],
      visible: true,
      map: null,
      timer: null,
    };
  },
  beforeUnmount(){
    cancelAnimationFrame(this.timer);
    camera = null;
    renderer = null;
    scene = null;
    meshes = null;
    data = null;
    customCoords = null;
  },
  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
    initMap(map){
      this.map = map;
      // 数据转换工具
      customCoords = map.customCoords;
      // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
      data = customCoords.lngLatsToCoords([
        [116.52, 39.79],
        [116.54, 39.79],
        [116.56, 39.79],
      ]);
      const _this = this;
      function animate() {
        for (let i = 0; i < meshes.length; i++) {
          let { mesh, count } = meshes[i];
          count += 1;
          mesh.rotateZ(count / 180 * Math.PI);
        }
        map.render();
        _this.timer = requestAnimationFrame(animate);
      }
      animate();
    },
    initGL(gl){
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1 << 30);

      renderer = new THREE.WebGLRenderer({
        context: gl,  // 地图的 gl 上下文
        // alpha: true,
        // antialias: true,
        // canvas: gl.canvas,
      });

      // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
      renderer.autoClear = false;
      scene = new THREE.Scene();

      // 环境光照和平行光
      var aLight = new THREE.AmbientLight(0xffffff, 0.3);
      var dLight = new THREE.DirectionalLight(0xffffff, 1);
      dLight.position.set(1000, -100, 900);
      scene.add(dLight);
      scene.add(aLight);


      var texture = new THREE.TextureLoader().load('https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg');
      texture.minFilter = THREE.LinearFilter;
      //  这里可以使用 three 的各种材质
      var mat = new THREE.MeshPhongMaterial({
        color: 0xfff0f0,
        depthTest: true,
        transparent: true,
        map: texture,
      });
      var geo = new THREE.BoxBufferGeometry(1000, 1000, 1000);
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(d[0], d[1], 0);
        meshes.push({
          mesh,
          count: i,
        });
        scene.add(mesh);
      }
    },
    render(){
      renderer.state.reset();
      var { near, far, fov, up, lookAt, position } = customCoords.getCameraParams();

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
    }
  }
});
</script>
