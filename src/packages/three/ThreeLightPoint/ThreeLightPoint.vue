<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';
import ThreeLightPoint from "./ThreeLightPoint";
import type { PropType} from "vue";
import type {Vec} from "./Type";

export default defineComponent({
  name: 'ElAmapThreeLightPoint',
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
    decay: {
      type: Number,
      default: 1
    },
    position: {
      type: Object as PropType<Vec>,
      required: true
    },
  },
  data() {
    return {};
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new ThreeLightPoint(this.$parentComponent, options);
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
