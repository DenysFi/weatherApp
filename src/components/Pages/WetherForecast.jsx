
import CurrentWetherCard from '../CurrentWetherCard';
import HourlySlider from '../HourlySlider';
import WetherItemTemplate from '../WetherItemTemplate';
import withForecast from '../../HOCS/withForecast';
import DaysList from '../DaysList';
import Astro from '../Astro';
import AirQuality from '../AirQuality';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const WetherForecast = withForecast(function WetherForecast() {
    const { loading, success, astro } = useSelector(state => state.currentForecast)
    const [loader, setLoader] = useState(true);
    // не понятный костыль ))
    useEffect(() => {
        if (!loading) setLoader(false)
    }, [loading, success]);

    const style = (loader) ? { opacity: 0 } : {};
    return (
        <section className='forecast'>
            <div className="forecast__container" style={style}>
                <ul className="forecast__list">
                    <CurrentWetherCard></CurrentWetherCard>
                    <WetherItemTemplate title='Прогноз погоды'>
                        <HourlySlider ></HourlySlider>
                    </WetherItemTemplate>
                    <WetherItemTemplate title='Ежедневный прогноз'>
                        <DaysList></DaysList>
                    </WetherItemTemplate>
                    <WetherItemTemplate title='СОЛНЦЕ И ЛУНА'>
                        <Astro astro={astro}></Astro>
                    </WetherItemTemplate>
                    <WetherItemTemplate title='КАЧЕСТВО ВОЗДУХА'>
                        <AirQuality></AirQuality>
                    </WetherItemTemplate>
                </ul>
            </div>
        </section>
    )
});

export default WetherForecast;

// показывать миникарточку текущей погоды
// показывать ссылку на почасовой прогноз (до 3х дней)
// показывать ежедневный прогноз на 5 дней с возможность переходить на конкретный день
// карта восхода и заката
// показатель качества воздуха (короткий)
// ПРОГНОЗ АЛЛЕРГИИ (короткий)
//ПРОГНОЗ АЛЛЕРГИИ ссылка на страницу