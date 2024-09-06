import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum CAT_TYPE {
  ALL = 0,
  WHITE = 1,
  LI = 2,
  CUP = 3,
}

export interface HomeState {
  currentCategory: CAT_TYPE;
}

const initialState: HomeState = {
  currentCategory: 0,
}

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    handleCategoryChange: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
    }
  }
})

export default counterSlice.reducer;