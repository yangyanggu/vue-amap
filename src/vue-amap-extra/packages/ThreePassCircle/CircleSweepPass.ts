import {
  Vector3,
  WebGLRenderTarget,
  Color,
  RGBAFormat,
  NearestFilter,
  DepthTexture,
  UnsignedShortType,
  ShaderMaterial,
  Vector2
} from 'three'
import {FullScreenQuad} from 'three/examples/jsm/postprocessing/Pass.js'
import type {
  Scene
} from 'three';

import type {CircleOptions} from "./Type";

/**
 * @author huaqing / https://github.com/2912401452/
 */
class CircleSweepPass {
  scene: Scene
  camera: any
  center: Vector3
  innerRadius = 0
  outerRadius = 0
  fillType = 1
  fillColor: Color
  depthTarget: WebGLRenderTarget
  renderer: any
  depthMaterial: ShaderMaterial
  fsQuad: FullScreenQuad
  topLeftVec: Vector3
  topRightVec: Vector3
  bottomLeftVec: Vector3
  bottomRightVec: Vector3
  width = 0
  height = 0

  constructor(renderer: any, scene: Scene, camera, options: CircleOptions) {
    console.log('renderer.extensions.has( \'WEBGL_depth_texture\' )', renderer.extensions.has( 'WEBGL_depth_texture' ))

    this.scene = scene;
    this.camera = camera;
    options = options ? options : {};
    this.center = options.center ? options.center : new Vector3( 0, 0, 0 );
    this.innerRadius = options.innerRadius ? options.innerRadius : 0;
    this.outerRadius = options.outerRadius ? options.outerRadius : 0;
    this.fillType = options.fillType ? options.fillType : 1; // pure: 0 - linear: 1
    this.fillColor = options.fillColor ? options.fillColor : new Color( 1, 1, 1 );

    this.depthTarget = new WebGLRenderTarget( window.innerWidth, window.innerHeight );
    this.depthTarget.texture.format = RGBAFormat;
    this.depthTarget.texture.minFilter = NearestFilter;
    this.depthTarget.texture.magFilter = NearestFilter;
    this.depthTarget.texture.generateMipmaps = false;
    this.depthTarget.stencilBuffer = false;
    this.depthTarget.depthBuffer = true;
    this.depthTarget.depthTexture = new DepthTexture();
    this.depthTarget.depthTexture.type = UnsignedShortType;

    this.calCameraVectors();

    const { topLeftVec, topRightVec, bottomLeftVec, bottomRightVec } = this.depthMaterial = this.getDepthMaterial();
    this.depthMaterial.uniforms[ 'topLeftVec' ].value = topLeftVec;
    this.depthMaterial.uniforms[ 'topRightVec' ].value = topRightVec;
    this.depthMaterial.uniforms[ 'bottomLeftVec' ].value = bottomLeftVec;
    this.depthMaterial.uniforms[ 'bottomRightVec' ].value = bottomRightVec;

    this.depthMaterial.uniforms[ 'fillColor' ].value = this.fillColor;

    this.fsQuad = new FullScreenQuad( this.depthMaterial );
  }

  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {

    this.depthMaterial.uniforms[ 'colorTexture' ].value = readBuffer.texture;

    const { topLeftVec, topRightVec, bottomLeftVec, bottomRightVec } = this.calCameraVectors();

    this.depthMaterial.uniforms[ 'cameraPos' ].value = this.camera.position;
    this.depthMaterial.uniforms[ 'topLeftVec' ].value = topLeftVec;
    this.depthMaterial.uniforms[ 'topRightVec' ].value = topRightVec;
    this.depthMaterial.uniforms[ 'bottomLeftVec' ].value = bottomLeftVec;
    this.depthMaterial.uniforms[ 'bottomRightVec' ].value = bottomRightVec;

    renderer.setRenderTarget( this.depthTarget );
    renderer.render( this.scene, this.camera );

    renderer.setRenderTarget( null );
    this.fsQuad.render( renderer );

  }

  calCameraVectors() {
    const camera = this.camera;
    const near = camera.near;
    const { fov, aspect } = camera;
    const h = Math.tan( this.ang2rad( fov / 2 ) ) * near;
    const w = h * aspect;

    // let forwardDir = (new Vector3(0, 0, 1).applyMatrix4(camera.matrixWorld)).sub(camera.position.clone()).normalize()
    // let rightDir = (new Vector3(1, 0, 0).applyMatrix4(camera.matrixWorld)).sub(camera.position.clone()).normalize()
    // let topDir = (new Vector3(0, 1, 0).applyMatrix4(camera.matrixWorld)).sub(camera.position.clone()).normalize()

    const forwardDir = ( new Vector3( 0, 0, 1 ).applyMatrix4( camera.matrixWorld.clone() ) );
    forwardDir.sub( camera.position.clone() );
    forwardDir.normalize();

    const rightDir = ( new Vector3( - 1, 0, 0 ).applyMatrix4( camera.matrixWorld.clone() ) );
    rightDir.sub( camera.position.clone() );
    rightDir.normalize();

    const topDir = ( new Vector3( 0, - 1, 0 ).applyMatrix4( camera.matrixWorld.clone() ) );
    topDir.sub( camera.position.clone() );
    topDir.normalize();


    const toRight = rightDir.multiplyScalar( w );
    const toTop = topDir.multiplyScalar( h );

    const topLeftVec = ( forwardDir.clone().multiplyScalar( near ) ).add( toTop.clone() ).sub( toRight.clone() );
    const scale = topLeftVec.length() / near;

    topLeftVec.normalize();
    topLeftVec.multiplyScalar( - scale );

    const topRightVec = ( forwardDir.clone().multiplyScalar( near ) ).add( toRight.clone() ).add( toTop.clone() );
    topRightVec.normalize();
    topRightVec.multiplyScalar( - scale );

    const bottomLeftVec = ( forwardDir.clone().multiplyScalar( near ) ).sub( toTop.clone() ).sub( toRight.clone() );
    bottomLeftVec.normalize();
    bottomLeftVec.multiplyScalar( - scale );

    const bottomRightVec = ( forwardDir.clone().multiplyScalar( near ) ).add( toRight.clone() ).sub( toTop.clone() );
    bottomRightVec.normalize();
    bottomRightVec.multiplyScalar( - scale );

    return { topLeftVec, topRightVec, bottomLeftVec, bottomRightVec };

  }

  ang2rad(ang) { // 角度变弧度
    return (ang * Math.PI) / 180;
  }

  getDepthMaterial() {
    return new ShaderMaterial( {
      uniforms: {
        'colorTexture': { value: null },
        'depthTexture': { value: this.depthTarget.depthTexture },
        'cameraFar': { value: this.camera.far },
        'cameraNear': { value: this.camera.near },
        'cameraPos': { value: this.camera.position.clone() },
        'topLeftVec': { value: this.topLeftVec },
        'topRightVec': { value: this.topRightVec },
        'bottomLeftVec': { value: this.bottomLeftVec },
        'bottomRightVec': { value: this.bottomRightVec },
        'center': { value: this.center },
        'innerRadius': { value: this.innerRadius },
        'outerRadius': { value: this.outerRadius },
        'fillType': { value: this.fillType },
        'fillColor': { value: this.fillColor }
      },
      transparent: true,
      vertexShader:
        `
                precision highp float;
                uniform vec3 topLeftVec;
                uniform vec3 topRightVec;
                uniform vec3 bottomLeftVec;
                uniform vec3 bottomRightVec;

                varying vec2 vUv;
                varying vec3 cameraVec;

                void main() {
                    vUv = uv;
                    if(uv.x < 0.5 && uv.y < 0.5) { // bottom left
                        cameraVec = bottomLeftVec;
                    }else if(uv.x < 0.5 && uv.y > 0.5) { // top left
                        cameraVec = topLeftVec;
                    }else if(uv.x > 0.5 && uv.y > 0.5) { // top right
                        cameraVec = topRightVec;
                    }else { // bottom right
                        cameraVec = bottomRightVec;
                    }

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader:
        `
                #include <packing>
                varying vec2 vUv;
                varying vec3 cameraVec;

                uniform float cameraFar;
                uniform float cameraNear;
                uniform vec3 cameraPos;
                uniform sampler2D colorTexture;
                uniform sampler2D depthTexture;

                uniform vec3 center;
                uniform float innerRadius;
                uniform float outerRadius;
                uniform int fillType;
                uniform vec3 fillColor;

                float readClipZ( sampler2D depthSampler, vec2 coord ) {
                    float fragCoordZ = texture2D( depthSampler, coord ).x;
                    return perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar ); // 返回相机空间的 viewZ（相对于相机空间的实际z）
                }

                void main() {
                    float clipZ = readClipZ( depthTexture, vUv );
										vec4 depthColor = texture2D( depthTexture, vUv);
                    vec4 diff = texture2D( colorTexture, vUv);
                    vec3 wP = cameraPos + (cameraVec)*abs(clipZ);

                    float dis = distance(wP, center);
                    float circleWidth = outerRadius - innerRadius;
                    if(dis < outerRadius && dis > innerRadius) {
												gl_FragColor = vec4(mix(diff.xyz, fillColor, 0.5), 1.0);
                    }else {
                        gl_FragColor = diff;
                    }
                    if(depthColor.r == 0.0){
                      gl_FragColor = vec4(1.0, 0,0.0, 1.0);
                    }else{
                      gl_FragColor = vec4(0, 1.0,0.0, 1.0);
                    }
                    //gl_FragColor = vec4(depthColor.r, 0.0,0.0, 1.0);
                }`
    } );
  }
  setSize( width, height ) {

    this.width = width;
    this.height = height;

    this.depthTarget.setSize( width, height );

  }
  setCamera(camera){
    this.camera = camera;
  }
}

export {CircleSweepPass}
