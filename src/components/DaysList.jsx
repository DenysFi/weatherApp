import { useSelector } from "react-redux";
import SmallDayWidget from "./SmallDayWidget";

export default function DaysList() {

    const { days } = useSelector(state => state.currentForecast)
    return (
        <ul className="dayslist">
            {
                days.map((day, i) => <SmallDayWidget dayIndex={i} key={day.date} day={day} />)
            }

        </ul>
    )
}

