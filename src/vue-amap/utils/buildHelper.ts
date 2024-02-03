import type {ComponentObjectPropsOptions, PropType} from "vue";

export type IPropData = Record<string, unknown>
export interface IPropOptions<T = any> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: any;
  validator?(value: unknown, props: IPropData): boolean;
}
export interface ICommonProps{
  // 是否显隐
  visible: IPropOptions<boolean>
  // 层级
  zIndex: IPropOptions<number>
  // 是否在更新组件后重新注册事件
  reEventWhenUpdate: IPropOptions<boolean>
  // 额外参数，用于在初始化组件时提供prop中未定义的属性
  extraOptions: IPropOptions,
}

export const commonProps: ICommonProps = {
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
export const buildProps = <Props extends ComponentObjectPropsOptions >(props: Props): Props & {
  [K  in keyof ICommonProps]: ICommonProps[K]
} => {
  return Object.assign({}, commonProps, props);
};
