<script>
import registerMixin from '../../mixins/register-component';
import Vue from 'vue';
import {isMapInstance, isOverlayGroupInstance} from '../../utils/util';

const TAG = 'el-amap-marker';

export default {
  name: TAG,
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
    visible: {
      type: Boolean,
      default: true
    }, // 点标记是否可见，默认值：true
    zIndex: {
      type: Number
    }, // 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
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
      type: Boolean
    }, // 点标记是否可点击，默认值: true
    draggable: {
      type: Boolean
    }, // 设置点标记是否可拖拽移动，默认值：false
    bubble: {
      type: Boolean
    }, // 事件是否冒泡，默认为 false
    zooms: {
      type: Array
    }, // 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
    cursor: {
      type: String
    }, // 指定鼠标悬停时的鼠，默认值：'pointer'
    topWhenClick: {
      type: Boolean
    }, // 鼠标点击时marker是否置顶，默认false ，不置顶
    label: {
      type: Object
    }, // 添加文本标注
    extData: null
  },
  data() {
    return {
      $tagName: TAG,
      withSlots: false,
      tmpVM: null,
      converters: {
      },
      handlers: {
        zIndex(index) {
          this.setzIndex(index);
        },
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },
  created() {
    this.tmpVM = new Vue({
      data() {
        return {node: ''};
      },
      render(h) {
        const {node} = this;
        return h('div', {ref: 'node'}, Array.isArray(node) ? node : [node]);
      }
    }).$mount();
  },
  methods: {
    __initComponent(options) {
      if (this.$slots.default && this.$slots.default.length) {
        options.content = this.tmpVM.$refs.node;
      }
      this.$amapComponent = new AMap.Marker(options);
      if (isMapInstance(this.$parentComponent)) {
        this.$parentComponent.add(this.$amapComponent);
      } else if (isOverlayGroupInstance(this.$parentComponent)) {
        this.$parentComponent.addOverlay(this.$amapComponent);
      }
    },
    destroyComponent() {
      if (isMapInstance(this.$parentComponent)) {
        this.$parentComponent.remove(this.$amapComponent);
      } else if (isOverlayGroupInstance(this.$parentComponent)) {
        this.$parentComponent.removeOverlay(this.$amapComponent);
      }
      this.$amapComponent = null;
    }
  },
  render() {
    const slots = this.$slots.default || [];
    if (slots.length) {
      this.withSlots = true;
      this.tmpVM.node = slots;
    }
    return null;
  },
  destroyed() {
    this.tmpVM.$destroy();
    if (this.$customContent && this.$customContent.$destroy) {
      this.$customContent.$destroy();
    }
  }
};
</script>
