import { useSelector } from 'react-redux';
import DailyCard from './DailyCard';
import { getMonthName } from '../utiles/utiles';

export default function DailyForecastList() {
    const { monthForecast, loading, monthSuccess } = useSelector(state => state.currentForecast);
    const currentMonth = new Date(monthForecast[0]?.date), lastMonth = new Date(monthForecast[monthForecast.length - 1]?.date);
    const dateString = `${currentMonth.getDate()} ${getMonthName(currentMonth.getMonth())} - ${lastMonth.getDate()} ${getMonthName(lastMonth.getMonth())}`;
    const style = (loading && !monthSuccess) ? { opacity: 0, transform: 'translate(-300px, 0)' } : {};
    return (
        <section className="dailyforecast">
            <div className="dailyforecast__container"
                style={style}>
                <span className="dailyforecast__date">{dateString}</span>
                <div className="dailyforecast__cards">
                    {monthForecast.map((day, i) => <DailyCard data={day} key={day.date} dayindex={i}></DailyCard>)}
                </div>
            </div>
        </section>
    )
}
