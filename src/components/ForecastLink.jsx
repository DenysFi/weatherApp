import { Link, useLocation } from "react-router-dom";

const ForecastLink = ({ path, label, classNames }) => {
    let location = useLocation();
    const isActive = decodeURIComponent(location.pathname) === path;
    return (
        <li className={classNames + "__item" + (isActive ? ' active' : '')}>
            <Link to={path} className={classNames + "__link "}>{label}</Link>
        </li>
    );
};

export default ForecastLink;