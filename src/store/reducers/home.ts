import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction 
} from '@reduxjs/toolkit';
import { message } from 'antd';

import { getSliders, getProduct } from '@/api/home';

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

export interface Product {
  title: string;
  video: string;
  poster: string;
  url: string;
  price: number;
  category: CAT_TYPE;
  id: string;
}

interface ProductPayload {
  category: CAT_TYPE;
  offset: number;
  limit: number;
  isRefresh: boolean;
}

export interface HomeState {
  currentCategory: CAT_TYPE;
  sliders: Slider[];
  product: {
    loading: boolean;
    list: Product[],
    hasMore: boolean;
    offset: number;
    limit: number;
  };
}

const initialState: HomeState = {
  currentCategory: CAT_TYPE.ALL,
  sliders: [],
  product: {
    loading: false,
    list: [],
    hasMore: false,
    offset: 0,
    limit: 5,
  },
}

export const getSliderData = createAsyncThunk('home/getSliders', async() => {
  return await getSliders();
})

export const getProductData = createAsyncThunk('home/getProduct', async(data: ProductPayload) => {
  const { category, offset, limit, isRefresh } = data;
  const result = await getProduct(category, offset, limit);
  result.data.offset = offset;
  result.data.isRefresh = isRefresh;
  return result;
})

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    handleCategoryChange: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
    },
    changeOffset: (state, _action) => {
      state.product.offset += 1; 
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
    .addCase(getProductData.pending, (state, _action) => {
      state.product.loading = true;
    })
    .addCase(getProductData.fulfilled, (state, action) => {
      const { list, hasMore, offset, isRefresh } = action.payload.data;
      state.product = {
        ...state.product,
        list: isRefresh ? list : [...state.product.list, ...list],
        hasMore,
        offset,
        loading: false,
      };
    })
    .addCase(getProductData.rejected, (state, action) => {
      state.product.loading = false;
      message.open({ content: action.error.message });
    })
  }
})

export default counterSlice.reducer;