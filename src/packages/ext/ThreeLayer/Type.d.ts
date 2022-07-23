export interface LightOption {
  type: string
  args: any[]
  position?: {
    x: number
    y: number
    z: number
  }
  lookAt?: {
    x: number
    y: number
    z: number
  }

}

export interface HDROptions {
  urls: string[]
  path: string
  exposure: number
}
