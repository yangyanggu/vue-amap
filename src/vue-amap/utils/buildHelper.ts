import type {ComponentObjectPropsOptions, PropType} from "vue";

export type IPropData = Record<string, unknown>
export interface IPropOptions<T = any> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: any;
  validator?(value: unknown, props: IPropData): boolean;
}
export interface ICommonProps extends ComponentObjectPropsOptions{
  // 是否显隐
  visible: IPropOptions<boolean>
  // 层级
  zIndex: IPropOptions<number>
  // 是否在更新组件后重新注册事件
  reEventWhenUpdate: IPropOptions<boolean>
  // 额外参数，用于在初始化组件时提供prop中未定义的属性
  extraOptions: IPropOptions,
}
export interface ILocaProps extends ComponentObjectPropsOptions{
  // 
  sourceUrl: IPropOptions<string>
  // 
  sourceData: IPropOptions<object>
  // 
  geoBufferSource: IPropOptions
  // 
  layerStyle: IPropOptions<object>
  defaultStyleValue: IPropOptions<object>
  zooms: IPropOptions<object>
  opacity: IPropOptions<number>
  initEvents: IPropOptions<boolean>
  visibleDuration: IPropOptions<number>
  onClick:  IPropOptions<(e: any) => void>
  onMousemove:  IPropOptions<(e: any) => void>
  onRightclick:  IPropOptions<(e: any) => void>
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