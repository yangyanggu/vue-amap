<template>
  <div><slot /></div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLayerVector',
  mixins: [registerMixin],
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
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
});
</script>
