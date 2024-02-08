import { useEffect, useState } from "react"

export default function useDebaunce(value, delay = 200) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => clearInterval(timeoutId);
    }, [value, delay])
    return debouncedValue;
}