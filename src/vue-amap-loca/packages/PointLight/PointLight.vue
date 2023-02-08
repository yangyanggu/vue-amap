<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';

export default defineComponent({
  name: 'ElAmapLocaPointLight',
  mixins: [registerMixin],
  props: {
    color: {
      type: String
    }, // 点光颜色。
    intensity: {
      type: Number
    }, // 光照强度。
    position: {
      type: Array,
      required: true
    }, // 点光位置
    distance: {
      type: Number
    }, // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失
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
      this.$amapComponent = new Loca.PointLight(options);
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
