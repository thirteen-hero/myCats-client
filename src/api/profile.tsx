import request from "./index";

export const validate = () => {
  return request.get('/user/validate');
}