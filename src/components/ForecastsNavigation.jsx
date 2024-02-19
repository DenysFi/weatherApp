import { useParams } from "react-router-dom";
import ForecastLink from "./ForecastLink";

const ForecastsNavigation = () => {
    const { key } = useParams();
    return (
        <div className="forecast-navigation">
            <div className="forecast-navigation__container">
                <nav className="forecast-navigation__nav">
                    <ul className="forecast-navigation__items">
                        <ForecastLink path={'/forecasts/Wether/' + key} label={'Сегодня'} classNames={'forecast-navigation'}></ForecastLink>
                        <ForecastLink path={'/forecasts/hourly-forecast/' + key} label={'Почасовой'} classNames={'forecast-navigation'}></ForecastLink>
                        <ForecastLink path={'/forecasts/daily-forecast/' + key} label={'Ежедневно'} classNames={'forecast-navigation'}></ForecastLink>
                    </ul>
                </nav>
            </div>
        </div>

    );
};

export default ForecastsNavigation;