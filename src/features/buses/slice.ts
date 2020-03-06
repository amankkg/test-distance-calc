import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {fetchBuses} from 'api'

const initialState = {
  entities: [] as Bus[],
  pending: false,
  error: null as string | null,
}

const fetchEntities = createAsyncThunk('buses/fetch', async (_, thunkApi) => {
  try {
    return await fetchBuses()
  } catch (error) {
    // @ts-ignore
    return thunkApi.rejectWithValue(error.message)
  }
})

export const thunks = {fetchEntities}

export const {actions, reducer} = createSlice({
  name: 'buses',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchEntities.pending, (state, action) => {
        state.pending = true
      })
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.pending = false
        state.entities = action.payload
      })
      .addCase(fetchEntities.rejected, (state, action) => {
        state.pending = false
        state.error = action.error
      }),
})
