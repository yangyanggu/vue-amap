<template>
</template>
<script>
import registerMixin from '@/mixins/register-component';
import locaMixin from '@/mixins/loca-component';

export default {
  name: 'el-amap-loca-point',
  mixins: [registerMixin, locaMixin],
  props: {
    blend: {
      type: String
    } // 图层里面元素的叠加效果，normal：正常透明度叠加，lighter：叠加后可能更加明亮
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
      this.$amapComponent = new Loca.PointLayer(options);
      this.setSource();
      if (this.layerStyle) {
        this.$amapComponent.setStyle(this.layerStyle);
      }
      this.$parentComponent.add(this.$amapComponent);
    }
  }
};
</script>
