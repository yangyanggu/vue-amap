<script lang="ts">
import {defineComponent} from "vue";
import {CustomXyzLayer} from "@vuemap/amap-xyz-layer";
import {registerMixin} from '@vuemap/vue-amap-util';
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ElAmapLayerCustomXyz',
  mixins: [registerMixin],
  props: {
    url: {
      required: true,
      type: String
    }, // 瓦片地址，支持 {s} {x} {y} {z}，示例：http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}
    subdomains: {
      type: Array as PropType<Array<string>>
    }, // 子域名数组，当url中设置{s}后，该属性必填
    tileType: {
      type: String,
      default: 'xyz',
      validator: (value : string): boolean => {
        // 这个值必须匹配下列字符串中的一个
        return ['xyz', 'bd09'].indexOf(value) !== -1;
      }
    }, // 瓦片分割类型，默认是xyz，xyz代表瓦片是编号是从左上角开始，百度瓦片是由中间开始，所以需要区分普通瓦片还是百度
    proj: {
      type: String,
      default: 'gcj02',
      validator: (value : string): boolean => {
        // 这个值必须匹配下列字符串中的一个
        return ['wgs84', 'gcj02', 'bd09'].indexOf(value) !== -1;
      }
    },// 瓦片使用的坐标系，默认是gcj02
    zooms: {
      type: Object as PropType<[number, number]>
    }, // 图层缩放等级范围，默认 [2, 18]
    opacity: {
      type: Number
    }, // 图层透明度，默认为 1
    zIndex: {
      type: Number,
      default: 120
    },
    mask: {
      type: Array
    },
    cacheSize: {
      type: Number,
      default: 512
    },
    debug: {
      type: Boolean,
      default: false
    },
    tileMaxZoom: {
      type: Number
    },
    altitude: {
      type: Number
    }
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new CustomXyzLayer(this.$parentComponent, options);
    },
    destroyComponent() {
      this.$amapComponent.destroy();
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  render(){
    return null;
  }
});
</script>
