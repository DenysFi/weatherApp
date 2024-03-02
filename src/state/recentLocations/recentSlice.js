import { createSlice } from "@reduxjs/toolkit";
import { findDoubles, getFromLocalStorage, saveToLocalStorage } from "../../utiles/utiles";

const initialState = {
    places: (getFromLocalStorage('places') || [
        {
            "Version": 1,
            "Key": "324505",
            "Type": "City",
            "Rank": 20,
            "LocalizedName": "Киев",
            "name": 'Kiyv',
            "Country": {
                "ID": "UA",
                "LocalizedName": "Украина"
            },
            "AdministrativeArea": {
                "ID": "30",
                "LocalizedName": "Киев"
            },
            "GeoPostion": {
                "Longitude": 30.5241361,
                "Latitude": 50.4500336,
                "success": true
            },
            "timestamp": 1709310178273
        }
    ])
}

const recentSlice = createSlice({
    name: 'recent',
    initialState,
    reducers: {
        saveToRecentLocations: (state, { payload }) => {
            payload.timestamp = Date.now();
            let recentPlaces = !findDoubles(state.places, payload, 'Key') ? [payload, ...state.places].slice(0, 3) : sortByTimestamp([...state.places], payload);

            state.places = recentPlaces;
            saveToLocalStorage(recentPlaces, 'places')
        }
    }
}
)

function sortByTimestamp(places, newPlace) {
    return places.map(place => place.Key === newPlace.Key ? newPlace : place)
        .sort((a, b) =>
            b.timestamp - a.timestamp
        );

}

export const { saveToRecentLocations } = recentSlice.actions
export default recentSlice.reducer;