import { useSelector } from 'react-redux';
import { countAvg, getUvColor } from '../utiles/utiles';
import { Link, useParams } from 'react-router-dom';

export default function DailyCard({ data, dayindex }) {
    const { feelslike, maxtemp, mintemp, speedUnitName, maxwindspeed } = useSelector(state => state.settings.units)
    const avgFeelsLike = Math.floor(countAvg(data.hour.map(hour => hour[feelslike])));
    const date = new Date(data.date);
    const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    const uv = data.day.uv;
    const currentDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    const currentDayOfWeek = daysOfWeek[date.getDay()]
    const [uvColor, uvStatus] = getUvColor(uv);
    const params = useParams();

    return (
        <article className="dailyforecast__card daily-card" >
            <div className="daily-card__header">
                <Link to={`/forecasts/daily-forecast/${params.city}?day=${dayindex}`}>
                    <div className="daily-card__top">
                        <div className="daily-card__sub-content">
                            <div className="daily-card__day">
                                <span>{currentDayOfWeek}</span>
                                <p>{currentDate}</p>
                            </div>
                            <div className="daily-card__image">
                                <img src={data.day.condition.icon} alt="" />
                            </div>
                            <div className="daily-card__temp">
                                <p>{Math.floor(data.day[maxtemp])}°<span>/ {Math.floor(data.day[mintemp])}°</span></p>
                            </div>
                        </div>
                        <div className="daily-card__sub-content">
                            <div className="daily-card__humidy">
                                <img src="../../../images/water.png" alt="" />
                                {data.day.avghumidity}%
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="daily-card__status">{data.day.condition.text}</div>
                <ul className="daily-card__items">
                    <li className="daily-card__item daily-item">
                        <p className="daily-item__text">Real feel</p>
                        <span className="daily-item__value">{avgFeelsLike}°</span>
                    </li>
                    <li className="daily-card__item daily-item">
                        <p className="daily-item__text">Макс уф-індекс</p>
                        <span className="daily-item__value" style={{ color: uvColor, fontWeight: 700 }}>{uvStatus} {uv}</span>
                    </li>

                    <li className="daily-card__item daily-item">
                        <p className="daily-item__text">Макс ветер</p>
                        <span className="daily-item__value"> {data.day[maxwindspeed]} {speedUnitName}</span>
                    </li>
                </ul>
            </div>
        </article>
    )
}

