import { useSelector } from "react-redux";
import HourlyCard from "../HourlyCard";
import withForecast from "../../HOCS/withForecast";

const HourlyForecast = withForecast(function HourlyForecast() {
    const { horly, loading, success } = useSelector(state => state.currentForecast)
    const leftHoursForecast = horly.filter(({ time }) => new Date(time).getHours() >= new Date().getHours())
    const style = (loading) ? { opacity: 0, transform: 'translate(-300px, 0)' } : {};

    return (
        <section className="hourlyforecast">
            <div className="hourlyforecast__container" style={style}>
                <div className="hourlyforecast__cards">
                    {leftHoursForecast.map(hour => <HourlyCard key={hour.time} data={hour}></HourlyCard>)}
                </div>
            </div>
        </section>
    );
});

export default HourlyForecast;

