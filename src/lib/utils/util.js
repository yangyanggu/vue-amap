/**
 * 判断对象是不是map实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isMapInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance.className === 'AMap.Map' || instance.CLASS_NAME === 'AMap.Map';
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
  return instance.className === 'Overlay.OverlayGroup' || instance.CLASS_NAME === 'Overlay.OverlayGroup';
}

/**
 * 判断对象是不是IndoorMap实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isIndoorMapInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance.className === 'AMap.IndoorMap' || instance.CLASS_NAME === 'AMap.IndoorMap';
}

/**
 * 判断对象是不是LabelsLayer实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isLabelsLayerInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance.className === 'AMap.LabelsLayer' || instance.CLASS_NAME === 'AMap.LabelsLayer';
}

/**
 * 判断对象是不是VectorLayer实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isVectorLayerInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance.CLASS_NAME === 'AMap.VectorLayer' || instance.CLASS_NAME === 'AMap.VectorLayer';
}
