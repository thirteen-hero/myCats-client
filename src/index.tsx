import { lazy, Suspense, FC } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes, HashRouter} from 'react-router-dom';

import React from 'react';

import Tabs from './components/tabs';

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HashRouter>
    <Suspense fallback={<>loading</>}>
      <Routes>
        <Route key="home" path="/" element={<Home />} />
      </Routes>
      <Tabs />
    </Suspense>
  </HashRouter>
);
