<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap';
import ThreeLightSpot from "./ThreeLightSpot";
import type { PropType} from "vue";
import type {Vec} from "./Type";

export default defineComponent({
  name: 'ElAmapThreeLightSpot',
  mixins: [registerMixin],
  props: {
    color: {
      type: String,
      default: '#ffffff'
    },
    intensity: {
      type: Number,
      default: 1
    },
    distance: {
      type: Number,
      default: 0
    },
    angle: {
      type: Number,
      default: 0
    },
    penumbra: {
      type: Number,
      default: 0
    },
    decay: {
      type: Number,
      default: 1
    },
    position: {
      type: Object as PropType<Vec>,
      required: true
    },
    target: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new ThreeLightSpot(this.$parentComponent, options);
    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$amapComponent.remove();
      }
      this.$amapComponent.destroy();
    },
  },
  render() {
    return null;
  }
});
</script>
