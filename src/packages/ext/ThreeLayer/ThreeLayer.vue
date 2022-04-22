<template>
  <slot />
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer,
  Scene,
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  PointLight,
  RectAreaLight,
  SpotLight,
  PMREMGenerator,
  sRGBEncoding,
  UnsignedByteType,
  LinearFilter,
  Raycaster,
  Vector2,
  Cache
} from 'three';
import {merge} from 'lodash-es';
import {HDRCubeTextureLoader} from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import registerMixin from '../../../mixins/register-component';
import {clearScene} from '../../../utils/threeUtil';

const lightTypes = {
  AmbientLight, // 环境光  环境光会均匀的照亮场景中的所有物体
  DirectionalLight, // 平行光  平行光是沿着特定方向发射的光
  HemisphereLight, // 半球光  光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
  PointLight, // 点光源  从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
  RectAreaLight, // 平面光光源  平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源
  SpotLight // 聚光灯  光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
};
const raycaster = new Raycaster();
const mouse = new Vector2();
export default defineComponent({
  name: 'ElAmapLayerThree',
  mixins: [registerMixin],
  provide() {
    return {
      parentInstance: this
    };
  },
  props: {
    lights: {
      type: Array,
      default() {
        return [];
      }
    }, // 灯光数组
    hdr: {
      type: Object
    },
    zooms: {
      type: Array,
      default() {
        return [2, 20];
      }
    }, // 支持的缩放级别范围，默认范围 [2, 20]
    opacity: {
      type: Number
    }, // 透明度，默认 1
    alpha: {
      type: Boolean,
      default: false
    }, // canvas是否包含alpha (透明度)。默认为 false
    antialias: {
      type: Boolean,
      default: false
    }// 是否执行抗锯齿。默认为false
  },
  data() {
    return {
      frameTimer: null as any,
    };
  },
  methods: {
    __initComponent(options) {
      this.customCoords = this.$parentComponent.customCoords;
      const center = this.$parentComponent.getCenter();
      this.customCoords.lngLatsToCoords([center.toArray()]);// 强制先处理一次经纬度，解决不初始化的话会导致后续转换失败
      const _this = this;
      return new Promise<void>((resolve) => {
        options.init = (gl) => {
          // 这里我们的地图模式是 3D，所以创建一个透视相机，相机的参数初始化可以随意设置，因为在 render 函数中，每一帧都需要同步相机参数，因此这里变得不那么重要。
          // 如果你需要 2D 地图（viewMode: '2D'），那么你需要创建一个正交相机
          const container = this.$parentComponent.getContainer();
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          let camera = null as any;
          if (_this.$parentComponent.getView().type === '3D') {
            camera = new PerspectiveCamera(60, width / height, 100, 1 << 30);
          } else {
            camera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
          }
          const renderer = new WebGLRenderer({
            context: gl, // 地图的 gl 上下文
            alpha: options.alpha,
            antialias: options.antialias
            // canvas: gl.canvas,
          });

          // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
          renderer.autoClear = false;
          const scene = new Scene();
          _this.camera = camera;
          _this.renderer = renderer;
          _this.scene = scene;
          _this._createLights();
          _this._createHDR();
          _this._animate();
          _this._bindEvents();
          resolve();
        };
        options.render = () => {
          // 这里必须执行！！重新设置 three 的 gl 上下文状态。
          _this.renderer.state.reset();
          const camera = _this.camera;
          // 2D 地图下使用的正交相机
          if (_this.$parentComponent.getView().type === '3D') {
            const { near, far, fov, up, lookAt, position } = _this.customCoords.getCameraParams();
            // 2D 地图下使用的正交相机

            // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
            camera.near = near;
            camera.far = far;
            camera.fov = fov;
            camera.position.set(...position);
            camera.up.set(...up);
            camera.lookAt(...lookAt);
            camera.updateProjectionMatrix();
          } else {
            const { top, bottom, left, right, position } = _this.customCoords.getCameraParams();
            // 2D 地图使用的正交相机参数赋值
            camera.top = top;
            camera.bottom = bottom;
            camera.left = left;
            camera.right = right;
            camera.position.set(...position);
            camera.updateProjectionMatrix();
          }
          _this.renderer.render(_this.scene, camera);
        };
        _this.$amapComponent = new AMap.GLCustomLayer(options);
        _this.$amapComponent.setMap(_this.$parentComponent);
      })
    },
    destroyComponent() {
      this._unBindEvents();
      this.customCoords = null;
      cancelAnimationFrame(this.frameTimer);
      this.$amapComponent.setMap(null);
      if (this.$amapComponent.envMap) {
        this.$amapComponent.envMap.dispose();
        this.$amapComponent.envMap = null;
      }
      this.customCoords = null;
      clearScene(this.scene);
      this.scene.dispose();
      this.scene = null;
      this.camera = null;
      this.renderer.dispose();
      this.renderer = null;
      this.$amapComponent = null;
      this.$parentComponent = null;
      Cache.clear();
    },
    convertLngLat(lnglat) {
      const data = this.customCoords.lngLatsToCoords([
        lnglat
      ]);
      return data[0];
    },
    addObject(object) {
      this.scene.add(object);
      this._refreshMap();
    },
    removeObject(object) {
      this.scene.remove(object);
    },
    _animate() {
      if (this.$amapComponent.needsUpdate) {
        this._refreshMap();
        this.$amapComponent.needsUpdate = false;
      }
      this.frameTimer = requestAnimationFrame(() => {
        this._animate();
      });
    },
    _createLights() {
      const lightArray = this.lights;
      const defaultLightOptions = {
        type: 'DirectionalLight', // 灯光类型， 可选值见下面的字典
        args: [] // 灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
      };
      if (lightArray.length > 0) {
        lightArray.forEach(lightOptions => {
          lightOptions = merge({}, defaultLightOptions, lightOptions);
          if (lightTypes[lightOptions.type]) {
            const light = new lightTypes[lightOptions.type](...lightOptions.args);
            const position = lightOptions.position;
            const lookAt = lightOptions.lookAt;
            if (position) {
              light.position.set(position.x, position.y, position.z);
            }
            if (lookAt) {
              light.lookAt(lookAt.x, lookAt.y, lookAt.z);
            }
            this.scene.add(light);
            this._refreshMap();
          } else {
            console.warn('当前设置的灯光类型不存在');
          }
        });
      }
    },
    _createHDR() {
      if (!this.hdr) {
        return;
      }
      const options = merge({}, {
        urls: '', // HDR贴图下载地址，需要6个文件，代表6个方向
        path: '/', // HDR下载地址的路径前缀
        // roughness: 0.0,
        exposure: 1.0 // 光亮程度
      }, this.hdr);
      const render = this.renderer;
      render.physicallyCorrectLights = true;
      render.outputEncoding = sRGBEncoding;
      render.toneMappingExposure = options.exposure;
      let hdrUrls = options.urls;
      if (!(hdrUrls instanceof Array)) {
        hdrUrls = [hdrUrls];
      }
      const pmremGenerator = new PMREMGenerator(render);
      pmremGenerator.compileCubemapShader();
      const hdrCubeMap = new HDRCubeTextureLoader().setDataType(UnsignedByteType)
        .setPath(options.path)
        .load(hdrUrls, () => {
          const hdrCubeRenderTarget = pmremGenerator.fromCubemap(hdrCubeMap);
          hdrCubeMap.magFilter = LinearFilter;
          hdrCubeMap.needsUpdate = true;
          this.$amapComponent.envMap = hdrCubeRenderTarget ? hdrCubeRenderTarget.texture : null;
          this.addEnvMap(this.scene);
          this._refreshMap();
        }) as any;
    },
    addEnvMap(object) {
      const envMap = this.$amapComponent.envMap;
      if (!envMap || !object) {
        return;
      }
      if (object.material && envMap) {
        object.material.envMap = envMap;
        // object.material.roughness = 0;
        object.material.needsUpdate = true;
      }
      if (object.children && object.children.length > 0) {
        object.children.forEach(o => {
          this.addEnvMap(o);
        });
      }
    },
    _refreshMap() {
      if (this.$parentComponent) {
        this.$parentComponent.render();
      }
    },
    _bindEvents() {
      this.$parentComponent.on('click', this._clickEvent);
      this.$parentComponent.on('mousemove', this._hoverEvent);
    },
    _unBindEvents() {
      this.$parentComponent.off('click', this._clickEvent);
      this.$parentComponent.off('mousemove', this._hoverEvent);
    },
    _clickEvent(e) {
      const group = this._intersectGltf(e) as any;
      if (group) {
        group.$vue.$emit('click', group);
      }
    },
    _hoverEvent(e) {
      const group = this._intersectGltf(e) as any;
      if (group) {
        if (!group.isHover) {
          group.isHover = true;
          group.$vue.$emit('mouseover', group);
        }
      } else {
        const children = this.scene.children;
        children.forEach(object => {
          if (object.isCustomGroup && object.isHover === true) {
            object.isHover = false;
            object.$vue.$emit('mouseout', object);
          }
        });
      }
    },
    _intersectGltf(e) {
      const client = this.$parentComponent.getContainer();
      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      const getBoundingClientRect = client.getBoundingClientRect();

      // window.pageYOffset 鼠标滚动的距离
      // clientTop 一个元素顶部边框的宽度
      const offsetTop = getBoundingClientRect.top + window.pageYOffset - client.clientTop;
      const offsetLeft = getBoundingClientRect.left + window.pageXOffset - client.clientLeft;
      mouse.x = ((e.originEvent.x + window.pageXOffset - offsetLeft) / getBoundingClientRect.width) * 2 - 1;
      mouse.y = -((e.originEvent.y + window.pageYOffset - offsetTop) / getBoundingClientRect.height) * 2 + 1;
      const camera = this.camera;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([this.scene], true);
      const length = intersects.length;
      if (length > 0) {
        let group = null;
        for (let i = 0;i < length;i++) {
          const object = intersects[i];
          group = this._getGroup(object.object);
          if (group !== null) {
            break;
          }
        }
        return group;
      }
      return null;
    },
    _getGroup(object) {
      if (object.isCustomGroup) {
        return object;
      }
      return this._getGroup(object.parent);
    },
    $$getScene() {
      return this.scene;
    },
    $$getRender() {
      return this.renderer;
    },
    $$refresh() {
      if (this.$parentComponent) {
        this.$parentComponent.render();
      }
    }
  }
});
</script>
