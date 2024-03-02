import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function usePageNavigate() {
    const navigate = useNavigate();

    const forwardToWetherPage = useCallback((name) => {
        if (!name) return;

        navigate(`/weatherApp/forecasts/Weather/${name.replace(' ', '-')}`)
    }, [navigate])

    return forwardToWetherPage;
}

