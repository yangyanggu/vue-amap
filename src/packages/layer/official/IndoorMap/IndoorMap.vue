<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';
import {isIndoorMapInstance} from '../../../../utils/util';

export default defineComponent({
  name: 'ElAmapLayerIndoorMap',
  mixins: [registerMixin],
  props: {
    opacity: {
      type: Number
    }, // 透明度，默认 1
    cursor: {
      type: String
    }, // 指定鼠标悬停到店铺面时的鼠标样式
    hideFloorBar: {
      type: Boolean,
      default: false
    }// 是否隐藏楼层切换控件，默认值：false
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise<void>((resolve) => {
        AMap.plugin(['AMap.IndoorMap'], () => {
          this.$amapComponent = new AMap.IndoorMap(options);
          const layers = this.$parentComponent.getLayers();
          layers.push(this.$amapComponent);
          this.$parentComponent.setLayers(layers);
          resolve();
        });
      });
    },
    destroyComponent() {
      const layers = this.$parentComponent.getLayers();
      let index = -1;
      for (let i = 0;i < layers.length;i++) {
        if (isIndoorMapInstance(layers[i])) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        layers.splice(index, 1);
        this.$parentComponent.setLayers(layers);
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
    __hideFloorBar(flag) {
      flag === false ? this.$amapComponent.hideFloorBar() : this.$amapComponent.showFloorBar();
    }
  },
  render(){
    return null;
  }
});
</script>
