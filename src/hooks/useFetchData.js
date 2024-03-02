import { useCallback, useState } from "react";

export function useFetching(callback) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fetching = useCallback(async () => {
        try {
            setIsLoading(true)
            await callback();
        } catch (e) {
            setError(e.message);

        } finally {
            setIsLoading(false)
        }
    }, [callback])

    return [fetching, isLoading, error]
}
