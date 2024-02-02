import {buildProps} from "../../../utils/buildHelper";
import type {PropType} from "vue";

export const propsTypes = buildProps({
  // polyline 路径，支持 lineString 和 MultiLineString
  path: {
    type: Array,
    required: true
  }, 
  // 是否将覆盖物的鼠标或touch等事件冒泡到地图上
  bubble: {
    type: Boolean,
    default: false
  }, 
  // 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
  cursor: {
    type: String
  }, 
  // 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
  strokeColor: {
    type: String
  }, 
  // 轮廓线透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明。默认为0.9
  strokeOpacity: {
    type: Number
  }, 
  // 轮廓线宽度。默认 2
  strokeWeight: {
    type: Number
  }, 
  // 描边线宽度
  borderWeight: {
    type: Number
  }, 
  // 是否显示描边,默认false
  isOutline: {
    type: Boolean,
    default: false
  }, 
  // 线条描边颜色，此项仅在isOutline为true时有效，默认：#00B2D5
  outlineColor: {
    type: String
  }, 
  // 设置多边形是否可拖拽移动，默认为false
  draggable: {
    type: Boolean,
    default: false
  }, 
  extData: {
    type: Object,
    default: () => null
  },
  // 轮廓线样式，实线:solid，虚线:dashed
  strokeStyle: {
    type: String as PropType<'solid' | 'dashed'>,
    validator: (value: string): boolean => {
      // 这个值必须匹配下列字符串中的一个
      return ['solid', 'dashed'].indexOf(value) !== -1;
    }
  }, 
  // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
  strokeDasharray: {
    type: Array
  }, 
  // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
  lineJoin: {
    type: String as PropType<'miter' | 'round' | 'bevel'>,
    validator: (value : string): boolean => {
      // 这个值必须匹配下列字符串中的一个
      return ['miter', 'round', 'bevel'].indexOf(value) !== -1;
    }
  }, 
  // 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
  lineCap: {
    type: String as PropType<'butt' | 'round' | 'square'>,
    validator: (value : string):boolean => {
      // 这个值必须匹配下列字符串中的一个
      return ['butt', 'round', 'square'].indexOf(value) !== -1;
    }
  },
  // 是否绘制成大地线，默认false
  geodesic: {
    type: Boolean,
    default: false
  }, 
  // 是否延路径显示白色方向箭头,默认false。建议折线宽度大于6时使用,
  showDir: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  editOptions: {
    type: Object
  }
});