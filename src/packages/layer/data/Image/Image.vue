<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLayerImage',
  mixins: [registerMixin],
  props: {
    url: {
      type: String,
      required: true
    }, // 图片地址链接
    zoom: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    bounds: {
      type: [Array, Object]
    }, // 图片的范围大小经纬度，如果传递数字数组类型: [minlng,minlat,maxlng,maxlat] 或 AMap.Bounds
    opacity: {
      type: Number
    } // 透明度，默认 1
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.ImageLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
    destroyComponent() {
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
    },
    __url(value) {
      this.$amapComponent.setImageUrl(value);
    }
  },
  render(){
    return null;
  }
});
</script>
