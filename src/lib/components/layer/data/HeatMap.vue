<template></template>
<script>
import registerMixin from '../../../mixins/register-component';

export default {
  name: 'el-amap-layer-heat-map',
  mixins: [registerMixin],
  props: {
    radius: {
      type: Number
    }, // 热力图中单个点的半径，默认：30，单位：pixel
    gradient: {
      type: Object
    }, // 热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图，例{0.4:'rgb(0, 255, 255)',0.85:'rgb(100, 0, 255)',},其中 key 表示间隔位置，取值范围： [0,1] ，value 为颜色值。默认：heatmap.js标准配色方案
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    opacity: {
      type: Array
    }, // 热力图透明度区间数组，取值范围 [0,1] ，0表示完全透明，1表示不透明，默认： [0,1]
    config: {
      type: Object
    }, // 3D热力图属性
    dataSet: {
      type: Object
    }// 热力图数据集
  },
  data() {
    return {
      propsRedirect: {
        config: '3d'
      }
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise((resolve) => {
        AMap.plugin(['AMap.HeatMap'], () => {
          delete options.dataSet;
          this.$amapComponent = new AMap.HeatMap(this.$parentComponent, options);
          if (this.dataSet) {
            this.$amapComponent.setDataSet(this.dataSet);
          }
          resolve();
        });
      });
    },
    destroyComponent() {
      this.$amapComponent.setMap(null);
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  }
};
</script>
