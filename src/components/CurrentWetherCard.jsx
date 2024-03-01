import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUvColor } from "../utiles/utiles";

const CurrentWetherCard = () => {
    const { currentCondition, loading } = useSelector(state => state.currentForecast);
    const { feelslike, temp, gust, speedUnitName, tempUnitName, wind } = useSelector(state => state.settings.units);
    const date = new Date(currentCondition.last_updated);
    const params = useParams();
    let hours = date.getHours(), minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const currentTime = [hours, minutes].join('.');
    const currentTemp = !isNaN(currentCondition[temp]) ? Math.floor(currentCondition[temp]) : '-'

    const [uvColor] = getUvColor(currentCondition?.uv);

    return (
        <li className="current-wether">
            <Link to={`/forecasts/daily-forecast/${params.city}?day=0`} className="current-wether__link-card">
                <div className="current-wether__title-container title-container">
                    <h4 className="title-container__title">Текущаяя погода</h4>
                    <span className="title-container__sub-title">{currentTime}</span>
                </div>
                <div className="current-wether__body">
                    <div className="current-wether__content">
                        <div className="current-wether__wrapper">
                            <div className="current-wether__icon">
                                {
                                    loading ? <img src='../../images/placeholder.png' alt="placeholder" /> : <img src={currentCondition?.condition?.icon} alt="wether icon" />
                                }
                            </div>
                            <div className="current-wether__temperature">
                                <div className="current-wether__degree"><p>{currentTemp}</p>°<span>{tempUnitName.toUpperCase() || '-'}</span></div>
                                <div className="current-wether__real-feel">Real feel <span>{Math.floor(currentCondition[feelslike]) ?? '-'}°</span></div>
                            </div>
                        </div>
                        <div>
                            <span className="current-wether__phrase">{currentCondition.condition?.text || '-'}</span>
                            <span className="current-wether__details">Подробно<svg className="current-wether__arrow" xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6"><path d="M10 .969L9.037 0 5 4.063.963 0 0 .969 5 6z"></path></svg></span>
                        </div>
                    </div>
                    <ul className="current-wether__info">
                        <li className="current-wether__item">
                            <span className="current-wether__label">Ветер</span>
                            <span className="current-wether__value">{`${currentCondition?.wind_dir || '-'} ${Math.round(currentCondition[wind]) || ''} ${speedUnitName}`}</span>
                        </li>
                        <li className="current-wether__item">
                            <span className="current-wether__label">Порывы ветра</span>
                            <span className="current-wether__value">{`${currentCondition?.wind_dir || '-'} ${Math.round(currentCondition[gust]) || ''} ${speedUnitName}`}</span>
                        </li>
                        <li className="current-wether__item">
                            <span className="current-wether__label">Ультрафиолет</span>
                            <span className="current-wether__value uv" style={{ color: uvColor }}>{currentCondition?.uv || '-'} </span>
                        </li>
                    </ul>
                </div>
            </Link>
        </li >
    );
};

export default CurrentWetherCard;