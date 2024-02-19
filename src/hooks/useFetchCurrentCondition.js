import { useCallback, useEffect, useState } from "react";
import { useFetching } from "./useFetchData";
import axios from "axios";
import { getGeo } from "../utiles/utiles";

export default function useFetchCurrentCondition(places) {
    const [placesWithCondition, setPlacesWithCondition] = useState([]);

    const cb = useCallback(async () => {
        const promises = places.map(async (place) => {
            let { Longitude, Latitude } = place?.GeoPosition || await getGeo(place);
            return new Promise((resolve, reject) => {

                axios.get('https://api.weatherapi.com/v1/current.json', {
                    params: {
                        key: import.meta.env.VITE_WETHER_API_KEY,
                        q: `${Latitude},${Longitude}`,
                        lang: 'ru'
                    }
                }).then(resp => {
                    setTimeout(() => {
                        resolve({
                            ...place,
                            info: { ...resp.data.current },
                            GeoPosition: { Latitude: resp.data.location.lat, Longitude: resp.data.location.lon },
                            EnglishName: resp.data.location.name
                        });
                    }, 500); // исскуственная задержка в 500 мс для скелетона
                }).catch((e) => reject(e));


            });
        })
        const data = await Promise.all(promises);
        setPlacesWithCondition(data)
    }, [places])

    const [fetch, isLoading] = useFetching(cb)

    useEffect(() => {
        fetch()
    }, [fetch])

    return [placesWithCondition, isLoading]
}