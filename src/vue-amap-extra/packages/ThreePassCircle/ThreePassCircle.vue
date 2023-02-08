<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import ThreePassCircle from "./ThreePassCircle";

export default defineComponent({
  name: 'ElAmapThreePassCircle',
  mixins: [registerMixin],
  props: {
    color: {
      type: String,
      default: '#ffffff'
    },
    position: {
      type: Array,
      required: true
    },
    maxRadius: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {};
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new ThreePassCircle(this.$parentComponent, options);
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
