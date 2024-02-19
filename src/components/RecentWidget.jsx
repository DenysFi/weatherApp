import { useDispatch, useSelector } from "react-redux";
import usePageNavigate from "../hooks/usePageNavigate";
import { prepareString } from "../utiles/utiles";
import { saveToRecentLocations } from "../state/recentLocations/recentSlice";

const RecentWidget = ({ place }) => {
    const forwardToWetherPage = usePageNavigate();
    const dispatch = useDispatch();

    const cityName = prepareString((place.LocalizedName || place.EnglishName), 15);
    const countryName = prepareString((place.Country.LocalizedName || place.Country.EnglishName), 24);

    const { temp, tempUnitName, feelslike } = useSelector((state => state.settings.units))
    const tempValue = Math.floor(place.info[temp]);
    const feelsValue = Math.floor(place.info[feelslike]);
    const tempUnit = place.info[tempUnitName]

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
                    <img src={place.info.condition.icon} alt="" />
                </div>
                <span className="card__tempr">
                    {tempValue}°
                    <span>{tempUnit}</span>
                </span>
            </div>
            <div className="card__real-feel">
                Real feel <span> {feelsValue}°</span>
            </div>
        </article>
    );
};

export default RecentWidget;
