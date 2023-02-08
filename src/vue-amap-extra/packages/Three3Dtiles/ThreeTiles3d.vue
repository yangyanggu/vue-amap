<script lang="ts">
import {defineComponent} from "vue";
import {Layer3DTiles} from "@vuemap/layer-3dtiles";
import {registerMixin} from '@vuemap/vue-amap-util';
import type {LngLat,Vec} from "./Type";

import type{PropType} from "vue";

export default defineComponent({
  name: 'ElAmapThreeTiles3d',
  mixins: [registerMixin],
  props: {
    //地址
    url: {
      type: String,
      required: true
    },
    // 位置
    position: {
      type: Object as PropType<LngLat>,
      required: true
    },
    // 缩放比例
    scale: {
      type: Object as PropType<number | Vec>
    },
    // 旋转角度
    rotation: {
      type: Object as PropType<Vec>
    },
    // 模型偏移设置
    translate: {
      type: Object as PropType<Vec>
    },
    // DRACOLoader 的decoder路径，默认使用CDN路径，默认：https://cdn.jsdelivr.net/npm/three@0.143/examples/js/libs/draco/
    dracoDecoderPath: {
      type: String,
    },
    // 使用fetch下载文件的参数
    fetchOptions: {
      type: Object,
    },
    // 是否开启事件,默认false
    mouseEvent: {
      type: Boolean,
      default: false
    },
    // 是否开启debug，开启后将会在页面最顶部显示当前模型处理情况， 默认 false
    debug: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Layer3DTiles(this.$parentComponent, options);
    },
    destroyComponent() {
      this.$amapComponent.destroy();
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
  },
  render(){
    return null;
  }
});
</script>
