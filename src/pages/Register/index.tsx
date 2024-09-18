import React from 'react';
import { Button, Form, Input } from 'antd';
import { 
  UserOutlined,
  LockOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';

import { useCommonDispatch } from '@/store/hooks';
import { registerUser } from '@/store/reducers/profile';
import NavHeader from '@/components/NavHeader';

import styles from './register.module.less';

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useCommonDispatch();
  const handleSubmit = async() => {
    const values = form.getFieldsValue();
    const res = await dispatch(registerUser(values));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  }
  return (
    <div className={styles.register}>
      <NavHeader>用户注册</NavHeader>
      <Form 
        form={form}
        labelCol={{ flex: '90px' }}
        labelAlign='left'
        labelWrap
        className={styles.registerForm} 
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
        <Form.Item 
          label='确认密码' 
          name='confirmPassword' 
          rules={[{required: true, message: '确认密码密码不能为空'}]}
        >
          <Input 
            prefix={<LockOutlined />} 
            style={{ color: 'rgba(0,0,0,.25'}}
          />
        </Form.Item>
        <Form.Item 
          label='邮箱' 
          name='email' 
          rules={[
            { required: true, message: '邮箱不能为空' },
            { pattern: /@/, message: '邮箱格式不正确'}
          ]}
        >
          <Input 
            prefix={<FolderAddOutlined />} 
            style={{ color: 'rgba(0,0,0,.25'}}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type='primary' 
            htmlType='submit'
            className=''
          >
              注册
          </Button>
          或者
          <NavLink to='/login'>登录</NavLink>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Register;