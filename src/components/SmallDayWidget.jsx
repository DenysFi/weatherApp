import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

export default function SmallDayWidget({ day, dayIndex }) {
    const { mintemp, maxtemp } = useSelector(state => state.settings.units);
    const params = useParams()
    const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    const date = new Date(day.date);
    const dayOfWeek = daysOfWeek[date.getDay()]
    const dayMonth = `${date.getDate()}.${date.getMonth() + 1}`;
    return (
        <li className='small-day-widget'>
            <Link to={`/weatherApp/forecasts/daily-forecast/${params.city}?day=${dayIndex}`} className='small-day-widget__link'>
                <div className="small-day-widget__day">
                    <p>{dayOfWeek}</p>
                    <span>{dayMonth}</span>
                </div>
                <div className="small-day-widget__condition">
                    <div className="small-day-widget__icon">
                        <img src={day.day.condition.icon} alt="" />
                    </div>
                    <span className='day_temp'>{Math.floor(day.day[maxtemp])}°</span>
                    <span>{Math.floor(day.day[mintemp])}°</span>
                </div>
                <p className="small-day-widget__status">
                    {day.day.condition.text}
                </p>
                <div className="small-day-widget__humidy">
                    <img src="../../images/water.png" alt="" />
                    <span>{day.day.avghumidity}%</span>
                </div>
            </Link>
        </li>
    )
}
