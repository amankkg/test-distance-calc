import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {getDistance} from 'api'

const initialState = {
  from: null as Destination | null,
  to: null as Destination | null,
  fromKeyword: '',
  toKeyword: '',
  distance: null as number | null,
  pending: false,
  error: null as string | null,
}

const fetchDistance = createAsyncThunk(
  'estimate/fetchDistance',
  async ({from, to}: {from: LatLng; to: LatLng}, thunkApi) => {
    try {
      const response = await getDistance(from, to)

      return response.rows[0].elements[0].distance.value
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  },
)

export const thunks = {fetchDistance}

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
