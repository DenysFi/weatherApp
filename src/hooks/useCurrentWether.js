import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useFetching } from "./useFetchData";
import { getGeo } from "../utiles/utiles";

export default function useCurrentWether(place) {
    const [currentCondition, setCurrentCondition] = useState([]);
    const cb = useCallback(async () => {

        let { Longitude, Latitude } = place?.GeoPosition || await getGeo(place);

        const { data } = await axios.get('https://api.weatherapi.com/v1/current.json', {
            params: {
                key: import.meta.env.VITE_WETHER_API_KEY,
                q: `${Latitude},${Longitude}`,
                lang: 'ru'
            }
        })

        setCurrentCondition(data.current);
    }, [place])

    const [fetch, isLoading, error] = useFetching(cb)

    useEffect(() => {
        fetch();
    }, [fetch])

    return [currentCondition, isLoading, error];
}