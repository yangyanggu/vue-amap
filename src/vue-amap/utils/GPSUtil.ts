//坐标转换
// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
const pi = 3.1415926535897932384626;
const a = 6378245.0;
// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
const ee = 0.00669342162296594323;
const x_pi = pi * 3000.0 / 180.0;
const R = 6378137;

export type ResultLngLat = {
    lng: number
    lat: number
}

//经纬度转xyz协议瓦片编号
export function lonLatToTileNumbers (lon_deg: number, lat_deg: number, zoom: number): [number, number] {
    const lat_rad = (pi/180)*lat_deg;     //math.radians(lat_deg)  角度转弧度
    const n = Math.pow(2, zoom);
    const xtile = Math.floor((lon_deg + 180.0) / 360.0 * n);
    const ytile = Math.floor((1.0 - Math.asinh(Math.tan(lat_rad)) / pi) / 2.0 * n);
    return [xtile, ytile];
}

//xyz协议瓦片编号转经纬度
export function tileNumbersToLonLat (xtile: number, ytile: number, zoom: number): [number, number] {
    const n = Math.pow(2, zoom);
    const lon_deg = xtile / n * 360.0 - 180.0;
    const lat_rad = Math.atan(Math.sinh(pi * (1 - 2 * ytile / n)));

    const lat_deg = lat_rad * 180.0 / pi;
    return [lon_deg, lat_deg];
}

/**百度转84*/
export function bd09_To_gps84 (lng: number, lat: number) {
    const gcj02 = bd09_To_gcj02(lng, lat);
    const map84 = gcj02_To_gps84(gcj02.lng, gcj02.lat);
    return map84;
}
/**84转百度*/
export function gps84_To_bd09 (lng: number, lat: number): ResultLngLat {
    const gcj02 = gps84_To_gcj02(lng, lat);
    const bd09 = gcj02_To_bd09(gcj02.lng, gcj02.lat);
    return bd09;
}
/**84转火星*/
export function gps84_To_gcj02 (lng: number, lat: number): ResultLngLat {
    let dLat = transformLat(lng - 105.0, lat - 35.0);
    let dLng = transformLng(lng - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    const mgLat = lat + dLat;
    const mgLng = lng + dLng;
    const newCoord = {
        lng: mgLng,
        lat: mgLat
    };
    return newCoord;
}
/**火星转84*/
export function gcj02_To_gps84 (lng: number, lat: number): ResultLngLat {
    const coord = transform(lng, lat);
    const lontitude = lng * 2 - coord.lng;
    const latitude = lat * 2 - coord.lat;
    const newCoord = {
        lng: lontitude,
        lat: latitude
    };
    return newCoord;
}
/**火星转百度*/
export function gcj02_To_bd09 (x: number, y: number): ResultLngLat {
    const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    const bd_lng = z * Math.cos(theta) + 0.0065;
    const bd_lat = z * Math.sin(theta) + 0.006;
    const newCoord = {
        lng: bd_lng,
        lat: bd_lat
    };
    return newCoord;
}
/**百度转火星*/
export function bd09_To_gcj02 (bd_lng: number, bd_lat: number): ResultLngLat {
    const x = bd_lng - 0.0065;
    const y = bd_lat - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    const gg_lng = z * Math.cos(theta);
    const gg_lat = z * Math.sin(theta);
    const newCoord = {
        lng: gg_lng,
        lat: gg_lat
    };
    return newCoord;
}



function transform (lng: number, lat: number): ResultLngLat {
    let dLat = transformLat(lng - 105.0, lat - 35.0);
    let dLng = transformLng(lng - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    const mgLat = lat + dLat;
    const mgLng = lng + dLng;
    const newCoord = {
        lng: mgLng,
        lat: mgLat
    };
    return newCoord;
}

function transformLat (x: number, y: number) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLng (x: number, y: number) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}
