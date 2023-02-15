# 3d自定义图层 (AMap.GLCustomLayer)
3d 自定义图层

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" view-mode="3D" :pitch="50" @init="initMap" class="amap-demo">
        <el-amap-layer-gl-custom :visible="visible" :init="initGL" :render="render"></el-amap-layer-gl-custom>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏图层' : '显示图层'}}</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    var camera;
    var renderer;
    var scene;
    var meshes = [];
    var data = [];
    var customCoords = null;
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 14,
          center: [116.54, 39.79],
          visible: true,
          map: null,
          timer: null
        };
      },
      beforeDestroy(){
        cancelAnimationFrame(this.timer);
        camera = null;
        renderer = null;
        scene = null;
        meshes = null;
        data = null;
        customCoords = null;
      },
      methods: {
        toggleVisible(){
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
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
init  | Function | 初始化的时候，开发者可以在这个函数参数里面获取 gl 上下文，进行一些初始化的操作。
render | Function | 绘制函数，初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.GLCustomLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.GLCustomLayer | 实例初始化结束

