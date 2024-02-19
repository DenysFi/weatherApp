import { memo } from "react";
import { joinFullName } from "../utiles/utiles";
import { useDispatch } from "react-redux";
import { saveToRecentLocations } from "../state/recentLocations/recentSlice";

const LocationsList = memo(function LocationsList({ data, forwardToWetherPage, error }) {
    const dispatch = useDispatch();

    function onClick(place) {
        console.log(place);
        place.timestamp = Date.now();
        forwardToWetherPage(place.Key)
        dispatch(saveToRecentLocations(place))
    }
    return (
        <ul className="search__list">
            {
                data.length ? data.map((place) => {
                    const longName = joinFullName(place);
                    return (
                        <li key={place.Key} className="search__item" onClick={() => onClick(place)}>
                            <p className="search__name">{place.LocalizedName}</p>
                            <p className="search__long-name">{longName}</p>
                        </li>
                    )
                }) : error.length && (<li className="search__item error">
                    {error}
                </li>)
            }
        </ul>
    );
});

export default LocationsList;