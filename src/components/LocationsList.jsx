import { memo } from "react";
import { useNavigate } from "react-router-dom";

const LocationsList = memo(function LocationsList({ data }) {
    const navigate = useNavigate();


    function forwardToWetherPage(key) {
        navigate(`Wether/${key}`)
    }

    function saveToRecentLocations() {

    }

    function onClick(place) {
        forwardToWetherPage(place.Key)
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