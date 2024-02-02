/**
 * 天气插件hook返回值
 */
export interface WeatherPromise {
    /**
     * 通过城市名称、区域编码（如杭州市、330100），查询目标城市/区域的实时天气状况
     * @param {string} city 城市名称或者区域编码（如：“杭州市”/“330100”）
     * @return {Promise<WeatherLiveResult>}
     */
    getLive: (city: string) => Promise<WeatherLiveResult>;
    /**
     * 通过城市名称、区域编码（如北京市、110000），查询目标城市/区域的天气预报状况。
     * @param {string} city 城市名称或者区域编码（如：“杭州市”/“330100”）
     * @return {Promise<WeatherForecastResult>}
     */
    getForecast: (city: string) => Promise<WeatherForecastResult>;
}

/**
 * CitySearch插件getLocalCity方法返回的正确数据
 */
export interface WeatherLiveResult {
    /**
     * 请求是否正确
     */
    info: string;
    /**
     * 省份名称
     */
    province: string;
    /**
     * 城市名称
     */
    city: string;
    /**
     * 区域编码
     */
    adcode: string;
    /**
     * 天气现象，详见天气现象列表
     */
    weather: string;
    /**
     * 实时气温，单位：摄氏度
     */
    temperature: number;
    /**
     * 风向，风向编码对应描述
     */
    windDirection: string;
    /**
     * 风力，风力编码对应风力级别，单位：级
     */
    windPower: string;
    /**
     * 空气湿度（百分比）
     */
    humidity: string;
    /**
     * 数据发布的时间
     */
    reportTime: string;
}

export interface WeatherForecastItemResult {
    /**
     * 日期，格式为“年-月-日”
     */
    date: string;
    /**
     * 星期
     */
    week: string;
    /**
     * 白天天气现象，详见天气现象列表
     */
    dayWeather: string;
    /**
     * 夜间天气现象，详见天气现象列表
     */
    nightWeather: string;
    /**
     * 白天温度
     */
    dayTemp: number;
    /**
     * 白天温度
     */
    nightTemp: number;
    /**
     * 白天风向
     */
    dayWindDir: string;
    /**
     * 白天风力
     */
    dayWindPower: string;
    /**
     * 夜间风力
     */
    nightWindPower: string;
}

/**
 * 查询四天预报天气，包括查询当天天气信息
 */
export interface WeatherForecastResult{
    /**
     * 请求是否正确
     */
    info: string;
    /**
     * 省份名称
     */
    province: string;
    /**
     * 城市名称
     */
    city: string;
    /**
     * 区域编码
     */
    adcode: string;
    /**
     * 天气预报数组，包括当天至第三天的预报数据
     */
    forecast: WeatherForecastItemResult[];
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
                return new Promise<WeatherLiveResult>((resolve, reject) => {
                    weather.getLive(city, function (err: any, result: any) {
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
                return new Promise<WeatherForecastResult>((resolve, reject) => {
                    weather.getForecast(city, function (err: any, result: any) {
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