import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function usePageNavigate() {
    const navigate = useNavigate();

    const forwardToWetherPage = useCallback((key) => {
        navigate(`Wether/${key}`)
    }, [navigate])

    return forwardToWetherPage;
}
