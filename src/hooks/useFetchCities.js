import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useFetching } from "./useFetchData";

export default function useFetchCities(query) {
    const [places, setPlaces] = useState([]);
    const cb = useCallback(async () => {

        const { data } = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', {
            params: {
                apikey: import.meta.env.VITE_ACCUWETHER_API_KEY,
                q: query,
                language: import.meta.env.VITE_LOCALE_LANGUAGE,
            }
        });

        const slisedData = data.slice(0, 6);
        setPlaces(slisedData);
    }, [query])

    const [fetch, isLoading, error] = useFetching(cb)

    useEffect(() => {
        fetch();
    }, [fetch])

    return [places, isLoading, error];
}