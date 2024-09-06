import React from 'react';
import classNames from 'classnames';
import { 
  UserOutlined, 
  HomeOutlined, 
  ShoppingCartOutlined 
} from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';

import styles from './index.module.less';

const Tabs = () => {
  return (
    <div className={styles.tabs}>
      <NavLink 
        to="/" 
        className={({ isActive }) => {
          return classNames(styles.tab, isActive ? styles.active : styles.default)
        }}
      >
        <HomeOutlined className={styles.icon} />
        <span className={styles.text}>首页</span>
      </NavLink>
      <NavLink 
        to="/mine" 
        className={({ isActive }) => {
          return classNames(styles.tab, isActive ? styles.active : styles.default)
        }}
      >
        <ShoppingCartOutlined className={styles.icon} />
        <span className={styles.text}>购物车</span>
      </NavLink>
      <NavLink 
        to="/profile" 
        className={({ isActive }) => {
          return classNames(styles.tab, isActive ? styles.active : styles.default)
        }}
      >
        <UserOutlined className={styles.icon} />
        <span className={styles.text}>个人中心</span>
      </NavLink>
    </div>
  )
}

export default Tabs;