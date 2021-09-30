<template>
</template>
<script>
import registerMixin from '@/mixins/register-component';
import locaMixin from '@/mixins/loca-component';

export default {
  name: 'el-amap-loca-line',
  mixins: [registerMixin, locaMixin],
  props: {
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
      this.$amapComponent = new Loca.LineLayer(options);
      this.setSource();
      if (this.layerStyle) {
        this.$amapComponent.setStyle(this.layerStyle);
      }
      this.$parentComponent.add(this.$amapComponent);
    }
  }
};
</script>
