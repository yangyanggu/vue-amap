import {Group, Shape, ExtrudeGeometry, MeshLambertMaterial, Mesh, TextureLoader, DoubleSide, RepeatWrapping } from 'three';
import {getRgbNumber, getAlpha} from "../../../utils/colorUtil";
import {clearGroup} from "../../../utils/threeUtil";
import type {Polygon} from "./Type";

interface Options {
  sideColor: string // 侧面颜色。缺省值为 '#ffffff'。
  sideTexture?: string
  topColor: string
  bottomColor: string
  height: number
  depthTest: boolean // 是否开启深度检测，深度检测的话会面会进行融合
  source: Polygon
}

interface Properties {
  height?: number
}

class ThreePolygon {
  object: any // Group
  layer: any // threejs的图层对象

  constructor(layer: any, options: Options) {
    this.layer = layer;
    this.object = new Group();
    this.layer.addObject(this.object);
    this.init(options);
  }

  init(options: Options) {
    options.source.features.forEach( feature => {
      if(feature.geometry.type === 'Polygon'){
        this.createMesh(feature.geometry.coordinates, feature.properties, options);
      }else if(feature.geometry.type === 'MultiPolygon'){
        feature.geometry.coordinates.forEach( cood => {
          this.createMesh(cood, feature.properties, options);
        })
      }
    })
    this.refresh();
  }

  createMesh(paths: number[][][], properties:Properties, options: Options ) {
    if(paths.length === 0){
      return
    }
    const height = properties.height !== undefined ? properties.height : options.height;
    const path = paths[0];
    const shape = new Shape();
    const firstPoint = this.convertLngLat(path[0]);
    shape.moveTo(firstPoint[0], firstPoint[1]);
    for(let i=1;i<path.length;i++){
      const point = this.convertLngLat(path[i]);
      shape.lineTo(point[0], point[1]);
    }
    const extrudeGeometry = new ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: false,
      steps: 1
    })
    const material = new MeshLambertMaterial({
      depthTest: options.depthTest,
      transparent: true,
      color: getRgbNumber(options.topColor),
      opacity: getAlpha(options.topColor)
    })
    const materialList = [material]
    if(height > 0){
      // 生成侧面
      let sideMaterial;
      if(options.sideTexture){
        const sideTexture = new TextureLoader().load(options.sideTexture);
        sideTexture.wrapS = sideTexture.wrapT = RepeatWrapping;
        sideTexture.offset.set(0, 0.5);
        sideTexture.repeat.set(0.01,0.01);
        sideMaterial = new MeshLambertMaterial({
          depthTest: options.depthTest,
          map: sideTexture,
          side: DoubleSide
        })
      }else{
        sideMaterial = new MeshLambertMaterial({
          depthTest: options.depthTest,
          transparent: true,
          color: getRgbNumber(options.sideColor),
          opacity: getAlpha(options.sideColor),
          side: DoubleSide
        })
      }
      materialList.push(sideMaterial);

      // 生成底面
      const bottomExtrudeGeometry = new ExtrudeGeometry(shape, {
        depth: 0
      })
      const bottomSideMaterial = new MeshLambertMaterial({
        depthTest: options.depthTest,
        transparent: true,
        color: getRgbNumber(options.bottomColor),
        opacity: getAlpha(options.bottomColor),
      })
      const bottomMesh = new Mesh(bottomExtrudeGeometry, bottomSideMaterial);
      this.object.add(bottomMesh);
    }
    const mesh = new Mesh(extrudeGeometry, materialList);
    this.object.add(mesh);
  }

  convertLngLat(lnglat: number[]) {
    return this.layer.convertLngLat(lnglat);
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

  remove(){
    if (this.object) {
      this.layer.removeObject(this.object)
    }
  }

  destroy() {
    if (this.object) {
      clearGroup(this.object);
      this.object = null;
      this.layer = null;
    }
  }
}

export default ThreePolygon
