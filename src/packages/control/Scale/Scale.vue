<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapControlScale',
  mixins: [registerMixin],
  props: {
    position: {
      type: [String, Object]
    }, // 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
    offset: {
      type: Array
    }// 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise<void>((resolve) => {
        this.$parentComponent.plugin(['AMap.Scale'], () => {
          this.$amapComponent = new AMap.Scale(options);
          this.$amapComponent.addTo(this.$parentComponent);
          resolve();
        });
      });
    },
    destroyComponent() {
      if (this.$amapComponent && this.$parentComponent) {
        if(!this.parentInstance.isDestroy){
          this.$parentComponent.removeControl(this.$amapComponent);
        }
        this.$amapComponent = null;
        this.$parentComponent = null;
      }
    }
  },
  render(){
    return null;
  }
});
</script>
