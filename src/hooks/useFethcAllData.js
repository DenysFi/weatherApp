import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForecast } from "../state/currentForecast/currentForecastSlice";
import { getGeo } from "../utiles/utiles";

export default function useFetchAllData() {
    const place = useSelector(state => state.recent.places[0]);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetch() {
            const { Latitude, Longitude } = place.GeoPosition || await getGeo(place)
            dispatch(fetchForecast({ Latitude, Longitude }))
        }
        fetch()
    }, [dispatch, place]);

    return
}