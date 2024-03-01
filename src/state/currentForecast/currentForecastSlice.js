import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    currentCondition: {},
    horly: [],
    location: {},
    day: {},
    astro: {},
    success: null,
    days: [],
    placeId: null,
    monthSuccess: null,
    monthForecast: []
}

const currentForecastSlice = createSlice({
    name: 'currentForecast',
    initialState,
    reducers: {
        clearState: (state) => {
            state.loading = false;
            state.monthSuccess = null;

            state.horly = initialState.horly
            state.day = initialState.day
            state.astro = initialState.astro
            state.location = initialState.location
            state.days = initialState.days
            state.monthForecastmonthForecast = initialState.monthForecastmonthForecast
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchForecast.fulfilled, (state, { payload }) => {
                state.success = payload.success;
                state.placeId = payload.placeId;
                if (!payload.success) {
                    state.loading = false;
                    state.currentCondition = initialState.currentCondition
                    state.horly = initialState.horly
                    state.day = initialState.day
                    state.astro = initialState.astro
                    state.location = initialState.location
                    state.days = initialState.days
                    return
                }
                const forecastDay = payload.data.forecast.forecastday[0];
                state.loading = false;
                state.currentCondition = { ...payload.data.current };
                state.horly = [...forecastDay.hour];
                state.day = { ...forecastDay.day };
                state.days = [...payload.data.forecast.forecastday];
                state.astro = { ...forecastDay.astro };
                state.location = { ...payload.data.location };
            })
            .addCase(fetchForecastFor31Days.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchForecastFor31Days.fulfilled, (state, { payload }) => {
                state.monthSuccess = payload.monthSuccess;
                state.monthForecast = [...state.days, ...payload.response]
                state.loading = false;
            })
            .addCase(fetchForecastFor31Days.rejected, (state) => {
                state.loading = false;
            })
    }
}
)
export const fetchForecast = createAsyncThunk(
    'currentForecast/fetchForecast',
    async ({ Latitude, Longitude, placeId }) => {
        if (!Latitude ?? !Longitude) return { initialState, success: false };

        const { data } = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: import.meta.env.VITE_WETHER_API_KEY,
                q: `${Latitude},${Longitude}`,
                lang: 'ru',
                days: 14
            }
        })
        return { data, success: true, placeId };
    }
)
export const fetchForecastFor31Days = createAsyncThunk(
    'currentForecast/fetchForecastFor31Days',
    async ({ Latitude, Longitude }) => {
        if (!Latitude || !Longitude) return { monthSuccess: false };

        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 14)

        const promises = new Array(31).fill(null).map((_) => {
            startDate.setDate(startDate.getDate() + 1); //устанавливаем дату на один день вперед
            const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
            const day = startDate.getDate().toString().padStart(2, '0');
            return new Promise((res, rej) => {
                axios.get('https://api.weatherapi.com/v1/future.json', {
                    params: {
                        key: import.meta.env.VITE_WETHER_API_KEY,
                        q: `${Latitude},${Longitude}`,
                        lang: 'ru',
                        dt: `${startDate.getFullYear()}-${month}-${day}`
                    }
                }).then(({ data }) => res(data.forecast.forecastday[0]))
                    .catch(e => rej(e))
            })
        })
        const response = await Promise.all(promises);
        return { response, monthSuccess: true };
    }
)
export const { clearState } = currentForecastSlice.actions;
export default currentForecastSlice.reducer;