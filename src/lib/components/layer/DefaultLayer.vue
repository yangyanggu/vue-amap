<template></template>
<script>
import registerMixin from '../../mixins/register-component';

export default {
  name: 'el-amap-layer-default',
  mixins: [registerMixin],
  props: {
    zoom: {
      type: Array
    },
    visible: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: Number
    },
    zIndex: {
      type: Number
    }
  },
  data() {
    return {
      handlers: {
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.createDefaultLayer(options);
      this.$parentComponent.add(this.$amapComponent);
    }
  }
};
</script>
