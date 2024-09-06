import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Transition } from 'react-transition-group';
import classNames from 'classnames';

import sa from '@/assets/imgs/sa.jpg';
import { HomeState, CAT_TYPE } from '@/store/reducers/home';
import { useCommonSelector, useCommonDispatch } from '@/store/hooks';

import styles from './index.module.less';

const duration = 600;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyle = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 }
}

const HomeHeader = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const dispatch = useCommonDispatch();
  const { currentCategory }: HomeState = useCommonSelector(state => state.home);

  const handleClick = (event: React.MouseEvent<HTMLUListElement>) => {
    const target: HTMLUListElement = event.target as HTMLUListElement;
    const category = Number(target.dataset.category);
    dispatch({ 
      type: 'home/handleCategoryChange', 
      payload: category,
    });
    setMenuVisible(false);
  }

  return (
    <div className={styles.homeHeader}>
      <div className={styles.logoHeader}>
        <img className={styles.logo} src={sa} />
        <div className={styles.title}>my cats</div>
        <MenuOutlined 
          className={styles.icon} 
          onClick={() => {
            setMenuVisible(!menuVisible);
          }} 
        />
      </div>
      <Transition in={menuVisible} timeout={duration}>
        {state => (
          <ul 
            className={styles.categorys} 
            onClick={handleClick}
            style={{
              ...defaultStyle,
              ...transitionStyle[state],
            }}
          >
            <li 
              data-category={CAT_TYPE.ALL}
              className={classNames(styles.category,
                {
                  [styles.active]: currentCategory === CAT_TYPE.ALL,
                }
              )}
            >
              全家福
            </li>
            <li 
              data-category={CAT_TYPE.WHITE}
              className={classNames(styles.category,
                {
                  [styles.active]: currentCategory === CAT_TYPE.WHITE,
                }
              )}
            >
              白白
            </li>
            <li 
              data-category={CAT_TYPE.LI}
              className={classNames(styles.category,
                {
                  [styles.active]: currentCategory === CAT_TYPE.LI,
                }
              )}
            >
              狸狸
            </li>
            <li 
              data-category={CAT_TYPE.CUP}
              className={classNames(styles.category,
                {
                  [styles.active]: currentCategory === CAT_TYPE.CUP,
                }
              )}
            >
              帽帽
            </li>
          </ul>
        )}
      </Transition>
    </div>
  )
}

export default HomeHeader;