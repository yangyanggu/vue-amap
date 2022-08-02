import type{Vector3, Color} from 'three'

export interface CircleOptions {
  center?: Vector3
  innerRadius?: number
  outerRadius?: number
  fillType?: number
  fillColor?: Color
}
