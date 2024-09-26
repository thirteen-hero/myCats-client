import React, { useEffect, useRef } from 'react';

import { 
  useCommonSelector,
  useCommonDispatch,
} from '@/store/hooks';
import { HomeState, getProductData } from '@/store/reducers/home';
import HomeHeader from './components/HomeHeader';
import HomeSlider from './components/HomeSlider';
import ProductList from './components/ProductList';
import { downRefresh } from '@/utils';

import styles from './home.module.less';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useCommonDispatch();
  const homeState: HomeState = useCommonSelector(state => state.home);
  const { currentCategory, product } = homeState;
  const { offset, limit } = product;
  useEffect(() => {
    if (!containerRef.current) return;
    downRefresh(containerRef.current, refreshProductList)
  }, []);

  // 获取商品列表
  const refreshProductList = () => {
    // dispatch(getProductData({
    //   category: currentCategory,
    //   offset: 0, 
    //   limit,
    //   isRefresh: true,
    // }));
  }

  return (
    <div className={styles.home} >
      <HomeHeader />
      <div className={styles.container} ref={containerRef}>
        <HomeSlider />
        <ProductList />
      </div>
    </div>
  )
}

export default Home;