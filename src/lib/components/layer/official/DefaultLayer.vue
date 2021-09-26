<template></template>
<script>
import registerMixin from '../../../mixins/register-component';

export default {
  name: 'el-amap-layer-default',
  mixins: [registerMixin],
  props: {
    zoom: {
      type: Array
    },
    opacity: {
      type: Number
    }
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = AMap.createDefaultLayer(options);
      this.$parentComponent.add(this.$amapComponent);
    }
  }
};
</script>
