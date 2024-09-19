import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Alert, Button, Descriptions, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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
import { RcFile } from 'antd/es/upload';
import { UploadChangeParam } from 'antd/lib/upload';

const Profile = () => { 
  const navigate = useNavigate();
  const dispatch = useCommonDispatch();
  const [loading, setLoading] = useState<Boolean>(false);
  const { loginState, user }: ProfileState = useCommonSelector(state => state.profile);

  useEffect(() => {
    dispatch(validateUser());
  }, []);

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      // response 就是上传接口返回的响应体 data是服务器端返回的图片路径
      const { success, data } = info.file.response;
      if (success) {
        setLoading(false);
        dispatch({
          type: 'profile/setAvatar',
          payload: data,
        })
      } else {
        message.error('上传图片失败');
      }
    }
  }

  const handleBeforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpg" || file.type === "image/png" || file.type === "image/jpeg";
    if (!isJpgOrPng) {
      message.error('只能上传jpg或png文件');
      return false;
    }
    const isLessThan2M = file.size/1024/1024 < 2;
    if (!isLessThan2M) {
      message.error('图片必须小于2M');
      return false;
    }
    return true;
  }

  const renderContent = () => {
    if (loginState === LOGIN_TYPE.UN_VALIDATE) {
      return null;
    }
    if (loginState === LOGIN_TYPE.LOGINED && user) {
      const UploadButton = () => {
        return (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className='ant-upload-text'>上传</div>
          </div>
        )
      }
      return (
        <div className={styles.userInfo}>
          <Descriptions title="当前用户">
            <Descriptions.Item label="用户名">{user?.username}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="用户头像">
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                action="http://localhost:8001/user/uploadAvatar"
                beforeUpload={handleBeforeUpload}
                data={{ userId: user.id }}
                onChange={handleChange}
              >
                {
                  user.avatar ? 
                  <img src={user.avatar} style={{ width: '100%' }} /> : 
                  UploadButton()
                }
              </Upload>
            </Descriptions.Item>
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