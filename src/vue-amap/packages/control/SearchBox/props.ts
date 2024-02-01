import {buildProps} from "../../../utils/buildHelper";

export const propsTypes = buildProps({
  type: {
    type: String
  },//输入提示时限定POI类型，多个类型用“|”分隔，目前只支持Poi类型编码如“050000” 默认值：所有类别
  city: {
    type: String
  },//输入提示时限定城市。可选值：城市名（中文或中文全拼）、citycode、adcode；默认值：“全国”
  datatype: {
    type: String
  },//返回的数据类型。可选值：all-返回所有数据类型、poi-返回POI数据类型、bus-返回公交站点数据类型、busline-返回公交线路数据类型目前暂时不支持多种类型
  citylimit: {
    type: Boolean,
    default: false
  },//返回的数据类型。可选值：all-返回所有数据类型、poi-返回POI数据类型、bus-返回公交站点数据类型、busline-返回公交线路数据类型目前暂时不支持多种类型
  inputId: {
    type: String
  },//输入框的ID
  inputCustom: {
    type: Boolean,
    default: false
  }, //是否自定义input，自定义的时候将使用用户的inputId
  outputId: {
    type: String
  },//可选参数，指定一个现有的div的id或者元素，作为展示提示结果的容器，当指定了input的时候有效，缺省的时候将自动创建一个显示结果面板
  outPutDirAuto: {
    type: Boolean,
    default: true
  },//默认为true，表示是否在input位于页面较下方的时候自动将输入面板显示在input上方以避免被遮挡
  closeResultOnScroll: {
    type: Boolean,
    default: true
  },//页面滚动时关闭搜索结果列表，默认 true
  lang: {
    type: String
  },//设置检索语言类型，默认中文 'zh_cn'
  placeholder: {
    type: String
  },
  debounce: {
    type: Number,
    default: 100
  } // 手动复写增加防抖
});