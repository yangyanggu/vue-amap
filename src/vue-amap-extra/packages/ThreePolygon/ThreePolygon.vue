<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import ThreePolygon from "./ThreePolygon";
import type {Polygon} from './Type'
import type {PropType} from "vue";

export default defineComponent({
  name: 'ElAmapThreePolygon',
  mixins: [registerMixin],
  props: {
    sideTopColor: {
      type: String,
      default: '#ffffff'
    },// 侧面顶部颜色
    sideBottomColor: {
      type: String,
      default: '#ffffff'
    },// 侧面颜色
    sideTexture: {
      type: String
    }, // 侧面贴图
    topColor: {
      type: String,
      default: '#ffffff'
    },
    bottomColor: {
      type: String,
      default: '#ffffff'
    },
    height: {
      type: Number,
      default: 30
    },
    depthTest: {
      type: Boolean,
      default: true
    },
    source: {
      type: Object as PropType<Polygon>,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new ThreePolygon(this.$parentComponent, options);
    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$amapComponent.remove();
      }
      this.$amapComponent.destroy()
    },
  },
  render() {
    return null;
  }
});
</script>
