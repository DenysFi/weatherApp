import { useParams } from "react-router-dom";
import ForecastLink from "./ForecastLink";
import useFetchAllForecast from "../hooks/useFethcAllData";

const ForecastsNavigation = () => {
    const { city } = useParams();

    useFetchAllForecast();
    return (
        <div className="forecast-navigation">
            <div className="forecast-navigation__container">
                <nav className="forecast-navigation__nav">
                    <ul className="forecast-navigation__items">
                        <ForecastLink path={'/forecasts/Wether/' + city} label={'Сегодня'} classNames={'forecast-navigation'}></ForecastLink>
                        <ForecastLink path={'/forecasts/hourly-forecast/' + city} label={'Почасовой'} classNames={'forecast-navigation'}></ForecastLink>
                        <ForecastLink path={'/forecasts/daily-forecast/' + city} label={'Ежедневно'} classNames={'forecast-navigation'}></ForecastLink>
                    </ul>
                </nav>
            </div>
        </div>

    );
};

export default ForecastsNavigation;