import {buildProps} from "../../../utils/buildHelper";
import type {PropType} from "vue";

export const propsTypes = buildProps({
  isCustom: {
    type: Boolean,
    default: false
  }, // 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
  autoMove: {
    type: Boolean,
    default: true
  }, // 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
  avoid: {
    type: Array
  }, // autoMove 为 true 时，自动平移到视野内后的上右下左的避让宽度。默认值： [20, 20, 20, 20]
  closeWhenClickMap: {
    type: Boolean,
    default: false
  }, // 点标记显示位置偏移量，默认值为 [0,0] 。Marker指定position后，默认以marker左上角位置为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
  content: {
    type: Object as PropType< string | HTMLDivElement>
  }, // 显示内容，可以是HTML要素字符串或者HTMLElement对象
  size: {
    type: Array
  }, // 信息窗体尺寸（isCustom为true时，该属性无效）
  anchor: {
    type: String
  }, // 信息窗体锚点。默认值：'bottom-center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
  offset: {
    type: Array
  }, // 信息窗体显示位置偏移量。默认基准点为信息窗体的底部中心。默认值: [0, 0]
  position: {
    type: Object as PropType<[number, number]>
  } // 信息窗体显示基点位置
});