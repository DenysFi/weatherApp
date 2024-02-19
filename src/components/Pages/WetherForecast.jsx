import CurrentWetherCard from '../CurrentWetherCard';
import WetherItemTemplate from '../WetherItemTemplate';
import HourlySlider from '../HourlySlider';
import { useSelector } from 'react-redux';

const WetherForecast = () => {
    const place = useSelector(state => state.recent.places[0]);
    return (
        <section className='forecast'>
            <div className="forecast__container">
                <ul className="forecast__list">
                    <CurrentWetherCard></CurrentWetherCard>
                    <WetherItemTemplate title='Прогноз погоды'>
                        <HourlySlider lat={place.GeoPosition.Latitude} lon={place.GeoPosition.Longitude}></HourlySlider>
                    </WetherItemTemplate>

                </ul>
            </div>
        </section>
    );
};

export default WetherForecast;

// показывать миникарточку текущей погоды
// показывать ссылку на почасовой прогноз (до 3х дней)
// показывать ежедневный прогноз на 5 дней с возможность переходить на конкретный день
// карта восхода и заката
// показатель качества воздуха (короткий)
// ПРОГНОЗ АЛЛЕРГИИ (короткий)
//ПРОГНОЗ АЛЛЕРГИИ ссылка на страницу