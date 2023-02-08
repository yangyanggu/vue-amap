<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';

export default defineComponent({
  name: 'ElAmapLocaAmbientLight',
  mixins: [registerMixin],
  props: {
    color: {
      type: String
    }, // 环境光颜色。
    intensity: {
      type: Number
    }, // 环境光强度。
  },
  data() {
    return {
      converters: {},
      handlers: {
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.AmbientLight(options);
      this.$parentComponent.addLight(this.$amapComponent);
    },
    destroyComponent(){
      if(!this.parentInstance.isDestroy){
        this.$parentComponent.removeLight(this.$amapComponent);
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  render(){
    return null;
  }
});
</script>
