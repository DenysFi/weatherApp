import RecentWidget from "./RecentWidget";
import useFetchCurrentCondition from "../hooks/useFetchCurrentCondition";
import WidgetSkeleton from "./WidgetSkeleton";
import { useSelector } from "react-redux";

const RecentLocations = () => {
    const locations = useSelector((state) => state.recent.places)
    const [recentLocations, isLoading] = useFetchCurrentCondition(locations);
    return (
        <section className="recent__locations">
            <h5 className="recent__title">Recent locations</h5>
            <div className="recent__cards">
                {isLoading ?
                    (new Array(locations.length).fill(null).map((_, i) => <WidgetSkeleton key={i} />))
                    : recentLocations.length > 0 && recentLocations.map((place) => {
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