<template>
  <div><slot/></div>
</template>
<script>
import registerMixin from '@/mixins/register-component';
import CONST from '@/utils/constant';

export default {
  name: 'el-amap-loca',
  mixins: [registerMixin],
  props: {
    ambLight: {
      type: Object
    }, // 环境光
    dirLight: {
      type: Object
    }, // 平行光
    pointLight: {
      type: Object
    } // 点光
  },
  data() {
    return {
      converters: {},
      handlers: {
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.Container({
        map: this.$parentComponent
      });
      if (options.ambLight) {
        this.$amapComponent.ambLight = options.ambLight;
      }
      if (options.dirLight) {
        this.$amapComponent.dirLight = options.dirLight;
      }
      if (options.pointLight) {
        this.$amapComponent.pointLight = options.pointLight;
      }
      this.$children.forEach(component => {
        component.$emit(CONST.AMAP_READY_EVENT, this.$amapComponent);
      });
    },
    destroyComponent() {
      this.$amapComponent.destroy();
    },
    getMap() {
      return this.$parentComponent;
    }
  }
};
</script>
