import axios from "axios";
import { useEffect, useState } from "react";

export default function useGeocoding(locations) {
    const [geolocations, setGeolocations] = useState([]);

    useEffect(() => {
        async function getAllGeo() {
            const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
                params: {
                    q: location.city,
                    limit: 1,
                    appid: import.meta.env.VITE_GEO_API_KEY
                }
            })

            console.log(data);
            setGeolocations(data);
        }
        getAllGeo();
    }, [locations])

    return geolocations;
}

