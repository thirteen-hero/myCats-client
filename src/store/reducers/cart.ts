import { 
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { message } from "antd";

import { Product } from './home';

export interface CartItem { 
  id: string;
  product: Product;
  count: number;
  checked: boolean;
}

const initialState: CartItem[]= [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 购物车内新增商品
    addCartItem: (state, action) => {
      const existProduct = state.find((item: CartItem) => item.product.id === action.payload.id);
      if (existProduct) {
        existProduct.count++;
      } else {
        state.push({
          id: action.payload.id,
          product: action.payload,
          count: 1,
          checked: false,
        });
      }
      message.success('添加购物车成功！');
    },
    // 购物车内删除商品
    removeCartItem: (state, action) => {
      const removeIndex = state.findIndex((item: CartItem) => item.product.id === action.payload.id);
      if (removeIndex !== -1) {
        if (state[removeIndex].count >= 1)
        state[removeIndex].count--;
      } else {
        state.splice(removeIndex, 1);
      }
      message.success('修改商品数量成功！');
    },
    // 清空购物车
    clearCartItem: (state) => {
      state = [];
    },
    // 变更购物车内商品数量
    changeCartItemCount: (state, action) => {
      const currIndex = state.findIndex((item: CartItem) => item.product.id === action.payload.id);
      if (currIndex !== -1) {
        state[currIndex].count = action.payload.count;
      }
    },
    // 修改选中商品条目
    changeCheckedCartItem: (state, action) => {
      const currIndex = state.findIndex((item: CartItem) => item.product.id === action.payload.id);
      if (currIndex !== -1) {
        state[currIndex].checked = !state[currIndex].checked;
      }
    },
    // 结算
    settle: () => {

    }
  },
  extraReducers: builder => {

  }
})

export default cartSlice.reducer;