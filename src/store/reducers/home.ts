import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../index';

export interface HomeState {
  num: number;
}

const initialState: HomeState = {
  num: 0,
}

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: state => {
      state.num += 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.num += action.payload
    }
  }
})

export const { increment, incrementByAmount } = counterSlice.actions;
export const selectHome = (state: RootState) => state.home;
export default counterSlice.reducer;