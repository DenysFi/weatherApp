export function saveToLocalStorage(data, key) {
    if (typeof key !== 'string') {
        return;
    }
    const localStorage = window.localStorage;
    localStorage.setItem(key, JSON.stringify(data))
}
export function getFromLocalStorage(key) {
    if (typeof key !== 'string') {
        return;
    }
    const localStorage = window.localStorage;
    return JSON.parse(localStorage.getItem(key))
}
export function isStoreByKey(key) {
    if (typeof key !== 'string') {
        return;
    }
    const localStorage = window.localStorage;
    return !!localStorage.getItem(key);
}
export function findDoubles(array, objectToCompare) {
    return !array.some((area) => {
        return area.city === objectToCompare.city &&
            area.region === objectToCompare.region &&
            area.country === objectToCompare.country;
    });
}