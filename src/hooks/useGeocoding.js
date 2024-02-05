import axios from "axios";
import { useEffect, useState } from "react";

export default function useGeocoding(locations) {
    const [geolocations, setGeolocations] = useState([]);

    useEffect(() => {
        async function getAllGeo() {
            const promises = locations.map((location) => {
                return new Promise((resolve, _) => {
                    axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
                        params: {
                            q: location.city,
                            limit: 1,
                            appid: import.meta.env.VITE_GEO_API_KEY
                        }
                    }).then(response => {
                        const resp = {
                            ...response.data[0],
                            countryFromInput: location.country,
                            cityFromInput: location.city,
                            regionFromInput: location.region
                        }
                        resolve(resp)
                    }).catch(error => {
                        console.error(error);
                    })
                })
            })
            const result = await Promise.all(promises)
            setGeolocations(result);
        }
        getAllGeo();
    }, [locations])

    return geolocations;
}

