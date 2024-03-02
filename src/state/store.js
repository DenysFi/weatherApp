import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from './settings/settingsSlice.js'
import currentForecastReducer from './currentForecast/currentForecastSlice.js'
import recentReducer from "./recentLocations/recentSlice.js";

export const settingsStore = configureStore(
    {
        reducer: {
            settings: settingsReducer,
            recent: recentReducer,
            currentForecast: currentForecastReducer
        }
    }
)