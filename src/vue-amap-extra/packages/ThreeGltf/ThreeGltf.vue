<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import CustomThreeGltf from "./CustomThreeGltf";
import type {MoveAnimation, Vec, ConfigLoader} from "./Type";
import type{PropType} from "vue";

export default defineComponent({
  name: 'ElAmapThreeGltf',
  mixins: [registerMixin],
  props: {
    url: {
      type: String
    },
    position: {
      type: Array as PropType<number[]>
    },
    height: {
      type: Number,
      default: 0
    },
    rotation: {
      type: Object as PropType<Vec>
    },
    scale: {
      type: [Number, Array],
      default: 1
    },
    angle: {
      type: Number,
      default: 0
    },
    moveAnimation: {
      type: Object as PropType<MoveAnimation>
    }, //位置移动是否开启动画
    configLoader: {
      type: Function as PropType<ConfigLoader>
    },
    useModelCache: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'mousemove', 'mouseover', 'mouseout'],
  data() {
    return {};
  },
  methods: {
    __initComponent(options) {
      return new Promise<void>(resolve => {
        this.$amapComponent = new CustomThreeGltf(this.$parentComponent, options, this, () => {
          resolve()
        });
      })

    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$amapComponent.remove();
      }
      this.$amapComponent.destroy()
    },
    $$startAnimations() {
      this.$amapComponent.startAnimations();
    },
    $$stopAnimations() {
      this.$amapComponent.stopAnimations();
    }
  },
  render() {
    return null;
  }
});
</script>
