<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';

export default defineComponent({
  name: 'ElAmapLayerDefault',
  mixins: [registerMixin],
  props: {
    zoom: {
      type: Array
    },
    opacity: {
      type: Number
    }
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = AMap.createDefaultLayer(options);
      this.$parentComponent.add(this.$amapComponent);
    }
  },
  render(){
    return null;
  }
});
</script>
