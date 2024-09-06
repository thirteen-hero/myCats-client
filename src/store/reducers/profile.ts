import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userName: string;
  email: string;
  avatar: string;
}

export enum LOGIN_TYPE {
  UN_VALIDATE = 'UN_VALIDATE',
  LOGINED = 'LOGINED',
  UN_LOGINED = 'UN_LOGINED',
}

export interface ProfileState {
  loginState: LOGIN_TYPE;
  user: User | null;
  error: string | null;
}

const initialState: ProfileState = {
  loginState: LOGIN_TYPE.UN_VALIDATE,
  user: null,
  error: null,
}

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  }
})

export default ProfileSlice.reducer;