<template>
  <div style="display: none;">
    <div ref="content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';
import {isMapInstance, isOverlayGroupInstance} from '../../../utils/util';

export default defineComponent({
  name: 'ElAmapMarker',
  mixins: [registerMixin],
  props: {
    position: {
      type: [Array, Object],
      required: true
    }, // 点标记在地图上显示的位置
    icon: {
      type: [String, Object]
    }, // 在点标记中显示的图标。可以传一个图标地址，也可以传Icon对象。有合法的content内容设置时，此属性无效。
    content: {
      type: [String, HTMLElement]
    }, // 点标记显示内容。可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖。
    title: {
      type: String
    }, // 鼠标滑过点标记时的文字提示。不设置则鼠标滑过点标无文字提示。
    offset: {
      type: [Array, Object]
    }, // 点标记显示位置偏移量，默认值为 [0,0] 。Marker指定position后，默认以marker左上角位置为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
    anchor: {
      type: [String, Array]
    }, // 设置点标记锚点，可选值：'top-left','top-center','top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'
    angle: {
      type: Number
    }, // 点标记的旋转角度，，广泛用于改变车辆行驶方向。默认值：0
    clickable: {
      type: Boolean,
      default: true
    }, // 点标记是否可点击，默认值: true
    draggable: {
      type: Boolean,
      default: false
    }, // 设置点标记是否可拖拽移动，默认值：false
    bubble: {
      type: Boolean,
      default: false
    }, // 事件是否冒泡，默认为 false
    zooms: {
      type: Array
    }, // 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
    cursor: {
      type: String
    }, // 指定鼠标悬停时的鼠，默认值：'pointer'
    topWhenClick: {
      type: Boolean,
      default: false
    }, // 鼠标点击时marker是否置顶，默认false ，不置顶
    label: {
      type: Object
    }, // 添加文本标注
    extData: null
  },
  emits: ['update:position'],
  data() {
    return {
      withSlot: false,
      converters: {
      },
    };
  },
  /*updated() {
    if(this.withSlot && this.$amapComponent){
      this.$amapComponent.setContent(this.$refs.content);
    }
  },*/
  methods: {
    __initComponent(options) {
      if (this.$slots.default && this.$slots.default().length > 0) {
        this.withSlot = true;
        options.content = this.getSlotContent();
      }
      this.$amapComponent = new AMap.Marker(options);
      if (isMapInstance(this.$parentComponent)) {
        this.$parentComponent.add(this.$amapComponent);
      } else if (isOverlayGroupInstance(this.$parentComponent)) {
        this.$parentComponent.addOverlay(this.$amapComponent);
      }
      if(this.withSlot){
        // 观察器的配置（需要观察什么变动）
        const config = { attributes: true, childList: true, subtree: true };
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(() => {
          this.$amapComponent.setContent(this.getSlotContent());
        });
        observer.observe(this.$refs.content as Node, config);
        this.observer = observer;
      }
      this.bindModelEvents();
    },
    getSlotContent(){
      return (this.$refs.content as HTMLDivElement).cloneNode(true);
    },
    bindModelEvents(){
      this.$amapComponent.on('dragend',() => {
        this.emitPosition();
      });
      this.$amapComponent.on('touchend',() => {
        this.emitPosition();
      });
    },
    emitPosition(){
      const position = this.$amapComponent.getPosition();
      this.$emit('update:position', position.toArray());
    },
    destroyComponent() {
      if(this.observer){
        this.observer.disconnect();
        this.observer = null;
      }
      this.$amapComponent.setMap(null);
      /*if (isMapInstance(this.$parentComponent)) {
        this.$amapComponent.setMap(null);
        // this.$parentComponent.remove(this.$amapComponent);
      } else if (isOverlayGroupInstance(this.$parentComponent)) {
        this.$parentComponent.removeOverlay(this.$amapComponent);
      }*/
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  }
});
</script>
