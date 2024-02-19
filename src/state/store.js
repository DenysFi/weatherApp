import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from './settings/settingsSlice.js'
import recentSlice from "./recentLocations/recentSlice.js";
import currentForecastSlice from "./currentForecast/currentForecastSlice.js";

export const settingsStore = configureStore(
    {
        reducer: {
            settings: settingsReducer,
            recent: recentSlice,
            currentForecast: currentForecastSlice
        }
    }
)