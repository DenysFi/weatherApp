import { createSlice } from "@reduxjs/toolkit"
const metric = {
    unitName: 'Metric',
    gust: 'gust_kph',
    tempUnitName: 'c',
    speedUnitName: 'k/ph',
    wind: 'wind_kph',
    feelslike: 'feelslike_c',
    temp: 'temp_c'
}
const imperial = {
    unitName: 'Imperial',
    tempUnitName: 'f',
    speedUnitName: 'm/ph',
    gust: 'gust_mph',
    wind: 'wind_mph',
    feelslike: 'feelslike_f',
    temp: 'temp_f'
}
const initialState = {
    units: metric,
    language: 'ru'
}

const settingsSlice = createSlice(
    {
        name: 'settings',
        initialState,
        reducers: {
            setUnits: (state, action) => {
                let units = action.payload === 'Metric'
                    ? metric
                    : imperial

                state.units = units;
            }
        }
    }
)
export const { setUnits } = settingsSlice.actions
export default settingsSlice.reducer;