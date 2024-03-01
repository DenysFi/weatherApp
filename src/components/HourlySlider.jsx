
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import HourlySmallWidget from './HourlySmallWidget';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function HourlySlider() {
    const { horly } = useSelector(state => state.currentForecast);
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
                }}>
                {horly.map(hour => {
                    return (
                        <SwiperSlide key={hour.time_epoch}>
                            <HourlySmallWidget data={hour}></HourlySmallWidget>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <button ref={navigationNextRef} className="hourly-slider__right-btn"></button>
        </div>
    )
}
