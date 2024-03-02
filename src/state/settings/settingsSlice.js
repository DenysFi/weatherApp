import { createSlice } from "@reduxjs/toolkit"
const metric = {
    unitName: 'Metric',
    gust: 'gust_kph',
    tempUnitName: 'c',
    speedUnitName: 'км/ч',
    speedUnit: 'км',
    wind: 'wind_kph',
    feelslike: 'feelslike_c',
    temp: 'temp_c',
    maxtemp: 'maxtemp_c',
    mintemp: 'mintemp_c',
    maxwindspeed: 'maxwind_kph',
    totalprecip: 'totalprecip_mm',
    precipUnit: 'мм',
    precip: 'precip_mm',
    avgvis: 'avgvis_km',
    vis: 'vis_km',
    pressure: 'pressure_mb',
    pressureUnit: 'мбар',
    dewpoint: 'dewpoint_c'
}
const imperial = {
    unitName: 'Imperial',
    tempUnitName: 'F',
    speedUnitName: 'миль/ч',
    speedUnit: 'м',
    gust: 'gust_mph',
    totalprecip: 'totalprecip_in',
    wind: 'wind_mph',
    feelslike: 'feelslike_f',
    temp: 'temp_f',
    maxtemp: 'maxtemp_f',
    mintemp: 'mintemp_f',
    maxwindspeed: 'maxwind_mph',
    precipUnit: 'д',
    precip: 'precip_in',
    avgvis: 'avgvis_miles',
    vis: 'vis_miles',
    pressure: 'pressure_in',
    pressureUnit: 'д.рт',
    dewpoint: 'dewpoint_f'
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