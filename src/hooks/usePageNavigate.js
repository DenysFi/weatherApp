import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function usePageNavigate() {
    const navigate = useNavigate();

    const forwardToWetherPage = useCallback((name) => {
        navigate(`/forecasts/Wether/${name.replace(' ', '-')}`)
    }, [navigate])

    return forwardToWetherPage;
}
