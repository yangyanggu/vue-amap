<template>
  <div><slot /></div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';
import type { PropType} from "vue";
import type {EventOptions} from './Type'

export default defineComponent({
  name: 'ElAmapLoca',
  mixins: [registerMixin],
  provide() {
    return {
      parentInstance: this
    };
  },
  props: {
    ambLight: {
      type: Object
    }, // 环境光
    dirLight: {
      type: Object
    }, // 平行光
    pointLight: {
      type: Object
    }, // 点光
    onClick: {
      type: Function,
      default: null
    },
    onMousemove: {
      type: Function,
      default: null
    },
    onRightclick: {
      type: Function,
      default: null
    },
    eventOptions: {
      type: Object as PropType<EventOptions>,
      default: () => ({
        hitFirst: true
      })
    } // 对于事件是否只触发第一个选中的数据
  },
  emits: ['mousemove', 'click', 'rightclick' ],
  data() {
    return {
      isDragging: false,
      isRotating: false,
      hitFirst: true
    };
  },
  unmounted() {
    this.$amapComponent = null;
    this.$parentComponent = null;
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.Container({
        map: this.$parentComponent
      });
      if (options.ambLight) {
        this.$amapComponent.ambLight = options.ambLight;
      }
      if (options.dirLight) {
        this.$amapComponent.dirLight = options.dirLight;
      }
      if (options.pointLight) {
        this.$amapComponent.pointLight = options.pointLight;
      }
      this.hitFirst = options.eventOptions.hitFirst;
      this.bindEvents();
    },
    bindEvents(){
      if(this.parentInstance){
        const map = this.getMap();
        const $props = this.$props;
        if($props.onClick !== null){
          map.on('click', this.clickMap);
        }
        if($props.onMousemove !== null){
          map.on('mousemove', this.mouseMoveMap);
          map.on('dragstart', this.dragStart);
          map.on('dragend', this.dragEnd);
          map.on('rotatestart', this.rotateStart);
          map.on('rotateend', this.rotateEnd);
          map.on('mouseout', this.mouseoutMap)
        }
        if($props.onRightclick !== null){
          map.on('rightclick', this.rightclickMap);
        }
      }
    },
    clickMap(e) {
      const features = this._getFeature(e);
      this.$emit('click', features, e);
    },
    rightclickMap(e) {
      const features = this._getFeature(e);
      this.$emit('rightclick', features, e);
    },
    mouseMoveMap(e) {
      if(this.isDragging || this.isRotating){
        return;
      }
      const features = this._getFeature(e);
      this.$emit('mousemove', features, e);
    },
    _getFeature(e){
      const features: any[] = [];
      if(this.$amapComponent.layers){
        const layers: any[] = [];
        this.$amapComponent.layers.forEach(( v => {
          layers.push(v);
        }));
        layers.sort((a,b) => b.zIndex - a.zIndex)
        const layerLen = layers.length;
        for(let i=0;i<layerLen;i++){
          const temp = layers[i].queryFeature(e.pixel.toArray());
          if(temp){
            features.push(temp)
            if(this.hitFirst){
              break;
            }
          }
        }
      }

      return features;
    },
    dragStart(){
      this.isDragging = true
    },
    dragEnd(){
      this.isDragging = false
    },
    mouseoutMap(){
      this.isDragging = false;
      this.isRotating = false;
    },
    rotateStart(){
      this.isRotating = true;
    },
    rotateEnd(){
      this.isRotating = false;
    },
    unBindEvents() {
      if(this.parentInstance){
        const map = this.getMap();
        map.off('click', this.clickMap);
        map.off('rightclick', this.rightclickMap);
        map.off('mousemove', this.mouseMoveMap);
        map.off('dragstart', this.dragStart);
        map.off('dragend', this.dragEnd);
        map.off('rotatestart', this.rotateStart);
        map.off('rotateend', this.rotateEnd);
        map.off('mouseout', this.mouseoutMap)
      }
    },
    destroyComponent() {
      this.unBindEvents();
      this.$amapComponent.destroy();
    },
    getMap() {
      return this.$parentComponent;
    }
  }
});
</script>
