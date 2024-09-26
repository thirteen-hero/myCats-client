import React from 'react';
import { Button, Form, Input } from 'antd';
import { 
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';

import { useCommonDispatch } from '@/store/hooks';
import { loginUser } from '@/store/reducers/profile';
import NavHeader from '@/components/NavHeader';

import styles from './login.module.less';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useCommonDispatch();
  const handleSubmit = async() => {
    const values = form.getFieldsValue();
    const res = await dispatch(loginUser(values));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/profile');
    }
  }
  return (
    <div className={styles.login}>
      <NavHeader>用户登录</NavHeader>
      <Form 
        form={form}
        labelCol={{ flex: '150px' }}
        labelAlign='left'
        labelWrap
        className={styles.loginForm} 
        onFinish={handleSubmit}
        clearOnDestroy
      >
        <Form.Item 
          name='username' 
          label='用户名'
          rules={[{required: true, message: '用户名不能为空'}]}
        >
          <Input 
            prefix={<UserOutlined />} 
            style={{ color: 'rgba(0,0,0,.25'}}
          />
        </Form.Item>
        <Form.Item 
          label='密码' 
          name='password' 
          rules={[{required: true, message: '密码不能为空'}]}
        >
          <Input 
            prefix={<LockOutlined />} 
            style={{ color: 'rgba(0,0,0,.25'}}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type='primary' 
            htmlType='submit'
            className=''
          >
            登录
          </Button>
          或者
          <NavLink to='/register'>注册</NavLink>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Login;