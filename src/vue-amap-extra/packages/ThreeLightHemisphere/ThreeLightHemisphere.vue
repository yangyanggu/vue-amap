<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap';
import ThreeLightHemisphere from "./ThreeLightHemisphere";
import type { PropType} from "vue";
import type {Vec} from "./Type";

export default defineComponent({
  name: 'ElAmapThreeLightHemisphere',
  mixins: [registerMixin],
  props: {
    color: {
      type: String,
      default: '#ffffff'
    },
    groundColor: {
      type: String,
      default: '#ffffff'
    },
    intensity: {
      type: Number,
      default: 1
    },
    position: {
      type: Object as PropType<Vec>,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new ThreeLightHemisphere(this.$parentComponent, options);
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
