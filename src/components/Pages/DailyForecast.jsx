import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchForecastFor31Days } from "../../state/currentForecast/currentForecastSlice";
import withForecast from "../../HOCS/withForecast";
import DailyForecastList from "../DailyForecastList";
import { useSearchParams } from "react-router-dom";
import DailyForecasByDay from "../DailyForecasByDay";

const DailyForecast = withForecast(function DailyForecast() {
    let [searchParams, _] = useSearchParams();
    const dayIndex = searchParams.get('day');
    const dispatch = useDispatch();
    const { GeoPosition } = useSelector(state => state.recent.places[0]);

    useEffect(() => {
        dispatch(fetchForecastFor31Days(GeoPosition))
    }, [dispatch, GeoPosition]);

    return (
        <>
            {dayIndex === null ? <DailyForecastList></DailyForecastList> : <DailyForecasByDay ></DailyForecasByDay>}
        </>
    );
});

export default DailyForecast;

// показывать короткий прогноз на 5 дней
// возможность перехода на отдельный день по нажатию 