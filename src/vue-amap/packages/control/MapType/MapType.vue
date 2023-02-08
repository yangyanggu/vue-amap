<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';

export default defineComponent({
  name: 'ElAmapControlMapType',
  mixins: [registerMixin],
  props: {
    defaultType: {
      type: Number
    }, // 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
    showTraffic: {
      type: Boolean,
      default: false
    }, // 叠加实时交通图层 默认值：false
    showRoad: {
      type: Boolean,
      default: false
    }// 叠加路网图层 默认值：false
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise<void >((resolve) => {
        this.$parentComponent.plugin(['AMap.MapType'], () => {
          this.$amapComponent = new AMap.MapType(options);
          this.$parentComponent.addControl(this.$amapComponent);
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
