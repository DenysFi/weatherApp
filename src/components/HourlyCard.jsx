import { useSelector } from "react-redux";
import { getUvColor } from "../utiles/utiles";

export default function HourlyCard({ data }) {
    const hours = new Date(data.time).getHours().toString().padStart(2, '0');
    const { tempUnitName, temp, feelslike, wind, gust, speedUnitName, precipUnit, speedUnit, vis, precip, pressure, pressureUnit, dewpoint } = useSelector(state => state.settings.units);
    const [uvColor, uvText] = getUvColor(data.uv);
    return (
        <article className="hourlyforecast__card hourly-card">
            <div className="hourly-card__header">
                <div className="hourly-card__top">
                    <div className="hourly-card__sub-content">
                        <span className="hourly-card__hour">{hours}</span>
                        <div className="hourly-card__image">
                            <img src={data.condition.icon} alt="" />
                        </div>
                        <div className="hourly-card__temp">{Math.floor(data[temp])}°{tempUnitName}</div>
                    </div>
                    <div className="hourly-card__sub-content">
                        <span className="hourly-card__real-feel">RealFeel {Math.floor(data[feelslike])}° {tempUnitName}</span>
                    </div>
                    <div className="hourly-card__sub-content">
                        <div className="hourly-card__humidy">
                            <img src="../../images/water.png" alt="" />
                            {data.humidity}%
                        </div>
                    </div>
                </div>
                <div className="hourly-card__status">{data.condition.text}</div>
                <ul className="hourly-card__items">
                    <li className="hourly-card__item hourly-item">
                        <p className="hourly-item__text">Ветер</p>
                        <span className="hourly-item__value">{data.wind_dir} {data[wind]} {speedUnitName}</span>
                    </li>
                    <li className="hourly-card__item hourly-item">
                        <p className="hourly-item__text">Порывы</p>
                        <span className="hourly-item__value">{data[gust]} {speedUnitName}</span>
                    </li>
                    <li className="hourly-card__item hourly-item">
                        <p className="hourly-item__text">Влажность</p>
                        <span className="hourly-item__value">{data.humidity}%</span>
                    </li>
                    <li className="hourly-card__item hourly-item">
                        <p className="hourly-item__text">Видимость</p>
                        <span className="hourly-item__value">{data[vis]} {speedUnit}</span>
                    </li>
                    <li className="hourly-card__item hourly-item">
                        <p className="hourly-item__text">Макс. Уф-индекс</p>
                        <span className="hourly-item__value" style={{ color: uvColor }}>{data.uv} {uvText}</span>
                    </li>
                    <li className="hourly-card__item hourly-item">
                        <p className="hourly-item__text">Точка росы</p>
                        <span className="hourly-item__value" style={{ textTransform: 'uppercase' }}>{data[dewpoint]}°{tempUnitName}</span>
                    </li>
                    <li className="hourly-card__item hourly-item">
                        <p className="hourly-item__text">Давление</p>
                        <span className="hourly-item__value">{data[pressure]} {pressureUnit}</span>
                    </li>
                    <li className="hourly-card__item hourly-item">
                        <p className="hourly-item__text">Осадки</p>
                        <span className="hourly-item__value">{data[precip]} {precipUnit}</span>
                    </li>
                </ul>
            </div>
        </article>
    )
}
