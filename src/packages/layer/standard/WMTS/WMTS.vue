<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLayerWmts',
  mixins: [registerMixin],
  props: {
    url: {
      type: String
    }, // wmts服务的url地址，如：' https://services.arcgisonline.com/arcgis/rest/services/'+ 'Demographics/USA_Population_Density/MapServer/WMTS/'
    blend: {
      type: Boolean,
      default: false
    }, // 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为false
    param: {
      type: Object
    }, // OGC标准的WMS地图服务的GetMap接口的参数，包括VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT等
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
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
      this.$amapComponent = new AMap.TileLayer.WMS(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
    destroyComponent() {
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
    }
  },
  render(){
    return null;
  }
});
</script>
