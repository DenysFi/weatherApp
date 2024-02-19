import { useDispatch, useSelector } from "react-redux";
import usePageNavigate from "../hooks/usePageNavigate";
import { prepareString } from "../utiles/utiles";
import { saveToRecentLocations } from "../state/recentLocations/recentSlice";

const RecentWidget = ({ place }) => {
    const forwardToWetherPage = usePageNavigate();
    const dispatch = useDispatch();

    const cityName = prepareString((place.LocalizedName || place.EnglishName), 15);
    const countryName = prepareString((place.Country.LocalizedName || place.Country.EnglishName), 24);

    const currentUnits = useSelector((state => state.settings.units))
    const tempValue = Math.floor(place.info.Temperature[currentUnits.unitName].Value);
    const tempUnit = place.info.Temperature[currentUnits.unitName].Unit
    // доделать идею с роутером и его лоадером!!!
    function onClick() {
        forwardToWetherPage((place.EnglishName || place.LocalizedName))
        dispatch(saveToRecentLocations(place))

    }

    return (
        <article onClick={onClick} className="recent__card card">
            <div className="card__location">
                <h4 className="card__title">{cityName}</h4>
                <div className="card__title-country-label">{countryName}</div>
            </div>
            <div className="card__widget">
                <div className="card__icon">
                    <svg>
                        <use xlinkHref={"../../images/icons.svg#" + place.info.WeatherIcon}></use>
                    </svg>
                </div>
                <span className="card__tempr">
                    {tempValue}°
                    <span>{tempUnit}</span>
                </span>
            </div>
            <div className="card__real-feel">
                Real feel <span> {tempValue}°</span>
            </div>
        </article>
    );
};

export default RecentWidget;
