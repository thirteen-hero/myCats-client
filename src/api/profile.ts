import request from "./index";
import { 
  LoginPayload,
  RegisterPayload 
} from '@/store/reducers/profile';

export const validate = () => {
  return request.get('/user/validate');
}

export const register = (data: RegisterPayload) => {
  return request.post('/user/register', data);
}

export const login = (data: LoginPayload) => {
  return request.post('/user/login', data);
}