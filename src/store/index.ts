import { configureStore } from "@reduxjs/toolkit";

import homeReducer from './reducers/home';
import profileReducer from './reducers/profile';

const store = configureStore({
  reducer: {
    home: homeReducer,
    profile: profileReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export default store;