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

export function removeFromLocalStorage(key) {
    if (typeof key !== 'string') {
        return;
    }
    const localStorage = window.localStorage;
    return localStorage.removeItem(key)
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
        return area.city.name === objectToCompare.city.name &&
            area.region.ID === objectToCompare.region.ID &&
            area.country.ID === objectToCompare.country.ID;
    });
}

export const replacedLocalizedNameToName = (data) => data.map((el) => ({ ...el, name: el.LocalizedName }))