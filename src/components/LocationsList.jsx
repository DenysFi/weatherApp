import { memo } from "react";
import { getGeo, joinFullName } from "../utiles/utiles";
import { useDispatch } from "react-redux";
import { saveToRecentLocations } from "../state/recentLocations/recentSlice";

const LocationsList = memo(function LocationsList({ data, forwardToWetherPage, error }) {
    const dispatch = useDispatch();

    async function onClick({ ...place }) {

        place['GeoPostion'] = await getGeo(place);
        place.timestamp = Date.now();
        dispatch(saveToRecentLocations(place))
        forwardToWetherPage(place.EnglishName || place.LocalizedName || '')

    }
    return (
        <ul className="search__list">
            {
                data.length ? data.map((place) => {
                    const longName = joinFullName(place);
                    return (
                        <li key={place.Key} className="search__item" onMouseUp={() => onClick(place)}>
                            <p className="search__name">{place.LocalizedName}</p>
                            <p className="search__long-name">{longName}</p>
                        </li>
                    )
                }) : error.length > 0 && (<li className="search__item error">
                    {error}:
                    {(error === 'Network Error' ? ' Maximum number of search requests exceeded (50 per day), please use recent location.' : '')}
                </li>)
            }
        </ul>
    );
});

export default LocationsList;

