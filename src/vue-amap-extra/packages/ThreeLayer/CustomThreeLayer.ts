import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  PointLight,
  RectAreaLight,
  SpotLight,
  PMREMGenerator,
  sRGBEncoding,
  LinearFilter,
  Vector2,
  AxesHelper,
  Raycaster,
  Clock
} from 'three';
import {merge, bind} from "lodash-es";
import {HDRCubeTextureLoader} from "three/examples/jsm/loaders/HDRCubeTextureLoader.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {ThreeLayer} from '@vuemap/three-layer'
import type { Texture, Camera,
  WebGLRenderer,
  Scene, Object3D
} from 'three';
import type {HDROptions, LightOption} from "./Type";
import type {ThreeLayerOptions} from '@vuemap/three-layer'

interface Options extends ThreeLayerOptions{
  lights?: LightOption[] // 灯光数组
  hdr?: HDROptions // 开启HDR配置
  axesHelper: boolean // 是否开启箭头，用于debug，默认不开启
}

class CustomThreeLayer extends ThreeLayer{

  lightTypes = {
    AmbientLight, // 环境光  环境光会均匀的照亮场景中的所有物体
    DirectionalLight, // 平行光  平行光是沿着特定方向发射的光
    HemisphereLight, // 半球光  光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
    PointLight, // 点光源  从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
    RectAreaLight, // 平面光光源  平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源
    SpotLight // 聚光灯  光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
  }
  raycaster: Raycaster | undefined // 射线，用于判断点击或者鼠标移动是否碰到物体
  mouse: Vector2;
  envMap: any; // HDR的环境贴图
  clickFun: any;
  hoverFun: any;
  resizeFun: any;
  effectComposer?: EffectComposer;
  renderPass: any
  passNum = 0
  passList = [] as any[]
  clock = new Clock()
  preHoverGroup = null as Object3D | null;

  constructor(map: any, options: Options, callback: () => void) {
    options.onInit = (render,scene) => {
      this.raycaster = new Raycaster();
      if(options.axesHelper){
        const axesHelper = new AxesHelper( 10000 );
        scene.add( axesHelper );
      }
      this.renderer?.setPixelRatio(window.devicePixelRatio);
      this.createEffect();
      this.createLights(options.lights || []);
      this.createHDR(options.hdr);
      this.bindEvents();
      if(callback){
        callback()
      }
    }
    options.onRender = (render, scene, camera) => {
      if(this.passNum > 0){
        this.effectComposer?.render(this.clock.getDelta())
      }else{
        this.renderer?.render(this.scene as Scene, camera as Camera);
      }
    }
    super(map, options)
    this.mouse = new Vector2();
  }

  updateEffectComposerSize() {
    if(this.effectComposer && this.renderer){
      const size = this.renderer.getSize( new Vector2() );
      this.effectComposer.setSize( size.x , size.y);
    }
  }

  createEffect() {
    const size = this.renderer?.getSize( new Vector2() );
    this.effectComposer = new EffectComposer( this.renderer as WebGLRenderer );
    this.effectComposer.setSize( size?.x as number, size?.y as number);

    // const renderPass = new ThreeRenderPass( this.scene, this.camera );
    // this.renderPass = renderPass;
    // this.effectComposer.addPass(renderPass);
  }

  addPass(pass: any){
    this.effectComposer?.addPass(pass);
    this.passNum++;
    this.passList.push(pass);
  }

  removePass(pass: any){
    const index = this.passList.indexOf( pass );
    if ( index !== - 1 ) {
      this.passList.splice( index, 1 );
    }
    this.effectComposer?.removePass(pass);
    this.passNum--;
  }

  createLights(lights: LightOption[] | undefined) {
    const defaultLightOptions = {
      type: 'DirectionalLight', // 灯光类型， 可选值见下面的字典
      args: [] // 灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
    };
    if (lights && lights.length > 0) {
      lights.forEach(lightOptions => {
        lightOptions = merge({}, defaultLightOptions, lightOptions) as LightOption;
        if (this.lightTypes[lightOptions.type]) {
          const light = new this.lightTypes[lightOptions.type](...lightOptions.args);
          const position = lightOptions.position;
          const lookAt = lightOptions.lookAt;
          if (position) {
            light.position.set(position.x, position.y, position.z);
          }
          if (lookAt) {
            light.lookAt(lookAt.x, lookAt.y, lookAt.z);
          }
          this.add(light);
        } else {
          console.warn('当前设置的灯光类型不存在');
        }
      });
    }
  }

  createHDR(hdr: HDROptions | undefined) {
    if (!hdr) {
      return;
    }
    const options = merge({}, {
      urls: [], // HDR贴图下载地址，需要6个文件，代表6个方向
      path: '/', // HDR下载地址的路径前缀
      // roughness: 0.0,
      exposure: 1.0 // 光亮程度
    }, hdr);
    const render = this.renderer as WebGLRenderer;
    render.physicallyCorrectLights = true;
    render.outputEncoding = sRGBEncoding;
    render.toneMappingExposure = options.exposure;
    const hdrUrls = options.urls;
    let pmremGenerator: PMREMGenerator = new PMREMGenerator(render);
    pmremGenerator.compileCubemapShader();
    const hdrCubeMap = new HDRCubeTextureLoader()
      .setPath(options.path)
      .load(hdrUrls, () => {
        const hdrCubeRenderTarget = pmremGenerator.fromCubemap(hdrCubeMap);
        hdrCubeMap.magFilter = LinearFilter;
        hdrCubeMap.needsUpdate = true;
        this.envMap = hdrCubeRenderTarget ? hdrCubeRenderTarget.texture : null;
        this.addEnvMap(this.scene);
        pmremGenerator.dispose();
        pmremGenerator = null as any;
        this.refreshMap();
      }) as any;
  }

  addEnvMap(object) {
    this.scene!.environment = this.envMap as Texture;
    /*const envMap = this.envMap;
    if (!envMap || !object) {
      return;
    }
    if (object.material && envMap) {
      object.material.envMap = envMap;
      // object.material.roughness = 0;
      object.material.needsUpdate = true;
    }
    if (object.children && object.children.length > 0) {
      object.children.forEach(o => {
        this.addEnvMap(o);
      });
    }*/
  }

  bindEvents() {
    this.clickFun = bind(this._clickEvent, this);
    this.hoverFun = bind(this._hoverEvent, this);
    this.resizeFun = bind(this.updateEffectComposerSize, this);
    if(this.canvas){
      this.canvas.addEventListener('click', this.clickFun, false);
      this.canvas.addEventListener('mousemove', this.hoverFun, false);
    }else{
      this.map.on('click', this.clickFun);
      this.map.on('mousemove', this.hoverFun);
    }
    this.map.on('resize', this.resizeFun);
  }

  ubBindEvents() {
    this.map.off('click', this.clickFun);
    this.map.off('mousemove', this.hoverFun);
    this.map.on('off', this.resizeFun);
  }

  _getOriginEvent(e: any) {
    if(e.originEvent){
      return e.originEvent;
    }
    return e;
  }

  _clickEvent(e: any) {
    e = this._getOriginEvent(e);
    const group = this._intersectGltf(e);
    if (group) {
      if(group.userData.$vue){
        group.userData.$vue.$emit('click', group);
      }
      this.emit('click', group);
    }
  }

  _hoverEvent(e: any) {
    e = this._getOriginEvent(e);
    const group = this._intersectGltf(e);
    if (group) {
      if (!group.userData.isHover) {
        group.userData.isHover = true;
        if(group.userData.$vue){
          group.userData.$vue.$emit('mouseover', group);
        }else{
          this.emit('mouseover', group);
        }
      }
    }
    if(this.preHoverGroup){
      if(!group || this.preHoverGroup.uuid !== group.uuid){
        if(this.preHoverGroup.userData.$vue){
          this.preHoverGroup.userData.$vue.$emit('mouseout', this.preHoverGroup);
        }else{
          this.emit('mouseout', this.preHoverGroup);
        }
        this.preHoverGroup.userData.isHover = false;
      }
    }
    this.preHoverGroup = group;
  }

  _intersectGltf(e: MouseEvent): Object3D | null {
    const client = this.map.getContainer();
    // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
    const getBoundingClientRect = client.getBoundingClientRect();

    // window.pageYOffset 鼠标滚动的距离
    // clientTop 一个元素顶部边框的宽度
    const offsetTop = getBoundingClientRect.top + window.pageYOffset - client.clientTop;
    const offsetLeft = getBoundingClientRect.left + window.pageXOffset - client.clientLeft;
    this.mouse.x = ((e.x + window.pageXOffset - offsetLeft) / getBoundingClientRect.width) * 2 - 1;
    this.mouse.y = -((e.y + window.pageYOffset - offsetTop) / getBoundingClientRect.height) * 2 + 1;
    const camera = this.camera;
    this.raycaster?.setFromCamera(this.mouse, camera as Camera);
    const intersects = this.raycaster?.intersectObjects([this.scene as Scene], true);
    const length = intersects?.length;
    if (length && length > 0) {
      let group: Object3D | null = null;
      for (let i = 0; i < length; i++) {
        const object = intersects[i];
        group = this._getGroup(object.object);
        if (group !== null) {
          break;
        }
      }
      return group;
    }
    return null;
  }

  _getGroup(object: Object3D): Object3D | null {
    if(!object){
      return null;
    }
    if (object.userData.acceptEvent) {
      return object;
    }
    return this._getGroup(object.parent as Object3D);
  }

  destroy() {
    this.ubBindEvents();
    if (this.envMap) {
      this.envMap.dispose();
      this.envMap = null;
    }
    super.destroy();
    this.lightTypes = null as any;
    this.raycaster = undefined;
    // this.mouse = undefined;
  }


}

export default CustomThreeLayer
