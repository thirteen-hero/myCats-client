import { CAT_TYPE } from '@/store/reducers/home';
import request from './index';

export const getSliders = () => {
  return request.get('/slider/list');
}

export const getProduct = (
  category: CAT_TYPE = 0,
  offset: number,
  limit: number,
) => {
  return request.get(`/product/list?category=${category}&offset=${offset}&limit=${limit}`);
}