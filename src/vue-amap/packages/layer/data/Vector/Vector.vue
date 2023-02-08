<template>
  <div><slot /></div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';

export default defineComponent({
  name: 'ElAmapLayerVector',
  mixins: [registerMixin],
  provide() {
    return {
      parentInstance: this
    };
  },
  props: {
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.VectorLayer(options);
      this.$parentComponent.add(this.$amapComponent);
    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$parentComponent.removeLayer(this.$amapComponent);
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  }
});
</script>
