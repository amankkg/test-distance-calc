import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchGoogleMapsJsApi} from 'api'

const initialState = {
  placesApiReady: false,
  error: null as string | null,
}

export const initPlacesApiThunk = createAsyncThunk(
  'app/initPlacesApi',
  async (apiKey: string, thunkApi) => {
    try {
      await fetchGoogleMapsJsApi(apiKey)
    } catch (error) {
      // @ts-ignore
      thunkApi.rejectWithError(error.message)
    }
  },
)

export const {actions, reducer} = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(initPlacesApiThunk.fulfilled, (state, action) => {
        state.placesApiReady = true
      })
      .addCase(initPlacesApiThunk.rejected, (state, action) => {
        state.error = action.error
      }),
})
