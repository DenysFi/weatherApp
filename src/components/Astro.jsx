import { convertTime12to24, diffInHours } from '../utiles/utiles';

export default function Astro({ astro }) {
    const sunset = convertTime12to24(astro.sunset);
    const moonset = !!astro.moonset && astro.moonset.replace(/AM|PM/, '');
    const sunrise = !!astro.sunrise && astro.sunrise.replace(/AM|PM/, '');
    let moonrise = convertTime12to24(astro.moonrise);
    moonrise = !!astro.moonrise && isNaN(astro.moonrise.replace(/AM|PM|:/g, '')) ? '-' : moonrise;
    const sunDuration = diffInHours(sunrise, sunset);
    const moonDuration = diffInHours(moonrise, moonset);
    return (
        <div className='astro'>
            <div className="astro__items">
                <article className="astro__item">
                    <div className="astro__line">
                        <div className="astro__icon">
                            <img src="../../images/assets/sun.png" alt="" />
                        </div>
                        <div className="astro__time">
                            <p>{sunDuration?.hours}ч</p>
                            <span>{sunDuration?.minutes}м</span>
                        </div>
                    </div>
                    <div className="astro__line">
                        <p className="astro__sunrise">Восход</p>
                        <span>{sunrise}</span>
                    </div>
                    <div className="astro__line">
                        <p className="astro__sunrise">Закат</p>
                        <span>{sunset}</span>
                    </div>
                </article>
                <article className="astro__item">
                    <div className="astro__line">
                        <div className="astro__icon">
                            <img src="../../images/assets/moon.png" alt="" />
                        </div>
                        <div className="astro__time">
                            <p>{isNaN(moonDuration?.hours) ? '-' : moonDuration.hours} ч</p>
                            <span>{isNaN(moonDuration?.minutes) ? '-' : moonDuration?.minutes} м</span>
                        </div>
                    </div>
                    <div className="astro__line">
                        <p className="astro__sunrise">Восход</p>
                        <span>{moonrise && isNaN(+moonrise.replace(/:/g, '')) ? '-' : moonrise}</span>
                    </div>
                    <div className="astro__line">
                        <p className="astro__sunrise">Закат</p>
                        <span>{moonset}</span>
                    </div>
                </article>
            </div>
        </div>
    )
}
