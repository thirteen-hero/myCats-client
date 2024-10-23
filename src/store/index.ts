import { configureStore } from "@reduxjs/toolkit";

import homeReducer from './reducers/home';
import profileReducer from './reducers/profile';
import cartReducer from './reducers/cart';

const store = configureStore({
  reducer: {
    home: homeReducer,
    profile: profileReducer,
    cart: cartReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export default store;