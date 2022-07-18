// eslint-disable-next-line
import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties{
    $amapComponent ?: any,
    $parentComponent ?: any
    renderer ?: any,
    camera ?: any,
    scene ?: any,
    customCoords ?: any
    parentInstance ?: any
    source ?: any
    lights ?: any
    hdr ?: any
    observer ?: MutationObserver | null
  }
}
