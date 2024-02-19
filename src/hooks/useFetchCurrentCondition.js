import { useCallback, useEffect, useState } from "react";
import { useFetching } from "./useFetchData";
import axios from "axios";

export default function useFetchCurrentCondition(places) {
    const [placesWithCondition, setPlacesWithCondition] = useState([]);

    const cb = useCallback(async () => {
        const promises = places.map((place) => {
            return new Promise((resolve, reject) => {
                axios.get('http://dataservice.accuweather.com/currentconditions/v1/' + place.Key, {
                    params: {
                        apikey: import.meta.env.VITE_ACCUWETHER_API_KEY,
                        language: import.meta.env.VITE_LOCALE_LANGUAGE,
                    }
                }).then(resp => {
                    setTimeout(() => {
                        resolve({ ...place, info: { ...resp.data[0] } });
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