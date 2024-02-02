export interface GeolocationPromise {
    /**
     * 获取 用户的精确位置，有失败几率
     * @return {Promise<CurrentPositionResult>}
     */
    getCurrentPosition: () => Promise<CurrentPositionResult>;

    /**
     * 根据用户 IP 获取 用户所在城市信息
     * @return {Promise<CurrentPositionResult>}
     */
    getCityInfo: () => Promise<CurrentPositionResult>
}

/**
 * Geolocation插件getCurrentPosition方法返回的正确数据
 */
export interface CurrentPositionResult {
    /**
     * 定位到的经纬度位置
     */
    position : any;
    /**
     * 定位精度，米
     */
    accuracy: number;
    /**
     * 定位的类型，ip/h5/sdk/ipcity
     */
    location_type: string;
    /**
     * 定位过程的信息，用于排查定位失败原因
     */
    message : string;
    /**
     * 是否已经转换为高德坐标
     */
    isConverted : boolean;
    /**
     * 'SUCCESS' 或者 'PERMISSION_DENIED' 或者 'TIME_OUT' 或者 'POSITION_UNAVAILABLE'
     */
    info: string;
    /**
     * 当前位置详细信息
     */
    addressComponent: GeolocationAddressComponent;
    formattedAddress: string;
    pois: any;
    roads: any;
    crosses: any;
}

export interface GeolocationAddressComponent {
    /**
     * 区域编码
     */
    adcode: string;
    /**
     * 省份名称
     */
    province: string;
    /**
     * 城市名称
     */
    city: string;
    /**
     * 城市code
     */
    citycode: string;
    /**
     * 区县名称
     */
    district: string;
    /**
     * 镇或街道名称
     */
    township: string;
    /**
     * 路名
     */
    street: string;
    /**
     * 门牌号
     */
    streetNumber: string;
    [key: string]: any
}

/**
 * 定位插件参数
 */
export interface GeolocationOptions {
    /**
     * 进行浏览器原生定位的时候是否尝试获取较高精度，可能影响定位效率，默认为false
     */
    enableHighAccuracy?: boolean;
    /**
     * 是否将定位结果转换为高德坐标
     */
    convert?: boolean;
    /**
     * 定位的超时时间，毫秒
     */
    timeout?: number;
    /**
     * 浏览器原生定位的缓存时间，毫秒
     */
    maximumAge?: number;
    /**
     * 优先使用H5定位，默认移动端为true，PC端为false
     */
    GeoLocationFirst?: boolean;
    /**
     * 是否禁用IP精确定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用
     */
    noIpLocate?: number;
    /**
     * 定位失败之后是否返回基本城市定位信息
     */
    getCityWhenFail?: boolean;
    /**
     * 是否需要将定位结果进行逆地理编码操作
     */
    needAddress?: boolean;
    /**
     * 是否需要详细的逆地理编码信息，默认为'base'只返回基本信息，可选'all'
     */
    extensions?: string;
}

/**
 * 定位插件hook，提供常用的基于浏览器定位的方法，和基于城市定位的方法
 * @param {GeolocationOptions} [options] 定位插件参数
 */
export function useGeolocation (options?: GeolocationOptions) {
    return new Promise<GeolocationPromise>((resolve) => {
        AMap.plugin('AMap.Geolocation', function () {
            const geolocation = new AMap.Geolocation(options);
            const getCurrentPosition = () => {
                return new Promise<CurrentPositionResult>((resolve, reject) => {
                    geolocation.getCurrentPosition(function (status, result) {
                        if (status === 'complete' && result.info === 'SUCCESS') {
                            resolve(result);
                        } else {
                            reject({
                                status,
                                result
                            });
                        }
                    });
                });
            };
            const getCityInfo = () => {
                return new Promise<CurrentPositionResult>((resolve, reject) => {
                    geolocation.getCityInfo(function (status, result) {
                        if (status === 'complete' && result.info === 'SUCCESS') {
                            resolve(result);
                        } else {
                            reject({
                                status,
                                result
                            });
                        }
                    });
                });
            };
            resolve({
                getCurrentPosition,
                getCityInfo
            });
        });
    });
}