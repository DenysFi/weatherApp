import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { joinFullName, prepareString } from "../utiles/utiles";
import Aside from "./Aside";
import SearchLocation from './SearchLocation';

const Header = () => {
    const location = useLocation();
    const isOnMainRoute = location.pathname === '/weatherApp';
    const { temp, tempUnitName } = useSelector(state => state.settings.units)
    const { currentCondition } = useSelector(state => state.currentForecast);

    function handleBurgerClick(e) {
        document.body.classList.toggle('menu-open')
        e.stopPropagation();
    }

    const currentLocation = useSelector(state => state.recent.places)[0]
    const fullName = currentLocation && joinFullName(currentLocation) || '';
    const slicedFullName = prepareString(fullName, 34)

    let currentItem = Math.floor(currentCondition[temp]);
    currentItem = isNaN(currentItem) ? '-' : currentItem;

    return (
        <header className="header" style={(!isOnMainRoute && { backgroundColor: '#1f1f1f' }) || {}}>
            <div className="header__container">
                <div className="header__content">
                    <Link to="/weatherApp" className="header__link">
                        <img src="../../weatherApp/images/sun.png" alt="" />
                        <span>DeniWeather</span>
                    </Link>
                    {!isOnMainRoute && (
                        <div className="header__widget">
                            <Link to={'/weatherApp/forecasts/Weather/' + currentLocation.Key} className="header__last-place-info">
                                {slicedFullName}
                                <div className="header__info">
                                    {currentItem}°<span>{currentCondition[tempUnitName]}</span>
                                </div>
                                <div className="header__wether-icon">
                                    {
                                        currentCondition.condition?.icon ? <img src={currentCondition.condition?.icon} /> : ''
                                    }
                                </div>
                            </Link>
                            <div className="header__search">
                                <SearchLocation header={true}></SearchLocation>
                            </div>
                        </div>
                    )}
                </div>

                <div className="header__burger-wrapper">
                    <button className="header__burger" onClick={handleBurgerClick}>
                        <span></span>
                    </button>
                </div>
                <Aside></Aside>
            </div>
        </header>
    );
};

export default Header;