export interface CitySearchPromise {
    getLocalCity: () => Promise<AMap.CitySearchLocalCityResult>
}

/**
 * IP定位插件hook，用于进行粗略的基于IP定位
 */
export function useCitySearch () {
    return new Promise<CitySearchPromise>((resolve) => {
        AMap.plugin('AMap.CitySearch', function () {
            const citySearch = new AMap.CitySearch();
            const getLocalCity = () => {
                return new Promise<AMap.CitySearchLocalCityResult>((resolve, reject) => {
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