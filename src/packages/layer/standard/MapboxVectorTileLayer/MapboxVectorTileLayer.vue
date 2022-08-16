<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLayerMapboxVectorTile',
  mixins: [registerMixin],
  props: {
    url: {
      type: String
    }, // MVT 数据的链接地址
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2,22]
    dataZooms: {
      type: Array
    }, // 瓦片数据等级范围，超过范围会使用最大/最小等级的数据，默认 [2,18]
    opacity: {
      type: Number
    }, // 透明度，默认 1
    styles: {
      type: Object
    } // 样式
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise<void>((resolve) => {
        AMap.plugin(['AMap.MapboxVectorTileLayer'], () => {
          this.$amapComponent = new AMap.MapboxVectorTileLayer(options);
          this.$parentComponent.addLayer(this.$amapComponent);
          resolve();
        });
      });

    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$parentComponent.removeLayer(this.$amapComponent);
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  render(){
    return null;
  }
});
</script>
