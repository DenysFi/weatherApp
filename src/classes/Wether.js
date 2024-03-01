//дописать

import axios from "axios"

export default class Wether {
    static async getAllDataByGeo(geo) {
        const promises = geo.map((location) => {
            return new Promise((resolve, reject) => {
                axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                    params: {
                        lat: location.lat,
                        lon: location.lon,
                        appid: import.meta.env.VITE_GEO_API_KEY
                    }
                }).then(response => {
                    return;
                    const resp = {
                        ...response.data[0],
                        countryFromInput: location.country,
                        cityFromInput: location.city,
                        regionFromInput: location.region
                    }
                    resolve(resp)
                }).catch(error => {
                    reject(error)
                    console.error(error);
                })
            })
        })
        const result = await Promise.all(promises)
        return
    }
}