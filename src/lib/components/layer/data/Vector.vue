<template>
  <div><slot></slot></div>
</template>
<script>
import registerMixin from '../../../mixins/register-component';
import CONST from '../../../utils/constant';

export default {
  name: 'el-amap-layer-vector',
  mixins: [registerMixin],
  props: {
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.VectorLayer(options);
      this.$parentComponent.add(this.$amapComponent);
      this.$children.forEach(component => {
        component.$emit(CONST.AMAP_READY_EVENT, this.$amapComponent);
      });
    },
    destroyComponent() {
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
};
</script>
