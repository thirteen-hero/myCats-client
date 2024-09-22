import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction 
} from '@reduxjs/toolkit';
import { message } from 'antd';

import { getSliders } from '@/api/home';

export enum CAT_TYPE {
  ALL = 0,
  WHITE = 1,
  LI = 2,
  CUP = 3,
}

interface Slider {
  url: string;
  id: string;
}

export interface HomeState {
  currentCategory: CAT_TYPE;
  sliders: Slider[];
}

const initialState: HomeState = {
  currentCategory: 0,
  sliders: [],
}

export const getSliderData = createAsyncThunk('home/getSliders', async() => {
  return await getSliders();
})

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    handleCategoryChange: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getSliderData.fulfilled, (state, action) => {
      state.sliders = action.payload.data;
    })
    .addCase(getSliderData.rejected, (_state, action) => {
      message.open({ content: action.error.message });
    })
  }
})

export default counterSlice.reducer;