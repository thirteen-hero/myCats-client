import React, { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Alert, Button, Descriptions } from 'antd';

import { 
  ProfileState, 
  LOGIN_TYPE,
  validateUser,
} from '@/store/reducers/profile'; 
import {
  useCommonDispatch,
  useCommonSelector,
} from '@/store/hooks';

import NavHeader from '@/components/NavHeader';

import styles from './profile.module.less';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useCommonDispatch();

  useEffect(() => {
    dispatch(validateUser());
  }, []);

  const { loginState, user }: ProfileState = useCommonSelector(state => state.profile);
  const renderContent = () => {
    if (loginState === LOGIN_TYPE.UN_VALIDATE) {
      return null;
    }
    if (loginState === LOGIN_TYPE.LOGINED) {
      return (
        <div className={styles.userInfo}>
          <Descriptions title="当前用户">
            <Descriptions.Item label="用户名">{user?.userName}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user?.email}</Descriptions.Item>
          </Descriptions>
          <Button
            type='default'
            onClick={() => dispatch({ type: 'profile/logout' })}
          >
            退出
          </Button>
        </div>
      )
    }
    return (
      <div className={styles.userInfo}>
        <Alert 
          type='warning' 
          message={
            <p className={styles.title}>
              未登录
            </p>
          } 
          description={
            <p className={styles.text}>
              亲爱的用户你好，你尚未登录，请注册或登录
            </p>
          } 
        />
        <div className={styles.buttonGroup}>
          <Button 
            type='primary' 
            onClick={() => navigate('/login')}
            className={styles.button}
          >
            登录
          </Button>
          <Button 
            type='primary' 
            onClick={() => navigate('/register')}
            className={styles.button}
          >
            注册
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <NavHeader>个人中心</NavHeader>
      {renderContent()}
    </div>
  )
}

export default Profile;