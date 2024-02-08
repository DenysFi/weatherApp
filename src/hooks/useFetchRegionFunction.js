import axios from "axios";
import { useCallback, useEffect } from "react";
import { replacedLocalizedNameToName } from "../utiles/utiles";
import { useFetching } from "./useFetchData";

export default function useFetchRegionFunction({ country }, setRegions) {
    const cb = useCallback(async () => {
        if (!country) return;
        const { data } = await axios.get('http://dataservice.accuweather.com/locations/v1/adminareas/' + country.ID, {
            params: {
                apikey: import.meta.env.VITE_ACCUWETHER_API_KEY,
                language: import.meta.env.VITE_LOCALE_LANGUAGE,
            }
        });
        const replaced = replacedLocalizedNameToName(data);
        setRegions(replaced);
    }, [country, setRegions])

    const [fetchRegions, isLoading, error] = useFetching(cb);
    useEffect(() => {
        fetchRegions();
    }, [fetchRegions])

    return [isLoading, error];
}