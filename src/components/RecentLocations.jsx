const RecentLocations = () => {
    return (
        <section className="recent__locations">
            <h5 className="recent__title">Recent locations</h5>
            <div className="recent__cards">
                <article className="recent__card card">
                    <div className="card__location">
                        <h4 className="card__title">Krivoy Rih</h4>
                        <div className="card__title-country-label">Ukraine</div>
                    </div>
                    <div className="card__widget">
                        <div className="card__icon">  <img src="../../public/images/assets/03.svg" alt="" /></div>
                        <span className="card__tempr">
                            25°
                            <span>C</span>
                        </span>
                    </div>
                    <div className="card__real-feel">
                        Real feel <span>31°</span>
                    </div>
                </article>
                <article className="recent__card card">
                    <div className="card__location">
                        <h4 className="card__title">Krivoy Rih</h4>
                        <div className="card__title-country-label">Ukraine</div>
                    </div>
                    <div className="card__widget">
                        <div className="card__icon">  <img src="../../public/images/assets/03.svg" alt="" /></div>
                        <span className="card__tempr">
                            25°
                            <span>C</span>
                        </span>
                    </div>
                    <div className="card__real-feel">
                        Real feel <span>31°</span>
                    </div>
                </article>
                <article className="recent__card card">
                    <div className="card__location">
                        <h4 className="card__title">Krivoy Rih</h4>
                        <div className="card__title-country-label">Ukraine</div>
                    </div>
                    <div className="card__widget">
                        <div className="card__icon">
                            <img src="../../public/images/assets/03.svg" alt="" />
                        </div>
                        <span className="card__tempr">
                            25°<span>C</span>
                        </span>
                    </div>
                    <div className="card__real-feel">
                        Real feel <span>31°</span>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default RecentLocations;  