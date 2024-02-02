export interface CitySearchPromise {
    getLocalCity: () => Promise<CitySearchLocalCityResult>
}

/**
 * CitySearch插件getLocalCity方法返回的正确数据
 */
export interface CitySearchLocalCityResult {
    /**
     * 区域编码
     */
    adcode: string;
    /**
     * 城市的矩形边界
     */
    bounds: any;
    /**
     * 城市名称
     */
    city: string;
    /**
     * 请求是否正确
     */
    info: string;
    /**
     * 省份名称
     */
    province: string;
    /**
     * 矩形边界经纬度
     */
    rectangle: string;
}

/**
 * IP定位插件hook，用于进行粗略的基于IP定位
 */
export function useCitySearch () {
    return new Promise<CitySearchPromise>((resolve) => {
        AMap.plugin('AMap.CitySearch', function () {
            const citySearch = new AMap.CitySearch();
            const getLocalCity = () => {
                return new Promise<CitySearchLocalCityResult>((resolve, reject) => {
                    citySearch.getLocalCity(function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
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
                getLocalCity
            });
        });
    });
}