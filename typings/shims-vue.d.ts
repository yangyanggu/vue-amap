export {}

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
    customCoordsCenter ?: any
    $text ?: any
    register: any,
    mapEntity: any,
    needInitComponents: any,
    addChildComponent: any
  }
}
