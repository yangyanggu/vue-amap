/**
 * 天气插件hook返回值
 */
export interface WeatherPromise {
    /**
     * 通过城市名称、区域编码（如杭州市、330100），查询目标城市/区域的实时天气状况
     * @param {string} city 城市名称或者区域编码（如：“杭州市”/“330100”）
     * @return {Promise<WeatherLiveResult>}
     */
    getLive: (city: string) => Promise<AMap.WeatherLiveResult>;
    /**
     * 通过城市名称、区域编码（如北京市、110000），查询目标城市/区域的天气预报状况。
     * @param {string} city 城市名称或者区域编码（如：“杭州市”/“330100”）
     * @return {Promise<WeatherForecastResult>}
     */
    getForecast: (city: string) => Promise<AMap.WeatherForecastResult>;
}



/**
 * 天气插件hook，返回天气插件里的方法，全部Promise处理
 */
export function useWeather () {
    return new Promise<WeatherPromise>((resolve) => {
        AMap.plugin('AMap.Weather', function () {
            const weather = new AMap.Weather();
            /**
             * 查询实时天气信息。
             * 
             * @param  {string} city 城市名称或者区域编码（如：“杭州市”/“330100”）
             */
            const getLive = (city: string) => {
                return new Promise<AMap.WeatherLiveResult>((resolve, reject) => {
                    weather.getLive(city, function (err, result) {
                        if (!err && result.info === 'OK') {
                            resolve(result);
                        } else {
                            reject({
                                result
                            });
                        }
                    });
                });
            };
            /**
             * 查询四天预报天气，包括查询当天天气信息
             * @param  {string} city 城市名称或者区域编码（如：“杭州市”/“330100”）
             */
            const getForecast = (city: string) => {
                return new Promise<AMap.WeatherForecastResult>((resolve, reject) => {
                    weather.getForecast(city, function (err, result) {
                        if (!err && result.info === 'OK') {
                            resolve(result);
                        } else {
                            reject({
                                result
                            });
                        }
                    });
                });
            };
            resolve({
                getLive,
                getForecast
            });
        });
    });
}