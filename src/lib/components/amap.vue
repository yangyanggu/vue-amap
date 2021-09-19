<template>
  <div class="el-vue-amap-container">
    <div class="el-vue-amap"></div>
    <slot></slot>
  </div>
</template>
<script>
import guid from '../utils/guid';
import CONST from '../utils/constant';
import {lngLatTo, toLngLat} from '../utils/convert-helper';
import registerMixin from '../mixins/register-component';
import {lazyAMapApiLoaderInstance} from '../services/injected-amap-api-instance';

export default {
  name: 'el-amap',
  mixins: [registerMixin],
  props: [
    //  add v1.4.0 new feature
    'viewMode',
    'skyColor',
    'rotateEnable',
    'pitch',
    'buildingAnimation',
    'pitchEnable',

    'vid',
    'events',
    'center',
    'zoom',
    'draggEnable',
    'level',
    'zooms',
    'lang',
    'defaultCursor',
    'crs',
    'animateEnable',
    'isHotspot',
    'defaultLayer',
    'rotateEnable',
    'resizeEnable',
    'showIndoorMap',
    'indoorMap',
    'expandZoomRange',
    'dragEnable',
    'zoomEnable',
    'doubleClickZoom',
    'keyboardEnable',
    'jogEnable',
    'scrollWheel',
    'touchZoom',
    'mapStyle',
    'plugin',
    'features',
    'amapManager' // 地图管理 manager
  ],

  beforeCreate() {
  },

  destroyed() {
    this.$amap && this.$amap.destroy();
  },

  computed: {
  },

  data() {
    return {
      converters: {
        center(arr) {
          return toLngLat(arr);
        }
      },
      handlers: {
        zoomEnable(flag) {
          this.setStatus({zoomEnable: flag});
        },
        dragEnable(flag) {
          this.setStatus({dragEnable: flag});
        },
        rotateEnable(flag) {
          this.setStatus({rotateEnable: flag});
        }
      }
    };
  },

  mounted() {
    this.createMap();
  },

  addEvents() {
    this.$amapComponent.on('moveend', () => {
      let centerLngLat = this.$amapComponent.getCenter();
      this.center = [centerLngLat.getLng(), centerLngLat.getLat()];
    });
  },

  methods: {

    setStatus(option) {
      this.$amap.setStatus(option);
    },

    createMap() {
      lazyAMapApiLoaderInstance.then(() => {
        let mapElement = this.$el.querySelector('.el-vue-amap');
        const elementID = this.vid || guid();
        mapElement.id = elementID;
        this.$amap = this.$amapComponent = new AMap.Map(elementID, this.convertProps());
        if (this.amapManager) this.amapManager.setMap(this.$amap);
        this.$emit(CONST.AMAP_READY_EVENT, this.$amap);
        this.$children.forEach(component => {
          component.$emit(CONST.AMAP_READY_EVENT, this.$amap);
        });
      }).catch(e => {
        console.warn('init map error: ', e);
      });
    },
    $$getCenter() {
      if (!this.$amap) return lngLatTo(this.center);
      return lngLatTo(this.$amap.getCenter());
    }
  }
};
</script>

<style lang="less">
.el-vue-amap-container {
  height: 100%;

  .el-vue-amap {
    height: 100%;
  }
}
</style>
