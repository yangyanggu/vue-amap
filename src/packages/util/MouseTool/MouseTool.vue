<template>
  <div ref="content">
    <slot />
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';
import {isMapInstance, isOverlayGroupInstance} from '../../../utils/util';

export default defineComponent({
  name: 'ElAmapMouseTool',
  mixins: [registerMixin],
  props: {
    type: {
      type: String,
      required: true,
      default: 'marker',
      validator(value: string) {
        return ['marker', 'circle', 'rectangle', 'polyline', 'polygon', 'measureArea', 'rule', 'rectZoomIn', 'rectZoomOut'].includes(value)
      }
    }, // 类型
    drawOptions: {
      type: Object,
      default: () => null
    },
    clearWhenDestroy: {
      type: Boolean,
      default: true
    }
  },
  emits: ['draw'],
  data() {
    return {
    };
  },
  methods: {
    __initComponent() {
      return new Promise<void>((resolve) => {
        AMap.plugin(['AMap.MouseTool'], () => {
          this.$amapComponent = new AMap.MouseTool(this.$parentComponent);
          this.createTool();
          this.bindEvent();
          resolve();
        });
      });
    },
    createTool(){
      if(this.$amapComponent[this.type]){
        const options = this.drawOptions || {};
        this.$amapComponent[this.type](options);
      }
    },
    bindEvent(){
      this.$amapComponent.on('draw', (e: any) => {
        console.log('draw: ', e)
      })
    },
    $$clear(ifClear = true){
      if(this.$amapComponent){
        this.$amapComponent.close(ifClear);
      }
    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$amapComponent.close(this.clearWhenDestroy);
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  }
});
</script>
