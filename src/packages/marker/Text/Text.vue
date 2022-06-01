<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapText',
  mixins: [registerMixin],
  props: {
    position: {
      type: [Array, Object],
      required: true
    }, // 点标记在地图上显示的位置
    text: {
      type: String
    }, // 标记显示的文本内容
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
    }, // 点标记的旋转角度。默认值：0 。注：angle属性是使用CSS3来实现的，支持IE9及以上版本
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
    textStyle: {
      type: Object
    }, // 设置文本样式，Object同css样式表，如:{'background-color':'red'}
    extData: null
  },
  data() {
    return {
      propsRedirect: {
        textStyle: 'style'
      },
      converters: {
      },
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.Text(options);
      this.$parentComponent.add(this.$amapComponent);
    },
    destroyComponent() {
      this.$amapComponent.setMap(null);
      // this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  render() {
    return null;
  }
});
</script>
