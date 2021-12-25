<template>
  <div><slot /></div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLoca',
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
    },
    destroyComponent() {
      this.$amapComponent.destroy();
    },
    getMap() {
      return this.$parentComponent;
    }
  }
});
</script>
