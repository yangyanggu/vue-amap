---
title: AmapThreeTiles3d
---

# AmapThreeTiles3d
ThreeJS的3dtiles加载插件

## Attributes

Attribute | Type           | Description
---|----------------|---|
url  | String         | 地址
position | Array          | 模型中心点位置
scale | Number,{x,y,z} | 缩放大小
visible | Boolean        | 是否显示，默认 true
rotation | {x,y,z}        | 旋转角度,通过该参数调整模型方向
translate | {x,y,z}        | 模型偏移设置
dracoDecoderPath | String         | DRACOLoader 的decoder路径，默认使用CDN路径，默认：https://cdn.jsdelivr.net/npm/three@0.143/examples/js/libs/draco/|
fetchOptions | Object | 使用fetch下载文件的参数 |
mouseEvent | Boolean | 是否开启事件,默认false |
debug | Boolean | 是否开启debug，开启后将会在页面最顶部显示当前模型处理情况， 默认 false |
autoFocus       | Boolean                                 | 加载后是否自动将地图中心点移动到模型中心，仅在不传position时生效                                                       |
configLoader    | (loader: GLTFLoader) => void            | 配置loader，用于添加draco等扩展                                                                      |

## Events

Event Name | Parameters | Description
---|---|---|
init | Object3D, 组件实例 | 实例初始化结束
click | Object3D | 点击事件
mouseover | Object3D | 鼠标悬浮

