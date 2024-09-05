import React from 'react';

import { HomeState } from '@/store/reducers/home';
import { 
  useCommonDispatch, 
  useCommonSelector 
} from '@/store/hooks';

import HomeHeader from './components/HomeHeader';

import styles from './home.module.less';

const Home = () => {
  const homeState: HomeState = useCommonSelector(state => state.home);

  return (
    <div className={styles.home}>
      <HomeHeader />
    </div>
  )
}

export default Home;