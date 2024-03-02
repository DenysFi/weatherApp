import { useSelector } from "react-redux";

export default function withForecast(Component) {
    return function ForecastWrapper({ ...props }) {
        const { success, monthSuccess } = useSelector(state => state.currentForecast)
        return (
            <>
                {!(success || monthSuccess) ? (
                    <h4 className='errorLoading' style={(success !== null && !success) ? { opacity: '1' } : {}}>
                        Данные о текущей локации отсутствуют.
                    </h4>
                )
                    : <Component {...props} />}
            </>
        )
    };
}

