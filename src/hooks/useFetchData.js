import { useCallback, useState } from "react";

export function useFetching(callback) {
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [error, setError] = useState(true);
    const fetching = useCallback(async () => {
        try {
            setIsPostsLoading(true)
            await callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsPostsLoading(false)
        }
    }, [callback])

    return [fetching, isPostsLoading, error]
}
