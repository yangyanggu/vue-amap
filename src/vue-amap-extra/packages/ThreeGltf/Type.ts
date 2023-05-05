import type {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export interface Vec {
  x: number
  y: number
  z: number
}

export interface MoveAnimation {
  duration?: number
  smooth: boolean
}

export  type ConfigLoader = (loader: GLTFLoader) => void
