import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    currentCondition: {},
    horly: {},
    location: {},
    day: {},
    astro: {}

}

const currentForecastSlice = createSlice({
    name: 'currentForecast',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchForecast.fulfilled, (state, { payload }) => {
            const forecastDay = payload.forecast.forecastday[0];

            state = {
                currentCondition: { ...payload.current },
                horly: { ...forecastDay.hour },
                day: { ...forecastDay.day },
                astro: { ...payload.astro },
                location: { ...payload.location }
            };

        })
    }
}
)
export const fetchForecast = createAsyncThunk(
    'currentForecast/fetchForecast',
    async (lat, lon) => {
        const { data } = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: import.meta.env.VITE_WETHER_API_KEY,
                q: `${lat},${lon}`,
                lang: 'ru'
            }
        })
        return data;
    }
)
export default currentForecastSlice.reducer;