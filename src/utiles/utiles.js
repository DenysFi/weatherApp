import { convertLength } from "@mui/material/styles/cssUtils";
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
            apikey: import.meta.env.VITE_ACCUWEATHER_API_KEY,
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

export function joinFullName({ name = '', LocalizedName = '', AdministrativeArea = '', Country = '', EnglishName = '' }) {
    return [(name || LocalizedName || EnglishName), (AdministrativeArea.LocalizedName || AdministrativeArea.EnglishName), Country.ID].filter(str => str).join(', ');
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
    data = data.find(location => location.country === place.Country.ID) || [];
    return { Longitude: data?.lon, Latitude: data?.lat, success: !(data.length === 0) }

}

export function getUvColor(index) {
    const color =
        index < 3 ? ['green', 'хороший'] :
            index < 6 ? ['rgb(255, 187, 0)', 'Умеренный'] :
                index < 8 ? ['rgb(255, 119, 33)', 'Средний'] :
                    index < 11 ? ['rgb(255, 0, 0)', 'Опасный'] : [`rgb(210, 39, 255)`, 'Очень опасный']

    return color
}
export function convertTime12to24(time) {
    if (!time) return;

    let [h, m] = time.split(/[:\s]/);

    return `${(+h + 12) > 23 ? '00' : (+h + 12)}:${m}`;
}

function timeToMinutes(time) {
    let [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

export function diffInHours(start, end) {
    if (!(start || end)) return;
    let startMinutes = timeToMinutes(start);
    let endMinutes = timeToMinutes(end);
    let diffMinutes = endMinutes - startMinutes;

    if (diffMinutes < 0) {
        diffMinutes += 24 * 60;
    }

    let hours = Math.floor(diffMinutes / 60);
    let minutes = diffMinutes % 60;
    return { hours, minutes };
}

export function countAvg(data) {
    return data.filter(Boolean).reduce((acc, value) => acc += value, 0) / data.length;
}

export function getMonthName(index) {
    const monthNames = ['Января', 'Февраля', 'Марта', 'апреля', 'мая', 'июля', 'июня', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return monthNames[index];
}
export function countAvgStr(winddirections) {
    const joined = winddirections.filter(Boolean).join(' ');

    let result = winddirections[0];
    let count = 0;

    Array.from(new Set(winddirections)).forEach(direction => {
        const length = joined.match(new RegExp(`\\b${direction}\\b`, 'gi'))?.length || 0;
        [result, count] = length > count ? [direction, length] : [result, count];
    })

    return result;
}