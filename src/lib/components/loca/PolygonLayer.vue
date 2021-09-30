<template>
</template>
<script>
import registerMixin from '@/mixins/register-component';
import locaMixin from '@/mixins/loca-component';

export default {
  name: 'el-amap-loca-polygon',
  mixins: [registerMixin, locaMixin],
  props: {
    cullface: {
      type: String
    }, // 剔除背面/前面的面（选择剔除将会提升性能），可选：back/front/none，back是剔除背面的面，front是剔除前面的面，none是不进行剔除。
    acceptLight: {
      type: Boolean
    }, // 面是否接受光照，光照信息在 loca 对象中配置
    shininess: {
      type: Number
    }, // 立体网格的粗糙度，值越高，说明表面越粗糙。
    hasSide: {
      type: Boolean
    }, // 当面有厚度的时候，有没有侧面和底面
    depth: {
      type: Boolean
    }// 是否开启深度检测，开启后可能会影响zIndex
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
      this.$amapComponent = new Loca.PolygonLayer(options);
      this.setSource();
      if (this.layerStyle) {
        this.$amapComponent.setStyle(this.layerStyle);
      }
      this.$parentComponent.add(this.$amapComponent);
    }
  }
};
</script>
