import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function HourlySmallWidget({ data }) {
    let hour = new Date(data.time).getHours().toString().padStart(2, '0');
    const { city } = useParams();
    const { temp } = useSelector(state => state.settings.units)

    return (
        <Link to={'/weatherApp/forecasts/hourly-forecast/' + city} className='hourly-small-widget'>
            <div className="hourly-small-widget__hour">
                {hour}
            </div>
            <div className="hourly-small-widget__icon">
                <img src={data.condition.icon} alt="" />
            </div>
            <div className="hourly-small-widget__temp">
                {Math.floor(data[temp])}°
            </div>
            <div className="hourly-small-widget__humidy">
                <img src="../../images/water.png" alt="" />
                {data.humidity}%
            </div>
        </Link>
    )
}
