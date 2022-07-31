export interface Vec {
  x: number
  y: number
  z: number
}

export interface Polygon {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": string,
        "coordinates": any []
      },
      "properties": {
        [key: string]: any
      }
    }
  ]
}

export interface MoveAnimation {
  duration?: number
  smooth: boolean
}
