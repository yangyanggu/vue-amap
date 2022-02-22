<template>
  <div class="el-vue-amap-container">
    <div class="el-vue-amap" />
    <slot />
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import guid from '../../utils/guid';
import registerMixin from '../../mixins/register-component';
import {lazyAMapApiLoaderInstance} from '../../services/injected-amap-api-instance';

export default defineComponent ({
  name: 'ElAmap',
  mixins: [registerMixin],

  props: {
    vid: {
      type: String
    }, // 地图ID
    center: {
      type: Array
    }, // 初始中心经纬度
    zoom: {
      type: Number
    }, // 地图显示的缩放级别，可以设置为浮点数；若center与level未赋值，地图初始化默认显示用户所在城市范围。
    rotation: {
      type: Number
    }, // 地图顺时针旋转角度，取值范围 [0-360] ，默认值：0
    pitch: {
      type: Number
    }, // 俯仰角度，默认 0，最大值根据地图当前 zoom 级别不断增大，2D地图下无效 。
    viewMode: {
      type: String
    }, // 地图视图模式, 默认为‘2D’，可选’3D’，选择‘3D’会显示 3D 地图效果。
    features: {
      type: Array
    }, // 设置地图上显示的元素种类, 支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物），默认值：['bg','point','road','building']
    layers: {
      type: Array
    }, // 地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。 当叠加多个 图层 时，普通二维地图需通过实例化一个TileLayer类实现。 如果你希望创建一个默认底图图层，使用 AMap.createDefaultLayer()
    zooms: {
      type: Array
    }, // 图显示的缩放级别范围, 默认为 [2, 20] ，取值范围 [2 ~ 30]
    resizeEnable: {
      type: Boolean,
      default: true
    }, // 是否监控地图容器尺寸变化，默认值为false。此属性可被 setStatus/getStatus 方法控制
    dragEnable: {
      type: Boolean,
      default: true
    }, // 地图是否可通过鼠标拖拽平移, 默认为 true。此属性可被 setStatus/getStatus 方法控制
    zoomEnable: {
      type: Boolean,
      default: true
    }, // 地图是否可缩放，默认值为 true。此属性可被 setStatus/getStatus 方法控制
    jogEnable: {
      type: Boolean,
      default: true
    }, // 地图是否使用缓动效果，默认值为true。此属性可被setStatus/getStatus 方法控制
    pitchEnable: {
      type: Boolean,
      default: true
    }, // 是否允许设置俯仰角度, 3D 视图下为 true, 2D 视图下无效。。此属性可被setStatus/getStatus 方法控制
    rotateEnable: {
      type: Boolean,
      default: true
    }, // 地图是否可旋转, 图默认为true。此属性可被setStatus/getStatus 方法控制
    animateEnable: {
      type: Boolean,
      default: true
    }, // 地图平移过程中是否使用动画（如调用panBy、panTo、setCenter、setZoomAndCenter等函数, 将对地图产生平移操作, 是否使用动画平移的效果）, 默认为true, 即使用动画
    keyboardEnable: {
      type: Boolean,
      default: true
    }, // 地图是否可通过键盘控制, 默认为true, 方向键控制地图平移，"+"和"-"可以控制地图的缩放, Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转。此属性可被setStatus/getStatus 方法控制
    doubleClickZoom: {
      type: Boolean,
      default: true
    }, // 地图是否可通过双击鼠标放大地图, 默认为true。此属性可被setStatus/getStatus 方法控制
    scrollWheel: {
      type: Boolean,
      default: true
    }, // 地图是否可通过鼠标滚轮缩放浏览，默认为true。此属性可被setStatus/getStatus 方法控制
    touchZoom: {
      type: Boolean,
      default: true
    }, // 地图在移动终端上是否可通过多点触控缩放浏览地图，默认为true。关闭手势缩放地图，请设置为false。
    touchZoomCenter: {
      type: Number
    }, // 可缺省，当touchZoomCenter=1的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心。默认：1
    showLabel: {
      type: Boolean,
      default: true
    }, // 是否展示地图文字和 POI 信息。默认 true
    defaultCursor: {
      type: String
    }, // 地图默认鼠标样式。参数 defaultCursor 应符合 CSS 的 cursor 属性规范。
    isHotspot: {
      type: Boolean
    }, // 是否开启地图热点和标注的 hover 效果。PC端默认是true, 移动端默认是 false。
    mapStyle: {
      type: String
    }, // 设置地图的显示样式，目前支持两种地图样式： 第一种：自定义地图样式，如 "amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86" 可前往地图自定义平台定制自己的个性地图样式； 第二种：官方样式模版,如"amap://styles/grey"。 其他模版样式及自定义地图的使用说明见开发指南
    wallColor: {
      type: [String, Array]
    }, // 地图楼块的侧面颜色
    roofColor: {
      type: [String, Array]
    }, // 地图楼块的顶面颜色
    showBuildingBlock: {
      type: Boolean,
      default: true
    }, // 是否展示地图 3D 楼块，默认 true
    showIndoorMap: {
      type: Boolean,
      default: false
    }, // 是否自动展示室内地图，默认是 false
    skyColor: {
      type: [String, Array]
    }, // 天空颜色，3D 模式下带有俯仰角时会显示
    labelRejectMask: {
      type: Boolean,
      default: false
    }, // 文字是否拒绝掩模图层进行掩模
    mask: {
      type: Array
    }, // 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像，3D视图下有效。 格式为一个经纬度的一维、二维或三维数组。
    WebGLParams: {
      type: Object
    },// 额外配置的WebGL参数 eg: preserveDrawingBuffer
  },

  data() {
    return {
    };
  },

  computed: {
  },

  unmounted() {
    this.$parentComponent && this.$parentComponent.destroy();
  },

  mounted() {
    this.createMap();
  },
  beforeUnmount() {
    if (this.$amapComponent) {
      this.$amapComponent.destroy();
      this.$amapComponent = null;
    }
  },
  methods: {
    createMap() {
      lazyAMapApiLoaderInstance.then(() => {
        const mapElement = this.$el.querySelector('.el-vue-amap');
        const elementID = this.vid || guid();
        mapElement.id = elementID;
        this.$parentComponent = this.$amapComponent = new AMap.Map(elementID, this.convertProps());
        this.register();
        this.createChildren();
      }).catch(e => {
        console.warn('init map error: ', e);
      });
    },
    __dragEnable(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({dragEnable: flag});
      }
    },
    __zoomEnable(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({zoomEnable: flag});
      }
    },
    __jogEnable(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({jogEnable: flag});
      }
    },
    __keyboardEnable(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({keyboardEnable: flag});
      }
    },
    __doubleClickZoom(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({doubleClickZoom: flag});
      }
    },
    __scrollWheel(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({scrollWheel: flag});
      }
    },
    __rotateEnable(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({rotateEnable: flag});
      }
    },
    __resizeEnable(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({resizeEnable: flag});
      }
    },
    __showIndoorMap(flag){
      if(this.$amapComponent){
        this.$amapComponent.setStatus({showIndoorMap: flag});
      }
    }
  }
});
</script>

<style lang="scss">
.el-vue-amap-container {
  height: 100%;
  position: relative;

  .el-vue-amap {
    height: 100%;
  }
}
</style>
