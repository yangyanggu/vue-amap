export default [
  {
    text: '基础',
    children: [
      '/zh-cn/introduction/introduction.md',
      '/zh-cn/introduction/install.md',
      '/zh-cn/introduction/init.md',
      '/zh-cn/introduction/compatible.md',
      '/zh-cn/introduction/ssr.md',
      '/zh-cn/other/donation.md',
      '/zh-cn/introduction/faq.md',
      '/zh-cn/introduction/v1tov2.md',
      '/zh-cn/introduction/offline-jsapi.md',
    ],
  },
  {
    text: '自定义',
    children: [
      '/zh-cn/custom/custom-component.md',
      '/zh-cn/custom/folder-component.md'
    ]
  },
  {
    text: '地图',
    children: [
      '/zh-cn/base/amap.md',
      '/zh-cn/base/get-bmap-instance.md',
      '/zh-cn/base/plugin.md',
    ],
  },
  {
    text: 'hooks',
    children: [
      '/zh-cn/hooks/city-search.md',
      '/zh-cn/hooks/weather.md',
      '/zh-cn/hooks/geolocation.md',
    ],
  },
  {
    text: '控件',
    children: [
      '/zh-cn/component/control/scale.md',
      '/zh-cn/component/control/tool-bar.md',
      '/zh-cn/component/control/control-bar.md',
      '/zh-cn/component/control/map-type.md',
      '/zh-cn/component/control/hawk-eye.md',
      '/zh-cn/component/control/search-box.md',
      '/zh-cn/component/control/geolocation.md'
    ],
  },
  {
    text: '高德官方图层',
    children: [
      '/zh-cn/component/layer/official/default-layer.md',
      '/zh-cn/component/layer/official/tile-layer.md',
      '/zh-cn/component/layer/official/traffic.md',
      '/zh-cn/component/layer/official/satellite.md',
      '/zh-cn/component/layer/official/roadNet.md',
      '/zh-cn/component/layer/official/buildings.md',
      '/zh-cn/component/layer/official/district-layer.md',
      '/zh-cn/component/layer/official/indoor-map.md'
    ],
  },
  {
    text: '行业标准图层',
    children: [
      '/zh-cn/component/layer/standard/wms.md',
      '/zh-cn/component/layer/standard/wmts.md',
      '/zh-cn/component/layer/standard/mapbox-vector-tile-layer.md',
    ],
  },
  {
    text: '自有数据图层',
    children: [
      '/zh-cn/component/layer/data/vector.md',
      '/zh-cn/component/layer/data/heat-map.md',
      '/zh-cn/component/layer/data/labels.md',
      '/zh-cn/component/layer/data/custom.md',
      '/zh-cn/component/layer/data/flexible.md',
      '/zh-cn/component/layer/data/image.md',
      '/zh-cn/component/layer/data/canvas.md',
      '/zh-cn/component/layer/data/video.md',
      '/zh-cn/component/layer/data/gl-custom.md',
      '/zh-cn/component/layer/data/tiles3d.md',
      '/zh-cn/component/layer/data/district-cluster.md',
      '/zh-cn/component/layer/data/custom-xyz.md'
    ],
  },
  {
    text: '点标记',
    children: [
      '/zh-cn/component/marker/marker.md',
      '/zh-cn/component/marker/label-marker.md',
      '/zh-cn/component/marker/text.md',
      '/zh-cn/component/marker/elastic-marker.md',
      '/zh-cn/component/marker/marker-cluster.md',
      '/zh-cn/component/marker/mass-marks.md',
    ],
  },
  {
    text: '窗体',
    children: [
      '/zh-cn/component/infoWindow/info-window.md',
    ],
  },
  {
    text: '矢量图形',
    children: [
      '/zh-cn/component/vector/polygon.md',
      '/zh-cn/component/vector/polyline.md',
      '/zh-cn/component/vector/bezier-curve.md',
      '/zh-cn/component/vector/circle.md',
      '/zh-cn/component/vector/ellipse.md',
      '/zh-cn/component/vector/rectangle.md',
      '/zh-cn/component/vector/geojson.md',
    ],
  },
  {
    text: '工具',
    children: [
      '/zh-cn/component/util/mouse-tool.md',
    ],
  },
  {
    text: '@vuemap/vue-amap-loca组件',
    children: [
      '/zh-cn/component/loca/loca.md',
      '/zh-cn/component/loca/ambient-light.md',
      '/zh-cn/component/loca/directional-light.md',
      '/zh-cn/component/loca/point-light.md',
      '/zh-cn/component/loca/point-layer.md',
      '/zh-cn/component/loca/icon-layer.md',
      '/zh-cn/component/loca/prism-layer.md',
      '/zh-cn/component/loca/line-layer.md',
      '/zh-cn/component/loca/polygon-layer.md',
      '/zh-cn/component/loca/link-layer.md',
      '/zh-cn/component/loca/heatmap-layer.md',
      '/zh-cn/component/loca/hexagon-layer.md',
      '/zh-cn/component/loca/grid-layer.md',
      '/zh-cn/component/loca/scatter-layer.md',
      '/zh-cn/component/loca/pulse-line-layer.md',
      '/zh-cn/component/loca/pulse-link-layer.md',
      '/zh-cn/component/loca/z-marker-layer.md',
      '/zh-cn/component/loca/laser-layer.md'
    ],
  },
  {
    text: '@vuemap/vue-amap-extra组件',
    children: [
      '/zh-cn/component/three/three-layer.md',
      '/zh-cn/component/three/three-gltf.md',
      {
        text: '灯光',
        children: [
          '/zh-cn/component/three/three-light-ambient.md',
          '/zh-cn/component/three/three-light-directional.md',
          '/zh-cn/component/three/three-light-hemisphere.md',
          '/zh-cn/component/three/three-light-point.md',
          '/zh-cn/component/three/three-light-spot.md',
        ]
      },
      '/zh-cn/component/three/three-video.md',
      '/zh-cn/component/three/three-polygon.md',
      '/zh-cn/component/three/three-tiles3d.md'
    ],
  }
]
