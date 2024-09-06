import React from 'react';

import { 
  ProfileState, 
  LOGIN_TYPE 
} from '@/store/reducers/profile'; 
import {
  useCommonDispatch,
  useCommonSelector,
} from '@/store/hooks';

import NavHeader from '@/components/NavHeader';

import styles from './profile.module.less';

const Profile = () => {

  const { loginState }: ProfileState = useCommonSelector(state => state.profile);

  return (
    <div className={styles.profile}>
      <NavHeader>个人中心</NavHeader>
    </div>
  )
}

export default Profile;