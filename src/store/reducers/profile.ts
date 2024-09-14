import { 
  createSlice, 
  PayloadAction, 
  createAsyncThunk 
} from '@reduxjs/toolkit';
import { validate } from '@/api/profile';
import { message } from 'antd';

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
  error: string | undefined;
}

const initialState: ProfileState = {
  loginState: LOGIN_TYPE.UN_VALIDATE,
  user: null,
  error: undefined,
}

export const validateUser = createAsyncThunk('profile/validateUser', async() => {
  return await validate();
})

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    logout: (state: ProfileState, action: PayloadAction) => {
      state.loginState = LOGIN_TYPE.UN_LOGINED;
      sessionStorage.removeItem('access_token');
    }
  },
  extraReducers: builder => {
    builder
    .addCase(validateUser.fulfilled, (state, action) => {
      state.loginState = LOGIN_TYPE.LOGINED;
      state.error = undefined;
    })
    .addCase(validateUser.rejected, (state, action) => {
      state.loginState = LOGIN_TYPE.UN_LOGINED;
      state.error = action.error.message;
      message.open({content: action.error.message});
    })
  }
})

export default ProfileSlice.reducer;