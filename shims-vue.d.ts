export {}

declare module 'vue' {
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
    customCoordsCenter ?: any
  }
}
