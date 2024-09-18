import React from 'react';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import  zh_CN from 'antd/locale/zh_CN';
import { createRoot } from 'react-dom/client';
import { Route, Routes, HashRouter} from 'react-router-dom';

import store from './store';
import './assets/style/common.less';

import Tabs from './components/Tabs';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
const Mine = lazy(() => import(/* webpackChunkName: 'Mine' */ './pages/Mine'));
const Profile = lazy(() => import(/* webpackChunkName: 'Profile' */ './pages/Profile'));
const Login = lazy(() => import(/* webpackChunkName: 'Login' */ './pages/Login'));
const Register = lazy(() => import(/* webpackChunkName: 'Register' */ './pages/Register'));

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HashRouter>
      <ErrorBoundary>
        <Suspense fallback={<>loading</>}>
          <ConfigProvider locale={zh_CN}>
            <div className='main-content'>
              <Routes>
                <Route key="home" path="/" element={<Home />} />
                <Route key="mine" path="/mine" element={<Mine />} />
                <Route key="profile" path="/profile" element={<Profile />} />
                <Route key="login" path="/login" element={<Login />} />
                <Route key="register" path="/register" element={<Register />} />
              </Routes>
            </div>
            <Tabs />
          </ConfigProvider>
        </Suspense>
      </ErrorBoundary>
    </HashRouter>
  </Provider>
);
