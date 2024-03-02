import WetherItemTemplate from './WetherItemTemplate'
import Astro from './Astro'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { countAvg, countAvgStr, getMonthName, getUvColor } from '../utiles/utiles';

const dayOfWeekNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

export default function DailyForecasByDay() {
    const maxDayIndex = 44;
    const minDayIndex = 0;
    const { maxtemp, temp, feelslike, wind, gust, speedUnitName, totalprecip, precipUnit, speedUnit, avgvis, vis, precip, pressure, pressureUnit } = useSelector(state => state.settings.units);
    const [searchParams, setSearchParams] = useSearchParams();
    const dayIndex = Number(searchParams.get('day'));
    const { monthForecast } = useSelector(state => state.currentForecast)
    const data = monthForecast[searchParams.get('day')];
    const [uvcolor, uvtext] = getUvColor(data?.day.uv);
    //daily
    //========================================================================================================================================================
    const avgDayFeelsLike = Math.floor(countAvg(data?.hour.map(hour => hour.is_day && hour[feelslike]) || []));
    const avgDailyCloud = Math.floor(countAvg(data?.hour.map(hour => hour.is_day && hour.cloud) || []));
    const avgDailyWindSpeed = Math.floor(countAvg(data?.hour.map(hour => hour.is_day && hour[wind]) || []));
    const avgDailyGustSpeed = Math.floor(countAvg(data?.hour.map(hour => hour.is_day && hour[gust]) || []));
    const avgDailyRainChance = Math.floor(countAvg(data?.hour.map(hour => hour.is_day && hour.chance_of_rain) || []));
    const avgDailyWindDir = countAvgStr(data?.hour.map(hour => hour.is_day && hour.wind_dir) || []);
    //night
    //========================================================================================================================================================
    const avgNightFeelsLike = Math.floor(countAvg(data?.hour.map(hour => !hour.is_day && hour[feelslike]) || []));
    const avgNightTemp = Math.floor(countAvg(data?.hour.map(hour => !hour.is_day && hour[temp]) || []));
    const avgNightCloud = Math.floor(countAvg(data?.hour.map(hour => !hour.is_day && hour.cloud) || []));
    const avgNightWindSpeed = Math.floor(countAvg(data?.hour.map(hour => !hour.is_day && hour[wind]) || []));
    const avgNightGustSpeed = Math.floor(countAvg(data?.hour.map(hour => !hour.is_day && hour[gust]) || []));
    const avgNightRainChance = Math.floor(countAvg(data?.hour.map(hour => !hour.is_day && hour.chance_of_rain) || []));
    const avgNightWindDir = countAvgStr(data?.hour.map(hour => !hour.is_day && hour.wind_dir) || []);
    const iconLink = countAvgStr(data?.hour.map(hour => !hour.is_day && hour.condition.icon) || []);
    const text = countAvgStr(data?.hour.map(hour => !hour.is_day && hour.condition.text) || []);
    const avgNightVis = Math.floor(countAvg(data?.hour.map(hour => !hour.is_day && hour[vis]) || []));
    const avgTotalprecip = Math.floor(countAvg(data?.hour.map(hour => !hour.is_day && hour[totalprecip]) || []));
    //текущий час
    //========================================================================================================================================================
    const { currentCondition } = useSelector(state => state.currentForecast)
    //========================================================================================================================================================

    const date = new Date(data?.date);
    const dateString = `${dayOfWeekNames[date.getDay()]}, ${date.getDate()} ${getMonthName(date.getMonth())}`
    const dayMonth = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`
    const currentHour = `${new Date().getHours().toString().padStart(2, '0')}.${new Date().getMinutes().toString().padStart(2, '0')}`

    const navigate = useNavigate();
    function handleClick(nextIndex) {
        if (nextIndex > maxDayIndex || nextIndex < minDayIndex) return;
        navigate(`?day=${nextIndex}`);
    }

    return (
        !!data &&
        <section className='dailyByDayIndex'>
            <div className="dailyByDayIndex__container">
                <div className="dailyByDayIndex__pagination">
                    <button className="dailyByDayIndex__left-btn" onClick={() => handleClick(Number(dayIndex) - 1)} style={(dayIndex === minDayIndex) ? { opacity: '0' } : {}}></button>
                    <p className="dailyByDayIndex__current-date">{dateString}</p>
                    <button className="dailyByDayIndex__right-btn" onClick={() => handleClick(Number(dayIndex) + 1)} style={dayIndex === maxDayIndex ? { opacity: '0' } : {}}></button>
                </div>
                <ul className="dailyByDayIndex__items">
                    {dayIndex === 0 && (
                        <WetherItemTemplate title='Текущая погода' label={currentHour}>
                            <article className="dailyforecast__card daily-card" >
                                <div className="daily-card__header">
                                    <div className="daily-card__top">
                                        <div className="daily-card__sub-content">
                                            <div className="daily-card__image">
                                                <img src={currentCondition.condition.icon} alt="" />
                                            </div>
                                            <div className="daily-card__temp">
                                                <p>{Math.floor(currentCondition[temp])}°</p>
                                            </div>
                                        </div>
                                        <div className="daily-card__sub-content">
                                            <div className="daily-card__real-feel">
                                                Real feel: {Math.floor(currentCondition[feelslike])}°
                                            </div>
                                        </div>
                                    </div>
                                    <div className="daily-card__status">{currentCondition.condition.text}</div>
                                    <ul className="daily-card__items">
                                        <li className="daily-card__item daily-item">
                                            <p className="daily-item__text">Средняя видимость</p>
                                            <span className="daily-item__value">{currentCondition[vis]} {speedUnit}</span>
                                        </li>
                                        <li className="daily-card__item daily-item">
                                            <p className="daily-item__text">Ветер</p>
                                            <span className="daily-item__value">{currentCondition.wind_dir} {currentCondition[wind]} {speedUnitName}</span>
                                        </li>
                                        <li className="daily-card__item daily-item">
                                            <p className="daily-item__text">Осадки</p>
                                            <span className="daily-item__value" >{currentCondition[precip]} {precipUnit}</span>
                                        </li>
                                        <li className="daily-card__item daily-item">
                                            <p className="daily-item__text">Порывы ветра</p>
                                            <span className="daily-item__value">{currentCondition[gust]} {speedUnitName}</span>
                                        </li>
                                        <li className="daily-card__item daily-item">
                                            <p className="daily-item__text">Облачность</p>
                                            <span className="daily-item__value">{currentCondition.cloud}%</span>
                                        </li>
                                        <li className="daily-card__item daily-item">
                                            <p className="daily-item__text">Давление</p>
                                            <span className="daily-item__value" >{(currentCondition[pressure])} {pressureUnit}</span>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </WetherItemTemplate>
                    )}
                    <WetherItemTemplate title='День' label={dayMonth} >
                        <article className="dailyforecast__card daily-card" >
                            <div className="daily-card__header">
                                <div className="daily-card__top">
                                    <div className="daily-card__sub-content">
                                        <div className="daily-card__image">
                                            <img src={data.day.condition.icon} alt="" />
                                        </div>
                                        <div className="daily-card__temp">
                                            <p>{Math.floor(data.day[maxtemp])}°</p>
                                        </div>
                                    </div>
                                    <div className="daily-card__sub-content">
                                        <div className="daily-card__real-feel">
                                            Real feel: {avgDayFeelsLike}°
                                        </div>
                                    </div>
                                </div>
                                <div className="daily-card__status">{data.day.condition.text}</div>
                                <ul className="daily-card__items">
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Макс. УФ-индекс</p>
                                        <span className="daily-item__value" style={{ color: uvcolor, fontWeight: 700 }}>{data.day.uv} {uvtext}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Средняя видимость</p>
                                        <span className="daily-item__value">{data.day[avgvis]} {speedUnit}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Ветер</p>
                                        <span className="daily-item__value">{avgDailyWindDir} {avgDailyWindSpeed} {speedUnitName}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Осадки</p>
                                        <span className="daily-item__value" >{data.day[totalprecip]} {precipUnit}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Порывы ветра</p>
                                        <span className="daily-item__value">{avgDailyGustSpeed} {speedUnitName}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Облачность</p>
                                        <span className="daily-item__value">{avgDailyCloud}%</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Вероятность осадков</p>
                                        <span className="daily-item__value" >{(data.day.daily_chance_of_rain || avgDailyRainChance)}%</span>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </WetherItemTemplate>
                    <WetherItemTemplate title='Ночь' label={dayMonth}>
                        <article className="dailyforecast__card daily-card" >
                            <div className="daily-card__header">
                                <div className="daily-card__top">
                                    <div className="daily-card__sub-content">
                                        <div className="daily-card__image">
                                            <img src={iconLink} alt="" />
                                        </div>
                                        <div className="daily-card__temp">
                                            <p>{Math.floor(avgNightTemp)}°</p>
                                        </div>
                                    </div>
                                    <div className="daily-card__sub-content">
                                        <div className="daily-card__real-feel">
                                            Real feel: {avgNightFeelsLike}°
                                        </div>
                                    </div>
                                </div>
                                <div className="daily-card__status">{text}</div>
                                <ul className="daily-card__items">
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Средняя видимость</p>
                                        <span className="daily-item__value">{avgNightVis} {speedUnit}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Ветер</p>
                                        <span className="daily-item__value">{avgNightWindDir} {avgNightWindSpeed} {speedUnitName}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Осадки</p>
                                        <span className="daily-item__value" >{avgTotalprecip} {precipUnit}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Порывы ветра</p>
                                        <span className="daily-item__value">{avgNightGustSpeed} {speedUnitName}</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Облачность</p>
                                        <span className="daily-item__value">{avgNightCloud}%</span>
                                    </li>
                                    <li className="daily-card__item daily-item">
                                        <p className="daily-item__text">Вероятность осадков</p>
                                        <span className="daily-item__value" >{(avgNightRainChance)}%</span>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </WetherItemTemplate>
                    <WetherItemTemplate title='СОЛНЦЕ И ЛУНА' label={dayMonth}>
                        <Astro astro={data.astro}></Astro>
                    </WetherItemTemplate>
                </ul>
            </div>.
        </section>
    )
}
