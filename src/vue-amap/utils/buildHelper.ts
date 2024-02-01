import type {ComponentObjectPropsOptions, Prop, PropType} from "vue";
export interface ICommonProps extends ComponentObjectPropsOptions{
  // 是否显隐
  visible: Prop<boolean>
  // 层级
  zIndex: Prop<number>
  // 是否在更新组件后重新注册事件
  reEventWhenUpdate: Prop<boolean>
  // 额外参数，用于在初始化组件时提供prop中未定义的属性
  extraOptions: Prop<any>,
}
export interface ILocaProps extends ComponentObjectPropsOptions{
  // 
  sourceUrl: Prop<string>
  // 
  sourceData: Prop<object>
  // 
  geoBufferSource: Prop<any>
  // 
  layerStyle: Prop<object>
  defaultStyleValue: Prop<object>
  zooms: Prop<object>
  opacity: Prop<number>
  initEvents: Prop<boolean>
  visibleDuration: Prop<number>
  onClick:  Prop<(e: any) => void>
  onMousemove:  Prop<(e: any) => void>
  onRightclick:  Prop<(e: any) => void>
}

const commonProps: ICommonProps = {
  visible: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
  },
  reEventWhenUpdate: {
    type: Boolean,
    default: false
  },
  extraOptions: {
    type: Object
  },
};

/**
 * 合并生成基础的属性
 * @param props
 */
export const buildProps = <Props extends ComponentObjectPropsOptions = ComponentObjectPropsOptions>(props: Props): Props & ICommonProps => {
  return Object.assign({}, commonProps, props);
};

/**
 * 绑定Loca的属性
 * @param props
 */
export const buildLocaProps = <Props extends ComponentObjectPropsOptions>(props: Props) => {
  return Object.assign(commonProps, {
    sourceUrl: {
      type: String
    },
    sourceData: {
      type: Object
    },
    geoBufferSource: {
      type: [ArrayBuffer, String],
      default () {
        return null;
      }
    },
    layerStyle: {
      type: Object
    },
    defaultStyleValue: {
      type: Object,
      default () {
        return {};
      }
    },
    zooms: {
      type: Array
    },
    opacity: {
      type: Number
    },
    initEvents: {
      type: Boolean,
      default: true
    },
    visibleDuration: {
      type: Number,
      default: 0
    },
    onClick: {
      type: Function as PropType<(e: any) => void>,
      default: null
    },
    onMousemove: {
      type: Function as PropType<(e: any) => void>,
      default: null
    },
    onRightclick: {
      type: Function as PropType<(e: any) => void>,
      default: null
    },
  } as ILocaProps, props);
};