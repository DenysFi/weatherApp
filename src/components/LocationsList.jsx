import { memo } from "react";
import { saveToRecentLocations } from "../utiles/utiles";

const LocationsList = memo(function LocationsList({ data, forwardToWetherPage }) {

    function onClick(place) {
        forwardToWetherPage(place.Key)
        saveToRecentLocations(place)
    }

    return (
        <ul className="search__list">
            {
                data?.map((place) => {
                    const longName = [place.LocalizedName, place.AdministrativeArea.LocalizedName, place.Country.ID].join(', ')

                    return (
                        <li key={place.Key} className="search__item" onClick={() => onClick(place)}>
                            <p className="search__name">{place.LocalizedName}</p>
                            <p className="search__long-name">{longName}</p>
                        </li>
                    )
                })
            }
        </ul>
    );
});

export default LocationsList;