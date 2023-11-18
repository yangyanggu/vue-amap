interface VideoOption {
  url: string
  zooms: number[]
  bounds: any
  opacity: number
  loop: boolean
}

class VideoLayer {

  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  video: HTMLVideoElement | null;
  layer: any;
  canPlay = false;
  frame = -1;

  constructor(options: VideoOption, video: HTMLVideoElement) {
    const canvas = document.createElement('canvas');
    this.video = video;
    video.src = options.url;
    video.autoplay = true;
    video.muted = true;
    video.crossOrigin= "anonymous";
    video.loop = options.loop;
    const layerOptions = {
      ...options,
      canvas
    }
    this.canvas = canvas;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.layer = new AMap.CanvasLayer(layerOptions);
    this.initVideoEvents();
    this.load();
  }

  getLayer() {
    return this.layer;
  }

  initVideoEvents() {
    this.video?.addEventListener('canplaythrough', () => {
      if (this.canvas) {
        this.canvas.width = this.video?.videoWidth as number;
        this.canvas.height = this.video?.videoHeight as number;
      }
      this.canPlay = true;
      this.play();
    })
  }

  load() {
    this.video?.load()
  }

  play() {
    if (this.canPlay) {
      this.video?.play();
      this.stopRender()
      this.render()
    }
  }

  pause() {
    this.stopRender();
    this.video?.pause();
  }

  stopRender() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }

  render() {
    this.frame = window.requestAnimationFrame(() => {
      this.render()
    })
    if (this.video?.paused) {
      this.video?.play();
    } else {
      this.context?.clearRect(0, 0, this.canvas?.width as number, this.canvas?.height as number)
      this.context?.drawImage(this.video as any, 0, 0, this.canvas?.width as number, this.canvas?.height as number)  //绘制视频
      this.layer.reFresh();
    }
  }

  destroy() {
    this.stopRender();
    if (this.video) {
      this.video.pause();
    }
    this.video = null;
  }

  setUrl(url: string) {
    this.stopRender();
    this.canPlay = false;
    if (this.video) {
      this.video.src = url;
      this.load()
    }
  }

  setZooms(zooms) {
    this.getLayer().setZoom(zooms);
  }

  setOpacity(opacity) {
    this.getLayer().setOpacity(opacity);
  }

  setBounds(bounds) {
    this.getLayer().setBounds(bounds);
  }

  setzIndex(zIndex) {
    this.getLayer().setzIndex(zIndex);
  }

  show() {
    this.getLayer().show();
  }

  hide() {
    this.getLayer().hide();
  }
}

export default VideoLayer
