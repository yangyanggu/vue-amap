import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties{
    $amapComponent ?: any,
    $parentComponent ?: any
    renderer ?: any,
    camera ?: any,
    scene ?: any,
    customCoords ?: any
  }
}
