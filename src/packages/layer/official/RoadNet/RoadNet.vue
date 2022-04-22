<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLayerRoadNet',
  mixins: [registerMixin],
  props: {
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    opacity: {
      type: Number
    }, // 透明度，默认 1
    tileSize: {
      type: Number
    }// 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.TileLayer.RoadNet(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
    destroyComponent() {
      this.$amapComponent.destroy();
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  render(){
    return null;
  }
});
</script>
