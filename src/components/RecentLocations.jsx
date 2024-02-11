import { getFromLocalStorage } from "../utiles/utiles";
import RecentWidget from "./RecentWidget";

const RecentLocations = () => {
    const recentLocations = getFromLocalStorage('places') || []

    return (
        <section className="recent__locations">
            <h5 className="recent__title">Recent locations</h5>
            <div className="recent__cards">
                {
                    recentLocations.length > 0 && recentLocations.map((place) => {
                        return (
                            <RecentWidget key={place.Key} place={place}></RecentWidget>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default RecentLocations;  