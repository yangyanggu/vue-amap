<template>
  <div><slot></slot></div>
</template>
<script>
import registerMixin from '../../../mixins/register-component';

export default {
  name: 'el-amap-layer-vector',
  mixins: [registerMixin],
  provide() {
    return {
      parentInstance: this
    };
  },
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
    },
    destroyComponent() {
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  }
};
</script>
