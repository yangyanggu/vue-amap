<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap';
import ThreeLightDirectional from "./ThreeLightDirectional";
import type { PropType} from "vue";
import type {Vec} from "./Type";

export default defineComponent({
  name: 'ElAmapThreeLightDirectional',
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
    position: {
      type: Object as PropType<Vec>,
      default: () => ({x:0,y:0,z:1})
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
      this.$amapComponent = new ThreeLightDirectional(this.$parentComponent, options);
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
