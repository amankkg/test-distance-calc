import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {fetchDrivers} from 'api'

const initialState = {
  entities: [] as Driver[],
  pending: false,
  error: null as string | null,
}

const fetchEntities = createAsyncThunk(
  'drivers/fetchEntities',
  async (_, thunkApi) => {
    try {
      return await fetchDrivers
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  },
)

export const thunks = {
  fetchEntities,
}

export const {actions, reducer} = createSlice({
  name: 'drivers',
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
        state.error = null
      })
      .addCase(fetchEntities.rejected, (state, aciton) => {
        state.pending = false
        // @ts-ignore
        state.error = aciton.payload
      }),
})
