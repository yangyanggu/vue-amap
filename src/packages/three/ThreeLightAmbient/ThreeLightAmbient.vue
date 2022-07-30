<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';
import ThreeLightAmbient from "./ThreeLightAmbient";

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
  },
  data() {
    return {};
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new ThreeLightAmbient(this.$parentComponent, options);
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
