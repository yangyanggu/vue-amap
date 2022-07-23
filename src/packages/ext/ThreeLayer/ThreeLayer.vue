<template>
  <slot />
</template>
<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';
import ThreeLayer from "./ThreeLayer";

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
    },// 是否执行抗锯齿。默认为false
    customCoordsCenter: {
      type: Array,
      default(){
        return null
      }
    }
  },
  data() {
    return {
      frameTimer: null as any,
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new ThreeLayer(options, this.$parentComponent);
      return this.$amapComponent.init();
    },
    destroyComponent() {
      this.$amapComponent.destroy();
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
    convertLngLat(lnglat) {
      return this.$amapComponent.convertLngLat(lnglat);
    },
    addObject(object) {
      this.$amapComponent.addObject(object);
    },
    removeObject(object) {
      this.$amapComponent.removeObject(object);
    },
    addEnvMap(obj) {
      this.$amapComponent.addEnvMap(obj);
    },
    $$getScene() {
      return this.$amapComponent.getScene();
    },
    $$getRender() {
      return this.$amapComponent.getRender();
    },
    $$refresh() {
      this.$amapComponent.refreshMap();
    }
  }
});
</script>
