import { Link, useNavigate, useParams } from 'react-router-dom';
import CurrentWetherCard from '../CurrentWetherCard';

const WetherForecast = () => {
    const navigate = useNavigate();

    return (
        <section className='forecast'>
            <div className="forecast__container">
                <ul className="forecast__list">
                    <CurrentWetherCard></CurrentWetherCard>
                </ul>
            </div>
        </section>
    );
};

export default WetherForecast;

// показывать миникарточку текущей погоды
// показывать ссылку на след день
// показывать ссылку на почасовой прогноз (до 3х дней)
// показывать ежедневный прогноз на 5 дней с возможность переходить на конкретный день
// карта восхода и заката
// показатель качества воздуха (короткий)
// ПРОГНОЗ АЛЛЕРГИИ (короткий)
//ПРОГНОЗ АЛЛЕРГИИ ссылка на страницу