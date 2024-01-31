<script lang="ts">
import './addProcess';
import {defineComponent} from "vue";
import {DistrictCluster} from "@vuemap/district-cluster";
import {registerMixin} from '@vuemap/vue-amap';
import type { PropType } from 'vue';
import type { RenderOptions } from '@vuemap/district-cluster';
type GetPosition = (dataItem: any, dataIndex: number) => [number, number]

export default defineComponent({
  name: 'ElAmapLayerDistrictCluster',
  mixins: [registerMixin],
  props: {
    data: {
      required: true,
      type: Array
    }, // 数据源数组，每个元素即为点相关的信息
    getPosition: {
      type: Function as PropType<GetPosition>
    }, // 返回数据项中的经纬度信息
    autoSetFitView: {
      type: Boolean,
      default: true
    }, // 是否在绘制后自动调整地图视野以适合全部点，默认true
    topAdcodes: {
      type: Array as PropType<Array<number>>
    },// 顶层区划的adcode列表
    excludedAdcodes: {
      type: Array as PropType<Array<number>>
    },
    renderOptions: {
      type: Object as PropType<RenderOptions>
    } // 绘制的引擎的参数
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      options.map = this.$parentComponent;
      this.$amapComponent = new DistrictCluster(options);
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
