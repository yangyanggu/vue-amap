import {Group, VideoTexture, CanvasTexture, PlaneGeometry, MeshPhongMaterial, Mesh} from 'three';
import {clearGroup} from '../../../utils/threeUtil';
import type {MoveAnimation, Vec, Offset} from './Type'

interface Options {
  video: HTMLVideoElement //模型下载地址
  videoOffset: Offset // 视频X Y的偏移
  videoWidth: number // 视频宽度，默认为实际的视频宽度
  videoHeight: number // 视频高度，默认为实际的视频高度
  canvas: HTMLCanvasElement // 背景canvas图层
  position: number[] // 模型的经纬度
  height?: number  // 高度，模型的离地高度
  rotation?: Vec // 模型旋转角度
  scale: number | number[]  //模型缩放级别，可以整体缩放和按X Y Z缩放
  angle?: number //  模型旋转角度
  alwaysFront?: boolean  // 位置移动是否开启动画，开启后将会以参数中的duration进行插帧移动
}

class ThreeVideo {
  moveAnimation?: MoveAnimation;
  object: any // group对象
  animations: any // 模型的动画
  layer: any // threejs的图层对象
  video?: HTMLVideoElement
  group?: any
  canvasTexture?: any
  canvasFrame = -1

  constructor(layer: any) {
    this.layer = layer;
  }

  init(options: Options, $vue: any) {
    this.video = options.video;
    this.object = new Group();
    this.object.$vue = $vue;

    return new Promise<void>((resolve) => {
      this.video?.load()
      this.video?.addEventListener('canplaythrough', () => {
        this.video?.play();
        const texture = new VideoTexture( this.video );
        const geometry = new PlaneGeometry(this.video?.videoWidth, this.video?.videoHeight); //矩形平面
        const material = new MeshPhongMaterial({
          map: texture, // 设置纹理贴图
        }); //材质对象Material
        const mesh = new Mesh(geometry, material); //网格模型对象Mesh
        mesh.renderOrder = 1;
        this.object.add(mesh);
        this.object.lookAt({
          x: -1,
          y:0,
          z: 0
        })
        this.setPosition(options.position);
        this.setScale(options.scale);
        this.setHeight(options.height)
        this.addBgCanvas(options.canvas)
        this.layer.addObject(this.object);
        resolve()
      })

    })

  }

  addBgCanvas(canvas: HTMLCanvasElement){
    if(!canvas){
      return
    }
    const texture = new CanvasTexture( canvas );
    const geometry = new PlaneGeometry(canvas.width, canvas.height); //矩形平面
    const material = new MeshPhongMaterial({
      map: texture, // 设置纹理贴图
    }); //材质对象Material
    const mesh = new Mesh(geometry, material); //网格模型对象Mesh
    mesh.renderOrder = 0;
    this.object.add(mesh);
    this.canvasTexture = texture;
  }

  canvasTextureAnimate(){
    this.canvasFrame = requestAnimationFrame(() => {
      this.canvasTextureAnimate();
    })
    this.canvasTexture.needsUpdate = true;
    this.refresh()
  }

  cancelCanvasTextureAnimate(){
    if(this.canvasFrame > 0) {
      cancelAnimationFrame(this.canvasFrame);
    }
  }

  setScale(scale: number | number[]) {
    let scaleArray: number[];
    if (typeof scale === 'number') {
      scaleArray = [scale, scale, scale];
    } else {
      scaleArray = scale;
    }
    this.object.scale.set(...scaleArray);
  }

  setPosition(position) {
    const positionConvert = this.layer.convertLngLat(position);
    this.object.position.setX(positionConvert);
    this.object.position.setY(positionConvert);
    this.refresh();
  }


  setHeight(height) {
    if (height !== undefined) {
      this.object.position.setZ(height);
      this.refresh();
    }
  }

  refresh() {
    this.layer.setUpdate();
  }

  show() {
    this.object.visible = true;
    this.refresh();
  }

  hide() {
    this.object.visible = false;
    this.refresh();
  }

  start() {
    this.video?.play()
  }

  destroy() {
    this.cancelCanvasTextureAnimate();
    if (this.object) {
      this.object.$vue = null;
      clearGroup(this.object);
      this.object = null;
      this.layer = null;
    }
  }
}

export default ThreeVideo
