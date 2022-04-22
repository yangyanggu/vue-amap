<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapMarkerCluster',
  mixins: [registerMixin],
  props: {
    points: {
      type: Array,
      required: true
    }, // 需要进行聚合显示的点数据
    gridSize: {
      type: Number
    }, // 聚合计算时网格的像素大小，默认60
    maxZoom: {
      type: Number
    }, // 最大的聚合级别，大于该级别就不进行相应的聚合。默认值为 18，即小于 18 级的级别均进行聚合，18 及以上级别不进行聚合
    averageCenter: {
      type: Boolean,
      default: true
    }, // 聚合点的图标位置是否是所有聚合内点的中心点。默认为 true。数据中如果含有权重值，以权重高的点为中心进行聚合
    clusterByZoomChange: {
      type: Boolean,
      default: false
    }, // 地图缩放过程中是否聚合。默认值 false。
    styles: {
      type: Array
    }, // 指定聚合后的点标记的图标样式，可缺省，缺省时为默认样式
    renderClusterMarker: {
      type: Function
    }, // 该方法用来实现聚合点的自定义绘制，由开发者自己实现，API 将在绘制每个聚合点的时候调用这个方法，可以实现聚合点样式的灵活设定，指定了 renderClusterMarker 后 styles 无效。
    renderMarker: {
      type: Function
    } // 该方法用来实现非聚合点的自定义绘制，由开发者自己实现，API 将在绘制每个非聚合点的时候调用这个方法
  },
  data() {
    return {
      converters: {
      },
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise<void>((resolve) => {
        AMap.plugin(['AMap.MarkerCluster'], () => {
          const points = options.points;
          delete options.points;
          this.$amapComponent = new AMap.MarkerCluster(this.$parentComponent, points, options);
          resolve();
        });
      });
    },
    destroyComponent() {
      this.$amapComponent.setData([])
      this.$amapComponent.setMap(null);
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
    __points(value) {
      if (this.$amapComponent) {
        this.$amapComponent.setData(value);
      }
    }
  },
  render() {
    return null;
  }
});
</script>
