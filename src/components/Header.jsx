import { Link, useLocation } from "react-router-dom";
import Aside from "./Aside";
import { useSelector } from "react-redux";
import { joinFullName, prepareString } from "../utiles/utiles";
import SearchLocation from './SearchLocation'

import useCurrentWether from "../hooks/useCurrentWether";

const Header = () => {
    const location = useLocation();
    const isOnMainRoute = location.pathname === '/';
    const { temp, tempUnitName } = useSelector(state => state.settings.units)

    function handleBurgerClick(e) {
        document.body.classList.toggle('menu-open')
        e.stopPropagation();
    }

    const currentLocation = useSelector(state => state.recent.places)[0]
    const [currentCondition, isLoading] = useCurrentWether(currentLocation)
    const fullName = currentLocation && joinFullName(currentLocation) || '';
    const slicedFullName = prepareString(fullName, 34)


    return (
        <header className="header" style={(!isOnMainRoute && { backgroundColor: '#1f1f1f' }) || {}}>
            <div className="header__container">
                <div className="header__content">
                    <Link to="/" className="header__link">
                        <img src="../../images/sun.png" alt="" />
                        <span>DeniWeather</span>
                    </Link>
                    {!isOnMainRoute && (
                        <div className="header__widget">
                            <Link to={'/forecasts/Wether/' + currentLocation.Key} className="header__last-place-info">
                                {slicedFullName}
                                <div className="header__info">
                                    {Math.floor(currentCondition[temp])}°<span>{currentCondition[tempUnitName]}</span>
                                </div>
                                <div className="header__wether-icon">
                                    <img src={currentCondition?.condition?.icon} alt="" />
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