import React, { useEffect, useRef } from 'react';

import { HomeState,  } from '@/store/reducers/home';
import { useCommonSelector } from '@/store/hooks';

import HomeHeader from './components/HomeHeader';
import HomeSlider from './components/HomeSlider';
import ProductList from './components/ProductList';

import styles from './home.module.less';

const Home = () => {
  const homeState: HomeState = useCommonSelector(state => state.home);
  const { sliders } = homeState;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.home}>
      <HomeHeader />
      <div className={styles.container} ref={containerRef}>
        <HomeSlider />
        <ProductList />
      </div>
    </div>
  )
}

export default Home;