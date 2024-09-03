import React from 'react';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { Route, Routes, HashRouter} from 'react-router-dom';

import store from './store';

import Tabs from './components/tabs';
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HashRouter>
      <Suspense fallback={<>loading</>}>
        <Routes>
          <Route key="home" path="/" element={<Home />} />
        </Routes>
        <Tabs />
      </Suspense>
    </HashRouter>
  </Provider>
);
