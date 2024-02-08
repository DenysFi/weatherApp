import axios from "axios";
import { useCallback, useEffect } from "react";
import { useFetching } from "./useFetchData";

export default function useFetchCities(query, setCities, countryId, regionNameId) {

    const cb = useCallback(async () => {
        if (!query) return;

        const { data } = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', {
            params: {
                apikey: import.meta.env.VITE_ACCUWETHER_API_KEY,
                q: query,
                language: import.meta.env.VITE_LOCALE_LANGUAGE,
            }
        });
        // const data = getFromLocalStorage('test')
        const filteredAndReplaced = data
            .filter((el => el.AdministrativeArea.ID === regionNameId && el.Country.ID === countryId))
            .map((el) => ({ ...el, name: el.LocalizedName }))
        console.log(filteredAndReplaced);
        setCities(filteredAndReplaced);
    }, [query, setCities, countryId, regionNameId])

    const [fetch, isLoading, error] = useFetching(cb)
    useEffect(() => {
        fetch();
    }, [fetch])
    return [isLoading, error];
}