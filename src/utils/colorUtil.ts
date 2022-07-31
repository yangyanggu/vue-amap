import Color from 'color'

/**
 * 获取16进制颜色
 * @param color
 */
export function getRgbNumber(color: string){
  return Color(color).rgbNumber();
}

/**
 * 获取颜色的透明度
 * @param color
 */
export function getAlpha(color: string){
  return Color(color).alpha();
}
