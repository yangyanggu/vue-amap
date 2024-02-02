import {buildProps} from "../../../utils/buildHelper";
import type {PropType} from "vue";

export interface MarkerMoveOptions {
  duration?: number
  easing?: (passedTime: number) => number
  autoRotation?: boolean
}

export const propsTypes = buildProps({
  position: {
    type: [Array, Object],
    required: true
  }, // 点标记在地图上显示的位置
  icon: {
    type: [String, Object]
  }, // 在点标记中显示的图标。可以传一个图标地址，也可以传Icon对象。有合法的content内容设置时，此属性无效。
  content: {
    type: [String, typeof HTMLElement === 'undefined' ? Object: HTMLElement]
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
  extData: null,
  moveOptions: {
    type: Object as PropType<MarkerMoveOptions>,
    default: () => null
  }
});