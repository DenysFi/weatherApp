import axios from "axios";

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

export function findDoubles(array, objectToCompare, key) {
    return array.some((place) => place[key] === objectToCompare[key]);
}

export const replacedLocalizedNameToName = (data) => data.map((el) => ({ ...el, name: el.LocalizedName }))

export async function getLocationByCoords({ latitude, longitude }) {
    const { data } = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search', {
        params: {
            apikey: import.meta.env.VITE_ACCUWETHER_API_KEY,
            language: import.meta.env.VITE_LOCALE_LANGUAGE,
            q: `${latitude}, ${longitude}`,
            toplevel: true
        }
    })

    return data;
}

// export function saveToRecentLocations(place) {
//     const localeStorageData = getFromLocalStorage('places') || []

//     if (findDoubles(localeStorageData, place, 'Key')) return;

//     const recentPlaces = [...localeStorageData, place].slice(-3);
//     saveToLocalStorage(recentPlaces, 'places')
// }

export function joinFullName({ LocalizedName = '', AdministrativeArea = '', Country = '', EnglishName = '' }) {
    return [(LocalizedName || EnglishName), (AdministrativeArea.LocalizedName || AdministrativeArea.EnglishName), Country.ID].filter(str => str).join(', ');
}
export function prepareString(str, maxLength) {
    return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}
export async function getGeo(place) {
    const name = (place.EnglishName || place.LocalizedName);
    let { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
            q: name,
            limit: 50,
            appid: import.meta.env.VITE_GEO_API_KEY
        }
    })
    data = data.find(location => location.country === place.Country.ID);
    return { Longitude: data?.lon, Latitude: data?.lat }

}