export interface GeolocationPromise {
    /**
     * 获取 用户的精确位置，有失败几率
     * @return {Promise<CurrentPositionResult>}
     */
    getCurrentPosition: () => Promise<AMap.CurrentPositionResult>;

    /**
     * 根据用户 IP 获取 用户所在城市信息
     * @return {Promise<CurrentPositionResult>}
     */
    getCityInfo: () => Promise<AMap.CurrentPositionResult>
}

/**
 * Geolocation插件getCurrentPosition方法返回的正确数据
 */


/**
 * 定位插件hook，提供常用的基于浏览器定位的方法，和基于城市定位的方法
 * @param {GeolocationOptions} [options] 定位插件参数
 */
export function useGeolocation (options?: AMap.GeolocationOptions) {
    return new Promise<GeolocationPromise>((resolve) => {
        AMap.plugin('AMap.Geolocation', function () {
            const geolocation = new AMap.Geolocation(options);
            const getCurrentPosition = () => {
                return new Promise<AMap.CurrentPositionResult>((resolve, reject) => {
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
                return new Promise<AMap.CurrentPositionResult>((resolve, reject) => {
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