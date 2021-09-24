/**
 * 判断对象是不是map实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isMapInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance.className === 'AMap.Map';
}

/**
 * 判断对象是不是OverlayGroup实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isOverlayGroupInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance.className === 'Overlay.OverlayGroup';
}
