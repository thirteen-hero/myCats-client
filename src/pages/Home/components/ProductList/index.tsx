import React, { useEffect } from 'react';

import { getProductData, HomeState } from '@/store/reducers/home';
import { useCommonDispatch, useCommonSelector } from '@/store/hooks';
import styles from './index.module.less';

const ProductList = () => {
  const dispatch = useCommonDispatch();
  const { product, currentCategory }: HomeState = useCommonSelector(store => store.home);
  useEffect(() => {
    const { offset, limit } = product;
    dispatch(getProductData({
      category: currentCategory,
      offset, 
      limit,
    }))
  }, []);
  return (
    <div>111</div>
  )
}

export default ProductList;