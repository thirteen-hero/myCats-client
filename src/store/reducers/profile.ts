import { 
  createSlice, 
  PayloadAction, 
  createAsyncThunk 
} from '@reduxjs/toolkit';
import { validate, register, login } from '@/api/profile';
import { message } from 'antd';

interface User {
  username: string;
  email: string;
  avatar: string;
  id: string;
}

export enum LOGIN_TYPE {
  UN_VALIDATE = 'UN_VALIDATE',
  LOGINED = 'LOGINED',
  UN_LOGINED = 'UN_LOGINED',
}

export interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface ProfileState {
  loginState: LOGIN_TYPE;
  user: User | null;
}

const initialState: ProfileState = {
  loginState: LOGIN_TYPE.UN_VALIDATE,
  user: null,
}

export const validateUser = createAsyncThunk('profile/ser', async() => {
  return await validate();
})

export const registerUser = createAsyncThunk('profile/registerUser', async(data: RegisterPayload) => {
  return await register(data);
})

export const loginUser = createAsyncThunk('profile/loginUser', async(data: LoginPayload) => {
  return await login(data);
})

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    logout: (state: ProfileState, _action: PayloadAction) => {
      state.loginState = LOGIN_TYPE.UN_LOGINED;
      sessionStorage.removeItem('access_token');
    },
    setAvatar: (state: ProfileState, { payload }) => {
      if (state.user) {
        state.user.avatar = payload;
      }
    }
  },
  extraReducers: builder => {
    builder
    .addCase(validateUser.fulfilled, (state, action) => {
      state.loginState = LOGIN_TYPE.LOGINED;
      state.user = action.payload.data;
    })
    .addCase(validateUser.rejected, (state, action) => {
      state.loginState = LOGIN_TYPE.UN_LOGINED;
      message.open({content: action.error.message});
    })
    .addCase(registerUser.fulfilled, () => {
      message.open({content: '注册成功！'});
    })
    .addCase(registerUser.rejected, (_state, action) => {
      message.open({content: action.error.message});
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loginState = LOGIN_TYPE.LOGINED;
      sessionStorage.setItem('access_token', action.payload.data)
      message.open({content: '登录成功！'});
    })
    .addCase(loginUser.rejected, (_state, action) => {
      message.open({content: action.error.message});
    })
  }
})

export default ProfileSlice.reducer;