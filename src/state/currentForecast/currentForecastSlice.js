import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    currentCondition: {},
    horly: [],
    location: {},
    day: {},
    astro: {}

}

const currentForecastSlice = createSlice({
    name: 'currentForecast',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchForecast.fulfilled, (state, { payload }) => {
                const forecastDay = payload.forecast.forecastday[0];
                state.loading = false;
                state.currentCondition = { ...payload.current };
                state.horly = [...forecastDay.hour];
                state.day = { ...forecastDay.day };
                state.astro = { ...payload.astro };
                state.location = { ...payload.location };
            })
    }
}
)
export const fetchForecast = createAsyncThunk(
    'currentForecast/fetchForecast',
    async ({ Latitude, Longitude }) => {
        const { data } = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: import.meta.env.VITE_WETHER_API_KEY,
                q: `${Latitude},${Longitude}`,
                lang: 'ru'
            }
        })
        return data;
    }
)
export default currentForecastSlice.reducer;