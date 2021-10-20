<template>
  <div><slot></slot></div>
</template>
<script>
import registerMixin from '../../../mixins/register-component';
import CONST from '../../../utils/constant';

export default {
  name: 'el-amap-layer-labels',
  mixins: [registerMixin],
  props: {
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    opacity: {
      type: Number
    }, // 透明度，默认 1
    collision: {
      type: Boolean
    }, // 标注层内的标注是否避让
    allowCollision: {
      type: Boolean
    }// 标注层内的标注是否允许其它标注层对它避让
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.LabelsLayer(options);
      this.$parentComponent.add(this.$amapComponent);
      this.$children.forEach(component => {
        component.$emit(CONST.AMAP_READY_EVENT, this.$amapComponent);
      });
    },
    $$add(markers) {
      this.$amapComponent.add(markers);
    },
    destroyComponent() {
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
};
</script>
