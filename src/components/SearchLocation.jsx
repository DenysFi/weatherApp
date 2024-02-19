import { useRef, useState } from "react";
import useFetchCities from "../hooks/useFetchCities";
import useDebaunce from "../hooks/useDebounce";
import LocationsList from "./LocationsList";
import { getLocationByCoords } from "../utiles/utiles";
import usePageNavigate from "../hooks/usePageNavigate";
import { useDispatch } from "react-redux";
import { saveToRecentLocations } from "../state/recentLocations/recentSlice";

const SearchLocation = ({ header }) => {
    const forwardToWetherPage = usePageNavigate()
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
    const debouncedValue = useDebaunce(query);

    function handleQuery(e) {
        setQuery(e.target.value)
    }
    function clearQuery() {
        setQuery("")
    }
    const handleFocusOut = () => {
        setTimeout(() => {
            setIsFocused(false);
            inputRef?.current?.blur();
        }, 100)
    }

    const [data, _, error] = useFetchCities(debouncedValue)
    async function onPositionSuccess(pos) {
        const location = await getLocationByCoords(pos.coords);
        dispatch(saveToRecentLocations(location))
        console.log(location);
        forwardToWetherPage(location.LocalizedName || location.EnglishName)
    }

    function getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(onPositionSuccess);
    }

    return (
        <div className={"search " + (isFocused ? 'active' : '') + (header && ' _inHeader' || '')}>
            <div className="search__content">
                <svg className="search__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path transform="translate(3 3)" d="M7.186 13.554c-3.462 0-6.303-2.869-6.303-6.359C.883 3.681 3.724.837 7.186.837c3.437 0 6.278 2.844 6.278 6.358 0 3.49-2.865 6.359-6.278 6.359zm5.323-1.602a7.176 7.176 0 0 0 1.815-4.757c0-3.968-3.2-7.195-7.138-7.195C3.223 0 0 3.227 0 7.195c0 3.944 3.223 7.171 7.186 7.171a7.058 7.058 0 0 0 4.75-1.84L17.427 18l.573-.55-5.49-5.498z"></path></svg>
                <input
                    className="search__input"
                    placeholder="Search your adress"
                    type="text"
                    onChange={handleQuery}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleFocusOut}
                    value={query}
                    ref={inputRef}
                />
                <svg onClick={clearQuery} className={"search__clear " + ((query.length > 0 && "_clear-show") || '')} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 18 18"><g fillRule="evenodd" transform="translate(-1 -1)"><rect width="2" height="24" x="9" y="-2" rx="1" transform="rotate(45 10 10)"></rect><rect width="2" height="24" x="9" y="-2" rx="1" transform="rotate(-45 10 10)"></rect></g></svg>
            </div>
            <div className="search__wrapper " >
                <div className="search__result">
                    <div className="search__current-location" onClick={getCurrentPosition}>
                        <div className="search__current-location-icon">
                            <img src="https://www.awxcdn.com/adc-assets/images/icons/icon-gps.svg" alt="" />
                        </div>
                        <p>Use your current location</p>
                    </div>
                    <div className="search__current-result">
                        <LocationsList data={data} error={error} forwardToWetherPage={forwardToWetherPage}></LocationsList>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchLocation;