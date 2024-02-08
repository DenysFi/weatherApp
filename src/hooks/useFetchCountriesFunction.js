import { useCallback, useEffect } from "react";
import { getFromLocalStorage, isStoreByKey, replacedLocalizedNameToName, saveToLocalStorage } from "../utiles/utiles";
import axios from "axios";
import { useFetching } from "./useFetchData";

export default function useFetchCountriesFunction(setCountries) {
    const cb = useCallback(async () => {
        const apikey = import.meta.env.VITE_ACCUWETHER_API_KEY;
        const { data } = await axios.get('http://dataservice.accuweather.com/locations/v1/countries/', {
            params: {
                apikey,
                language: import.meta.env.VITE_LOCALE_LANGUAGE,
            }
        });
        const replaced = replacedLocalizedNameToName(data);
        saveToLocalStorage(replaced, 'countries')
        setCountries(replaced);
    }, [setCountries])

    const [fetchCountries, isLoading, error] = useFetching(cb);

    useEffect(() => {
        if (isStoreByKey('countries')) {
            const data = getFromLocalStorage('countries');
            setCountries(data);
            return;
        }

        fetchCountries();
    }, [fetchCountries, setCountries])

    return [isLoading, error]
}