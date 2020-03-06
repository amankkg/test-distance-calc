import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {calculateDistance} from 'api'

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
  async ({from, to}: {from: Destination; to: Destination}, thunkApi) =>
    await calculateDistance(from, to),
)

export const thunks = {fetchDistance}

export const {actions, reducer} = createSlice({
  name: 'estimate',
  initialState,
  reducers: {
    setKeywordFrom(state, action: PayloadAction<string>) {
      state.fromKeyword = action.payload
    },
    setKeywordTo(state, action: PayloadAction<string>) {
      state.toKeyword = action.payload
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
      })
      .addCase(fetchDistance.rejected, (state, action) => {
        state.pending = false
        state.error = action.error
      }),
})
