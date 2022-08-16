export interface Vec {
  x: number
  y: number
  z: number
}

interface PolygonFeature {
  type: string
  geometry: {
    type: string,
    coordinates: any []
  }
  properties?: {
    [key: string]: any
  }
}

export interface Polygon {
  type: string
  features: PolygonFeature[]
  properties?: any
  [key: string]: any
}

export interface MoveAnimation {
  duration?: number
  smooth: boolean
}
