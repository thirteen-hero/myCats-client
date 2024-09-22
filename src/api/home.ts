import request from './index';

export const getSliders = () => {
  return request.get('/slider/list');
}