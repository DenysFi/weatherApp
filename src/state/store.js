import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from './settings/settingsSlice.js'
import recentSlice from "./recentLocations/recentSlice.js";

export const settingsStore = configureStore(
    {
        reducer: {
            settings: settingsReducer,
            recent: recentSlice,
        }
    }
)