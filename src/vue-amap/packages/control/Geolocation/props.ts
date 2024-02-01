import {buildProps} from "../../../utils/buildHelper";
import type {PropType} from "vue";

export const propsType = buildProps({
  //悬停位置，默认为"RB"，即右下角.'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
  position: {
    type: String as PropType<'LT'|'RT'|'LB'|'RB'>
  },
  //缩略图距离悬停位置的像素距离，如 [2,2]
  offset: {
    type: Array
  },
  //按钮边框颜色值，同CSS，如'silver'
  borderColor: {
    type: String
  },
  borderRadius: {
    type: String
  },//按钮圆角边框值，同CSS，如'5px'
  buttonSize: {
    type: String
  },//箭头按钮的像素尺寸，同CSS，如'12px'
  convert: {
    type: Boolean,
    default: true
  },//是否将定位结果转换为高德坐标
  enableHighAccuracy: {
    type: Boolean,
    default: false
  },//进行浏览器原生定位的时候是否尝试获取较高精度，可能影响定位效率，默认为false
  timeout: {
    type: Number
  },//定位的超时时间，毫秒
  maximumAge: {
    type: Number
  },//浏览器原生定位的缓存时间，毫秒
  showButton: {
    type: Boolean,
    default: true
  },//是否显示定位按钮，默认为true
  showCircle: {
    type: Boolean,
    default: true
  },//是否显示定位精度圆，默认为true
  showMarker: {
    type: Boolean,
    default: true
  },//是否显示定位点，默认为true
  markerOptions: {
    type: Object
  },//定位点的样式
  circleOptions: {
    type: Object
  },//CircleOptions
  panToLocation: {
    type: Boolean,
    default: true
  },//定位成功后是否自动移动到响应位置
  zoomToAccuracy: {
    type: Boolean,
    default: true
  },//定位成功后是否自动调整级别
  GeoLocationFirst: {
    type: Boolean,
    default: true
  },//优先使用H5定位，默认false
  noIpLocate: {
    type: Number
  },//是否禁用IP精确定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用
  noGeoLocation: {
    type: Number
  },//是否禁用浏览器原生定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用
  useNative: {
    type: Boolean,
    default: false
  },//是否与高德定位SDK能力结合，需要同时使用安卓版高德定位sdk，否则无效
  getCityWhenFail: {
    type: Boolean,
    default: false
  },//定位失败之后是否返回基本城市定位信息
  needAddress: {
    type: Boolean,
    default: false
  },//是否需要将定位结果进行逆地理编码操作
  extensions: {
    type: String as PropType<'base' | 'all'>,
    validator: (value : string): boolean => {
      // 这个值必须匹配下列字符串中的一个
      return ['base', 'all'].indexOf(value) !== -1;
    }
  },//是否需要详细的逆地理编码信息，默认为'base'只返回基本信息，可选'all'
});