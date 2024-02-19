import React from 'react'
import { useSelector } from 'react-redux';

export default function HourlySmallWidget({ data }) {
    let hour = new Date(data.time).getHours();
    hour = hour > 9 ? hour : '0' + hour;
    const { temp } = useSelector(state => state.settings.units)
    console.log(data);
    console.log(hour[temp]);

    return (
        <>
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
        </>
    )
}
