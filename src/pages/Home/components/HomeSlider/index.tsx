import React, { useEffect } from 'react';
import { Carousel } from 'antd';

import { HomeState, getSliderData } from '@/store/reducers/home';
import { useCommonDispatch, useCommonSelector } from '@/store/hooks';

// import styles from './index.module.less';

const HomeSlider = () => {
  const dispatch = useCommonDispatch();
  const homeState: HomeState = useCommonSelector(state => state.home);
  const { sliders } = homeState;

  useEffect(() => {
    dispatch(getSliderData());
  }, []);

  return (
    <div>
      <Carousel>
        {sliders.map(item => <img key={item.id} src={item.url} />)}
      </Carousel>
    </div>
  )
}

export default HomeSlider;