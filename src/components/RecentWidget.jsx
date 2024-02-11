import usePageNavigate from "../hooks/usePageNavigate";

const RecentWidget = ({ place }) => {
    const forwardToWetherPage = usePageNavigate();

    function onClick() {
        forwardToWetherPage(place.Key)
    }

    return (
        <article onClick={onClick} className="recent__card card">
            <div className="card__location">
                <h4 className="card__title">{place.LocalizedName || place.EnglishName}</h4>
                <div className="card__title-country-label">{place.Country.LocalizedName}</div>
            </div>
            <div className="card__widget">
                <div className="card__icon">
                    <img src="../../public/images/assets/03.svg" alt="" />
                </div>
                <span className="card__tempr">
                    25°
                    <span>C</span>
                </span>
            </div>
            <div className="card__real-feel">
                Real feel <span>31°</span>
            </div>
        </article>
    );
};

export default RecentWidget;