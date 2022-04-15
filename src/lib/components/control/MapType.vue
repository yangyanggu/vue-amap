<template></template>
<script>
import registerMixin from '../../mixins/register-component';

export default {
  name: 'el-amap-control-map-type',
  mixins: [registerMixin],
  props: {
    defaultType: {
      type: Number
    }, // 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
    showTraffic: {
      type: Boolean
    }, // 叠加实时交通图层 默认值：false
    showRoad: {
      type: Boolean
    }// 叠加路网图层 默认值：false
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise((resolve) => {
        this.$parentComponent = this.parentInstance.$amapComponent;
        this.$parentComponent.plugin(['AMap.MapType'], () => {
          this.$amapComponent = new AMap.MapType(options);
          this.$amapComponent.addTo(this.$parentComponent);
          resolve();
        });

      });
    },
    destroyComponent() {
      if (this.$amapComponent && this.$parentComponent) {
        this.$amapComponent.remove();
      }
    }
  }
};
</script>
