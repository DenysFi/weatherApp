
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import HourlySmallWidget from './HourlySmallWidget';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function HourlySlider({ lat, lon }) {
    const [hours, setHours] = useState([]);

    useEffect(() => {
        async function fether() {
            const { data } = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: import.meta.env.VITE_WETHER_API_KEY,
                    q: `${lat},${lon}`,
                    lang: 'ru'
                }
            })
            setHours(data.forecast.forecastday[0].hour);
        }
        fether();
    }, [lat, lon])

    const navigationPrevRef = useRef();
    const navigationNextRef = useRef();
    return (
        <div className='hourly-slider'>
            <button ref={navigationPrevRef} className="hourly-slider__left-btn"></button>
            <Swiper
                className='hourly-slider__swiper'
                slidesPerView={8}
                spaceBetween={10}
                modules={[Navigation]}
                breakpoints={{
                    320: {
                        slidesPerView: 3,
                    },
                    420: {
                        slidesPerView: 4,
                    },
                    660: {
                        slidesPerView: 5,
                    },
                    661: {
                        slidesPerView: 8,
                    },
                }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
            >
                {hours.map(hour => {
                    return (
                        <SwiperSlide key={hour.time_epoch} className='hourly-small-widget'>
                            <HourlySmallWidget data={hour}></HourlySmallWidget>
                        </SwiperSlide>
                    )
                })}

                {/* <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide>
                <SwiperSlide className='hourly-small-widget'>
                    <HourlySmallWidget></HourlySmallWidget>
                </SwiperSlide> */}

            </Swiper>
            <button ref={navigationNextRef} className="hourly-slider__right-btn"></button>
        </div>
    )
}
