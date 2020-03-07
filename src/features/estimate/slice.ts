import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  from: null as Destination | null,
  to: null as Destination | null,
  fromKeyword: '',
  toKeyword: '',
  distance: null as number | null,
}

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
    setDestinationFrom(state, action: PayloadAction<Destination & {distance?: number}>) {
      state.from = action.payload
      state.fromKeyword = action.payload.name
      state.distance = action.payload.distance ?? null
    },
    setDestinationTo(state, action: PayloadAction<Destination & {distance?: number}>) {
      state.to = action.payload
      state.toKeyword = action.payload.name
      state.distance = action.payload.distance ?? null
    },
  },
})
