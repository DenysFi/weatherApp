import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinFullName, prepareString } from "../utiles/utiles";
import ForecastLink from "./ForecastLink";

const Aside = () => {
    const recentLocations = useSelector(state => state.recent.places)
    const lastRecentPlace = recentLocations[0];
    console.log(lastRecentPlace);
    const fullName = lastRecentPlace && joinFullName(lastRecentPlace) || '';
    const slicedFullName = prepareString(fullName, 34)

    const navigate = useNavigate();
    function closeAside() {
        document.body.classList.remove('menu-open');
    }

    function onTransition(e) {
        e.stopPropagation();
        navigate('/weatherApp/settings')
        closeAside();
    }

    useEffect(() => {
        function handleClick(e) {
            const target = e.target;
            const close = document.body.classList.contains('menu-open')
                && (!target.closest('.burger-content')?.classList?.contains('burger-content')
                    || !target?.classList.contains('burger-content')
                    || target.classList.contains('burger-content__close-btn'));

            if (close) {
                closeAside();
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return (
        <aside className="header__burger-content burger-content" >
            <div className="burger-content__line">
                <div className="burger-content__settings" onClick={onTransition}>
                    <svg className="icon-settings" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="#000000"><path d="M13.677.107l.871 2.674c.775.225 1.549.483 2.162.902l2.58-1.32 2.452 2.447-1.29 2.578c.354.612.645 1.353.87 2.094l2.678.902v3.414l-2.645.838c-.258.773-.549 1.578-.903 2.255l1.29 2.48-2.452 2.449-2.58-1.224c-.645.386-1.387.676-2.162.902l-.87 2.609h-3.42l-.903-2.61c-.742-.225-1.484-.482-2.161-.934L4.742 21.82 2.29 19.372l1.29-2.449c-.386-.676-.677-1.45-.903-2.255L0 13.798v-3.447l2.71-.902c.193-.74.451-1.481.87-2.094L2.29 4.843l2.452-2.449 2.452 1.289c.677-.387 1.419-.677 2.16-.902l.904-2.674h3.42zm-.838 1.128h-1.807l-.806 2.448-.549.193c-.677.194-1.354.419-1.935.773l-.548.29-2.29-1.16L3.58 5.1l1.225 2.384-.354.548c-.323.483-.581 1.127-.71 1.74l-.13.612-2.515.805v1.804l2.451.805.194.58c.193.677.42 1.385.774 1.965l.29.548-1.16 2.287L4.967 20.5l2.322-1.16.549.355c.58.354 1.226.612 1.903.773l.548.193.775 2.32h1.838l.774-2.417.581-.128c.677-.194 1.323-.42 1.903-.741l.484-.322 2.42 1.127 1.322-1.32-1.161-2.288.29-.483c.323-.645.58-1.353.774-2.062l.194-.58 2.42-.74V11.19l-2.452-.805-.194-.548c-.193-.677-.42-1.32-.742-1.836l-.29-.548 1.161-2.384-1.322-1.353-2.388 1.256-.548-.354a7.5 7.5 0 00-1.903-.74l-.58-.194-.807-2.448zm-.871 5.38c3.032 0 5.548 2.448 5.548 5.508 0 3.028-2.516 5.541-5.548 5.541-3.065 0-5.516-2.545-5.516-5.54a5.49 5.49 0 015.516-5.51zm0 1.063c-2.323 0-4.355 2.093-4.355 4.445 0 2.352 2.032 4.446 4.355 4.446 2.322 0 4.387-2.126 4.387-4.446 0-2.352-2.065-4.445-4.387-4.445z"></path></svg>
                    Settings
                </div>
                <div className="burger-content__close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 18 18"><g fillRule="evenodd" transform="translate(-1 -1)"><rect width="2" height="24" x="9" y="-2" rx="1" transform="rotate(45 10 10)"></rect><rect width="2" height="24" x="9" y="-2" rx="1" transform="rotate(-45 10 10)"></rect></g></svg>
                </div>
            </div>
            <div className="burger-content__last-location" onClick={(e) => e.stopPropagation()}>
                <p className="burger-content__full-name">{slicedFullName}</p>
                <ul className="burger-content__forecast">
                    <ForecastLink path={'/weatherApp/forecasts/Weather/' + lastRecentPlace.EnglishName.replace(' ', '-')} label={'Today'} classNames={'burger-content'}></ForecastLink>
                    <ForecastLink path={'/weatherApp/forecasts/hourly-forecast/' + lastRecentPlace.EnglishName.replace(' ', '-')} label={'Hourly'} classNames={'burger-content'}></ForecastLink>
                    <ForecastLink path={'/weatherApp/forecasts/daily-forecast/' + lastRecentPlace.EnglishName.replace(' ', '-')} label={'Daily'} classNames={'burger-content'}></ForecastLink>
                </ul>
            </div>
        </aside>
    );
};

export default Aside;