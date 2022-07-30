<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';
import ThreeLightDirectional from "./ThreeLightDirectional";
import type { PropType} from "vue";
import type {Vec} from "./Type";

export default defineComponent({
  name: 'ElAmapThreeLightAmbient',
  mixins: [registerMixin],
  props: {
    color: {
      type: String,
      required: true
    },
    intensity: {
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
      this.$amapComponent = new ThreeLightDirectional(this.$parentComponent, options);
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
