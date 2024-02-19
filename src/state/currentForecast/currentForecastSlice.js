import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    currentCondition: {},
    horly: {},
    location: {}
}

const currentForecastSlice = createSlice({
    name: 'currentForecast',
    initialState,
    extraReducers: {

    }
}
)
const fetchForecast = createAsyncThunk(
    'currentForecast/fetchForecast',
    async (lat, lon) => {

    }
)