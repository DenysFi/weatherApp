import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AirQuality() {
    const [airquality, setAirquality] = useState([]);
    const airQCategories = JSON.parse(import.meta.env.VITE_AIR_CATEGORY_VALUES);
    const [airqualityStatus, airqualityColor] = airQCategories[airquality?.CategoryValue ?? 0]
    const { placeId } = useSelector(state => state.currentForecast);

    useEffect(() => {
        if (!placeId) return;

        axios.get(`http://dataservice.accuweather.com/indices/v1/daily/1day/${placeId}/-10`, {
            params: {
                apikey: import.meta.env.VITE_ACCUWEATHER_API_KEY,
                details: true,
                language: import.meta.env.VITE_LOCALE_LANGUAGE,

            }
        }).then(({ data }) => setAirquality(data[0]))
            .catch(err => console.error(err.message));

    }, [placeId]);
    return (
        <div className='airquality'>
            <div className="airquality__line" style={{ borderRightColor: airqualityColor }}>
                <h5 className="airquality__title">
                    <i>
                        <svg className="air-quality-module__icon" width="24" height="25" viewBox="5 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_4782_28057)">
                                <path d="M6.75 6.16675C6.75 4.92411 7.75736 3.91675 9 3.91675H15C16.2426 3.91675 17.25 4.92411 17.25 6.16675V18.1667C17.25 19.4094 16.2426 20.4167 15 20.4167H9C7.75736 20.4167 6.75 19.4094 6.75 18.1667V6.16675Z" stroke="black" strokeWidth="1.5"></path>
                                <path d="M11.25 8.41675L12.8991 7.53828C14.4959 6.68762 16.4223 6.73896 17.9716 7.67344V7.67344C19.5089 8.6007 21.4185 8.65888 23.0094 7.82695L24.75 6.91675" stroke="black" strokeWidth="1.5"></path>
                                <path d="M11.25 12.9167L12.8991 12.0383C14.4959 11.1876 16.4223 11.239 17.9716 12.1734V12.1734C19.5089 13.1007 21.4185 13.1589 23.0094 12.3269L24.75 11.4167" stroke="black" strokeWidth="1.5"></path>
                                <path d="M11.25 17.4167L12.8991 16.5383C14.4959 15.6876 16.4223 15.739 17.9716 16.6734V16.6734C19.5089 17.6007 21.4185 17.6589 23.0094 16.8269L24.75 15.9167" stroke="black" strokeWidth="1.5"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_4782_28057">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.166748)"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </i>
                    Качество воздуха
                </h5>
                <span className="airquality__status" style={{ color: airqualityColor }}>{airqualityStatus}</span>
            </div>
            <div className="airquality__desc">
                {airquality.Text}
            </div>
        </div>
    )
}
