import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

import {fetchGoogleMapsJsApi, getDistance} from 'api'

const initialState = {
  placesApiReady: false,
  from: null as Destination | null,
  to: null as Destination | null,
  fromKeyword: '',
  toKeyword: '',
  distance: null as number | null,
  pending: false,
  error: null as string | null,
}

const initPlacesApi = createAsyncThunk(
  'estimate/initPlacesApi',
  async (apiKey: string, thunkApi) => {
    try {
      await fetchGoogleMapsJsApi(apiKey)
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  },
)

const fetchDistance = createAsyncThunk(
  'estimate/fetchDistance',
  async ({from, to}: {from: LatLng; to: LatLng}, thunkApi) => {
    try {
      const response = await getDistance(from, to)

      const distance = response.rows[0].elements[0].distance?.value ?? null

      if (distance === null) throw new Error('route not found')

      return distance
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  },
)

export const thunks = {initPlacesApi, fetchDistance}

export const {actions, reducer} = createSlice({
  name: 'estimate',
  initialState,
  reducers: {
    setKeywordFrom(state, action: PayloadAction<string>) {
      if (state.fromKeyword === action.payload) return

      state.fromKeyword = action.payload
      state.from = null
    },
    setKeywordTo(state, action: PayloadAction<string>) {
      if (state.toKeyword === action.payload) return

      state.toKeyword = action.payload
      state.to = null
    },
    setDestinationFrom(state, action: PayloadAction<Destination>) {
      state.from = action.payload
      state.fromKeyword = action.payload.name
    },
    setDestinationTo(state, action: PayloadAction<Destination>) {
      state.to = action.payload
      state.toKeyword = action.payload.name
    },
  },
  extraReducers: builder =>
    builder
      .addCase(initPlacesApi.fulfilled, (state, action) => {
        state.placesApiReady = true
        state.error = null
      })
      .addCase(initPlacesApi.rejected, (state, action) => {
        // @ts-ignore
        state.error = action.error
      })
      .addCase(fetchDistance.pending, (state, action) => {
        state.distance = null
        state.pending = true
      })
      .addCase(fetchDistance.fulfilled, (state, action) => {
        state.distance = action.payload
        state.pending = false
        state.error = null
      })
      .addCase(fetchDistance.rejected, (state, action) => {
        state.pending = false
        // @ts-ignore
        state.error = action.payload
      }),
})
