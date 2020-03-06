import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
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
      return await fetchDrivers()
    } catch (error) {
      // @ts-ignore
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
      })
      .addCase(fetchEntities.rejected, (state, aciton) => {
        state.pending = false
        state.error = aciton.error
      }),
})
