import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

class ThreeRenderPass extends RenderPass {
	constructor( scene, camera, overrideMaterial, clearColor, clearAlpha ){
		super(scene, camera, overrideMaterial, clearColor, clearAlpha)
		this.clear = false;
	}
	setCamera(camera) {
		this.camera = camera;
	}

}

export { ThreeRenderPass };
